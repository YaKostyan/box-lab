import './styles.css';
import { ApiRequestError, backendApi, backendEnabled, clearApiSession, hasApiSession, type ApiAccount, type ApiOrder, type ApiProduct } from './api';
import {
  analyzeFit,
  DEFAULT_PARTNER_MARKUP,
  faqItems,
  formatMoney,
  MAX_QUANTITY,
  personalUnitPrice,
  productVolume,
  products as seedProducts,
  publicUnitPrice,
  supportTopics,
  unitPrice,
  WHOLESALE_FROM,
  type Dimensions,
  type Product,
} from './data';

type AccountRole = 'client' | 'admin';
type OrderStatus = 'Нова' | 'У роботі' | 'Уточнення' | 'Підтверджена' | 'Закрита';
type CatalogSort = 'size' | 'price' | 'number';
type AdminView = 'overview' | 'orders' | 'clients' | 'products';
type ProductVisibility = 'all' | 'active' | 'hidden';

interface ManagedProduct extends Product {
  active: boolean;
  updatedAt: string;
}

interface Account {
  id: string;
  name: string;
  phone: string;
  company: string;
  password?: string;
  role: AccountRole;
  partner: boolean;
  fixedMarkup: number;
  productPrices: Record<string, number>;
  createdAt: string;
  updatedAt?: string;
}

interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  company: string;
  comment: string;
  items: OrderItem[];
  total: number;
  accountId?: string;
  status: OrderStatus;
  managerNote?: string;
  statusHistory?: OrderStatusEntry[];
}

interface OrderStatusEntry {
  status: OrderStatus;
  at: string;
}

interface OrderItem {
  productId: string;
  productNumber: string;
  dimensions: Dimensions;
  quantity: number;
  unitPrice: number;
  total: number;
  priceType: string;
}

interface LegacyOrder extends Omit<Order, 'items'>, OrderItem {}

interface CartItem {
  productId: string;
  quantity: number;
}

type FitMargin = 0 | 5 | 10;

interface FitState {
  dimensions: Dimensions;
  margin: FitMargin;
}

interface SavedMeasurement extends FitState {
  id: string;
  createdAt: string;
}

const STORAGE = {
  accounts: 'toffipacks-accounts-v3',
  orders: 'toffipacks-orders-v3',
  session: 'toffipacks-session-v3',
  cart: 'toffipacks-cart-v1',
  products: 'toffipacks-products-v1',
  fit: 'toffipacks-fit-v1',
  measurements: 'toffipacks-measurements-v1',
};

const PRODUCT_NUMBER_PATTERN = /^[\p{L}\p{N}._-]+$/u;

const now = new Date().toISOString();
const defaultPersonalPrices = (): Record<string, number> =>
  Object.fromEntries(
    seedProducts.map((product) => [
      product.id,
      Math.round((product.basePrice + DEFAULT_PARTNER_MARKUP) * 100) / 100,
    ]),
  );

const seedAccounts: Account[] = [
  {
    id: 'account-admin',
    name: 'Адміністратор ToffiPacks',
    phone: '+380000000001',
    company: 'ToffiPacks',
    password: 'admin123',
    role: 'admin',
    partner: false,
    fixedMarkup: DEFAULT_PARTNER_MARKUP,
    productPrices: {},
    createdAt: now,
  },
  {
    id: 'account-partner',
    name: 'Постійний клієнт',
    phone: '+380671112233',
    company: '',
    password: 'client123',
    role: 'client',
    partner: true,
    fixedMarkup: DEFAULT_PARTNER_MARKUP,
    productPrices: defaultPersonalPrices(),
    createdAt: now,
  },
];

const seedOrders: Order[] = [];

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function initializeStorage(): void {
  if (!localStorage.getItem(STORAGE.accounts)) writeStorage(STORAGE.accounts, seedAccounts);
  if (!localStorage.getItem(STORAGE.orders)) writeStorage(STORAGE.orders, seedOrders);
  if (!localStorage.getItem(STORAGE.cart)) writeStorage(STORAGE.cart, []);
  if (!localStorage.getItem(STORAGE.products)) {
    writeStorage(
      STORAGE.products,
      seedProducts.map((product) => ({ ...product, active: true, updatedAt: now })),
    );
  }
}

initializeStorage();

if (backendEnabled) {
  writeStorage(STORAGE.accounts, []);
  writeStorage(STORAGE.orders, []);
  if (!hasApiSession()) localStorage.removeItem(STORAGE.session);
}

const restoredFit = readStorage<FitState | null>(STORAGE.fit, null);
const restoredDimensions = restoredFit?.dimensions;
const hasRestoredDimensions =
  restoredDimensions &&
  [restoredDimensions.length, restoredDimensions.width, restoredDimensions.height].every(
    (side) => Number.isFinite(side) && side > 0,
  );
const restoredMargin = restoredFit?.margin;

let selectedProductId = 'box-101';
let selectedQuantity = 500;
let catalogSearch = '';
let catalogSort: CatalogSort = 'size';
let catalogExpanded = false;
let fitDimensions: Dimensions | null = hasRestoredDimensions ? restoredDimensions : null;
let fitMargin: FitMargin = restoredMargin === 5 || restoredMargin === 10 ? restoredMargin : 0;
let catalogTimer: number | undefined;
let activeProductDialogId: string | null = null;
let adminProductSearch = '';
let adminProductVisibility: ProductVisibility = 'all';
let adminOrderSearch = '';
let adminOrderStatus: OrderStatus | 'Усі' = 'Усі';
let adminOrderDate = '';
let adminOrderDateEnd = '';
let adminCalendarCursor = '';
let adminNotice = '';
const expandedClientPriceIds = new Set<string>();
let activeSupportTopicId = '';
let supportResponseTimer: number | undefined;

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Root element #app was not found.');

function accounts(): Account[] {
  return readStorage<Account[]>(STORAGE.accounts, seedAccounts).map((account) => ({
    ...account,
    productPrices:
      account.productPrices && typeof account.productPrices === 'object'
        ? account.productPrices
        : account.partner
          ? defaultPersonalPrices()
          : {},
  }));
}

function catalogItems(): ManagedProduct[] {
  const fallback = seedProducts.map((product) => ({ ...product, active: true, updatedAt: now }));
  return readStorage<ManagedProduct[]>(STORAGE.products, fallback)
    .filter(
      (product) =>
        product &&
        typeof product.id === 'string' &&
        typeof product.number === 'string' &&
        Number.isFinite(product.basePrice) &&
        Number.isFinite(product.dimensions?.length) &&
        Number.isFinite(product.dimensions?.width) &&
        Number.isFinite(product.dimensions?.height),
    )
    .map((product) => ({
      ...product,
      active: product.active !== false,
      updatedAt: product.updatedAt || now,
    }));
}

function visibleProducts(): ManagedProduct[] {
  return catalogItems().filter((product) => product.active);
}

function saveCatalog(items: ManagedProduct[]): void {
  writeStorage(STORAGE.products, items);
}

function orders(): Order[] {
  const stored = readStorage<Array<Order | LegacyOrder>>(STORAGE.orders, seedOrders);
  return stored.map((order) => {
    if ('items' in order && Array.isArray(order.items)) {
      return {
        ...order,
        statusHistory:
          Array.isArray(order.statusHistory) && order.statusHistory.length
            ? order.statusHistory
            : [{ status: order.status, at: order.createdAt }],
      };
    }
    const legacy = order as LegacyOrder;
    return {
      id: legacy.id,
      createdAt: legacy.createdAt,
      customerName: legacy.customerName,
      phone: legacy.phone,
      company: legacy.company,
      comment: legacy.comment,
      items: [
        {
          productId: legacy.productId,
          productNumber: legacy.productNumber,
          dimensions: legacy.dimensions,
          quantity: legacy.quantity,
          unitPrice: legacy.unitPrice,
          total: legacy.total,
          priceType: legacy.priceType,
        },
      ],
      total: legacy.total,
      accountId: legacy.accountId,
      status: legacy.status,
      statusHistory: [{ status: legacy.status, at: legacy.createdAt }],
    };
  });
}

function cartItems(): CartItem[] {
  const products = visibleProducts();
  return readStorage<CartItem[]>(STORAGE.cart, []).filter(
    (item) => products.some((product) => product.id === item.productId) && item.quantity > 0,
  );
}

function currentAccount(): Account | null {
  const accountId = localStorage.getItem(STORAGE.session);
  return accounts().find((account) => account.id === accountId) ?? null;
}

function cacheAccount(account: ApiAccount): Account {
  const cached: Account = { ...account };
  const stored = accounts().filter((item) => item.id !== account.id && item.role !== account.role);
  writeStorage(STORAGE.accounts, [cached, ...stored]);
  localStorage.setItem(STORAGE.session, cached.id);
  return cached;
}

function cacheAdminData(admin: ApiAccount, clients: ApiAccount[], serverOrders: ApiOrder[], products: ApiProduct[]): void {
  writeStorage(STORAGE.accounts, [admin, ...clients] satisfies Account[]);
  writeStorage(STORAGE.orders, serverOrders satisfies Order[]);
  saveCatalog(products satisfies ManagedProduct[]);
  localStorage.setItem(STORAGE.session, admin.id);
}

async function refreshBackendSession(): Promise<Account | null> {
  if (!backendEnabled || !hasApiSession()) return null;
  try {
    const account = await backendApi.me();
    if (account.role === 'admin') {
      const [clients, serverOrders, products] = await Promise.all([
        backendApi.adminClients(),
        backendApi.adminOrders(),
        backendApi.adminProducts(),
      ]);
      cacheAdminData(account, clients, serverOrders, products);
    } else {
      const [serverOrders, products] = await Promise.all([backendApi.myOrders(), backendApi.products()]);
      cacheAccount(account);
      writeStorage(STORAGE.orders, serverOrders satisfies Order[]);
      saveCatalog(products satisfies ManagedProduct[]);
    }
    return account;
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 401) {
      clearApiSession();
      localStorage.removeItem(STORAGE.session);
      return null;
    }
    throw error;
  }
}

function selectedProduct(): Product {
  const products = visibleProducts();
  return products.find((product) => product.id === selectedProductId) ?? products[0];
}

function clampQuantity(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(MAX_QUANTITY, Math.max(1, Math.round(value)));
}

function savedMeasurements(): SavedMeasurement[] {
  return readStorage<SavedMeasurement[]>(STORAGE.measurements, []).filter(
    (measurement) =>
      measurement &&
      typeof measurement.id === 'string' &&
      [measurement.dimensions?.length, measurement.dimensions?.width, measurement.dimensions?.height].every(
        (side) => Number.isFinite(side) && Number(side) > 0,
      ) &&
      [0, 5, 10].includes(measurement.margin),
  );
}

function fitMarginLabel(margin: FitMargin): string {
  if (margin === 0) return 'без додаткового запасу';
  return `+${margin} мм з кожного боку`;
}

function savedMeasurementsMarkup(): string {
  const measurements = savedMeasurements();
  if (!measurements.length) return '';
  return `
    <div class="saved-measurements__head"><span>Збережені розміри</span><button type="button" data-clear-measurements>Очистити</button></div>
    <div class="saved-measurements__list">
      ${measurements
        .map(
          (measurement) => `
            <button type="button" data-saved-measurement="${escapeHtml(measurement.id)}">
              <strong>${dimensionText(measurement.dimensions)}</strong>
              <span>${fitMarginLabel(measurement.margin)}</span>
            </button>
          `,
        )
        .join('')}
    </div>
  `;
}

function renderSavedMeasurements(): void {
  const container = document.querySelector<HTMLElement>('#saved-measurements');
  if (container) {
    container.innerHTML = savedMeasurementsMarkup();
    container.hidden = !container.innerHTML;
  }
}

function rememberMeasurement(dimensions: Dimensions, margin: FitMargin): void {
  const key = `${dimensions.length}-${dimensions.width}-${dimensions.height}-${margin}`;
  const existing = savedMeasurements().filter(
    (measurement) =>
      `${measurement.dimensions.length}-${measurement.dimensions.width}-${measurement.dimensions.height}-${measurement.margin}` !== key,
  );
  const measurement: SavedMeasurement = {
    id: `size-${key}`,
    dimensions,
    margin,
    createdAt: new Date().toISOString(),
  };
  writeStorage(STORAGE.measurements, [measurement, ...existing].slice(0, 5));
  writeStorage(STORAGE.fit, { dimensions, margin } satisfies FitState);
  renderSavedMeasurements();
}

function applySavedMeasurement(measurement: SavedMeasurement, scrollToCatalog = true): void {
  fitDimensions = { ...measurement.dimensions };
  fitMargin = measurement.margin;
  writeStorage(STORAGE.fit, { dimensions: fitDimensions, margin: fitMargin } satisfies FitState);
  const form = document.querySelector<HTMLFormElement>('#fit-form');
  if (form) {
    (form.elements.namedItem('length') as HTMLInputElement | null)?.setAttribute('value', String(fitDimensions.length));
    (form.elements.namedItem('width') as HTMLInputElement | null)?.setAttribute('value', String(fitDimensions.width));
    (form.elements.namedItem('height') as HTMLInputElement | null)?.setAttribute('value', String(fitDimensions.height));
    const setInputValue = (name: keyof Dimensions): void => {
      const input = form.elements.namedItem(name);
      if (input instanceof HTMLInputElement) input.value = String(fitDimensions?.[name] ?? '');
    };
    setInputValue('length');
    setInputValue('width');
    setInputValue('height');
    const marginInput = form.querySelector<HTMLInputElement>(`input[name="fitMargin"][value="${fitMargin}"]`);
    if (marginInput) marginInput.checked = true;
  }
  const message = document.querySelector<HTMLParagraphElement>('#fit-message');
  if (message) {
    message.textContent = `Розміри застосовано · ${fitMarginLabel(fitMargin)}.`;
    message.className = 'form-message is-success';
  }
  catalogExpanded = false;
  queueCatalogRender();
  if (scrollToCatalog) window.setTimeout(() => document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' }), 180);
}

function normalizePhone(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 10 && digits.startsWith('0')) digits = `38${digits}`;
  return digits.length === 12 && digits.startsWith('380') ? `+${digits}` : value.trim();
}

function phoneKey(value: string): string {
  return normalizePhone(value).replace(/\D/g, '');
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function dimensionText(dimensions: Dimensions): string {
  return `${dimensions.length} × ${dimensions.width} × ${dimensions.height} мм`;
}

function positionLabel(count: number): string {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${count} позицій`;
  if (last === 1) return `${count} позиція`;
  if (last >= 2 && last <= 4) return `${count} позиції`;
  return `${count} позицій`;
}

function priceTypeLabel(quantity: number, account: Account | null, product: Product): string {
  if (personalUnitPrice(product, account) !== null) return 'Персональна ціна';
  return quantity >= WHOLESALE_FROM ? 'Оптова ціна' : 'Роздрібна ціна';
}

function boxDiagram(product: Product, compact = false): string {
  const { length, width, height } = product.dimensions;
  const lengthScale = 170 + Math.min(100, length / 3);
  const heightScale = 58 + Math.min(54, height / 2.5);
  const depthScale = 50 + Math.min(44, width / 4);
  const x = 72;
  const y = compact ? 70 : 82;
  const topY = y - depthScale * 0.55;
  const rightX = x + lengthScale;
  const farX = rightX + depthScale;
  const baseline = y + heightScale;

  return `
    <svg class="box-visual${compact ? ' box-visual--compact' : ''}" viewBox="0 0 470 270" role="img"
      aria-label="Схема коробки ${escapeHtml(product.number)}, ${dimensionText(product.dimensions)}">
      <g class="box-visual__shape">
        <polygon class="box-visual__top" points="${x},${y} ${x + depthScale},${topY} ${farX},${topY} ${rightX},${y}" />
        <polygon class="box-visual__side" points="${rightX},${y} ${farX},${topY} ${farX},${topY + heightScale} ${rightX},${baseline}" />
        <rect class="box-visual__front" x="${x}" y="${y}" width="${lengthScale}" height="${heightScale}" />
        <rect class="box-visual__mark" x="${x + lengthScale * 0.35}" y="${y + heightScale * 0.32}"
          width="${lengthScale * 0.3}" height="${Math.max(24, heightScale * 0.34)}" rx="5" />
        <text class="box-visual__number" x="${x + lengthScale / 2}" y="${y + heightScale * 0.56}">№${escapeHtml(product.number)}</text>
      </g>
      <g class="dimension-line dimension-line--length">
        <line x1="${x}" y1="${baseline + 28}" x2="${rightX}" y2="${baseline + 28}" />
        <line x1="${x}" y1="${baseline + 20}" x2="${x}" y2="${baseline + 36}" />
        <line x1="${rightX}" y1="${baseline + 20}" x2="${rightX}" y2="${baseline + 36}" />
        <rect x="${x + lengthScale / 2 - 38}" y="${baseline + 12}" width="76" height="32" rx="16" />
        <text x="${x + lengthScale / 2}" y="${baseline + 33}">${length} мм</text>
      </g>
      <g class="dimension-line dimension-line--height">
        <line x1="${x - 26}" y1="${y}" x2="${x - 26}" y2="${baseline}" />
        <line x1="${x - 34}" y1="${y}" x2="${x - 18}" y2="${y}" />
        <line x1="${x - 34}" y1="${baseline}" x2="${x - 18}" y2="${baseline}" />
        <rect x="2" y="${y + heightScale / 2 - 16}" width="66" height="32" rx="16" />
        <text x="35" y="${y + heightScale / 2 + 5}">${height} мм</text>
      </g>
      <g class="dimension-line dimension-line--width">
        <line x1="${rightX + 8}" y1="${y - 8}" x2="${farX + 8}" y2="${topY - 8}" />
        <rect x="${farX - 54}" y="${Math.max(4, topY - 48)}" width="76" height="32" rx="16" />
        <text x="${farX - 16}" y="${Math.max(25, topY - 27)}">${width} мм</text>
      </g>
    </svg>
  `;
}

function productPickerOptions(): string {
  return visibleProducts()
    .slice()
    .sort((first, second) => first.number.localeCompare(second.number, 'uk-UA', { numeric: true }))
    .map(
      (product) =>
        `<button class="product-picker__option" type="button" role="option" data-product-picker-value="${escapeHtml(product.id)}" aria-selected="${product.id === selectedProductId}">
          <span class="product-picker__number">№${escapeHtml(product.number)}</span>
          <span class="product-picker__dimensions">${dimensionText(product.dimensions)}</span>
          <i aria-hidden="true"></i>
        </button>`,
    )
    .join('');
}

function productPicker(id: string, large = false): string {
  const product = selectedProduct();
  return `
    <div class="product-picker${large ? ' product-picker--large' : ''}" id="${id}" data-product-picker data-value="${escapeHtml(product.id)}">
      <button
        class="product-picker__trigger"
        type="button"
        data-product-picker-trigger
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="${id}-menu"
        aria-labelledby="${id}-label ${id}-value"
      >
        <span class="product-picker__value" id="${id}-value"><b>№${escapeHtml(product.number)}</b><span>${dimensionText(product.dimensions)}</span></span>
        <i class="product-picker__chevron" aria-hidden="true"></i>
      </button>
      <div class="product-picker__menu" id="${id}-menu" role="listbox" aria-labelledby="${id}-label" hidden>
        ${productPickerOptions()}
      </div>
    </div>
  `;
}

function supportWelcomeMarkup(): string {
  return `
    <div class="support-welcome">
      <div class="support-welcome__visual" aria-hidden="true">
        <img src="./toffik-support-v3.webp" alt="" />
      </div>
      <div class="support-welcome__copy">
        <span>Швидка підтримка</span>
        <strong>З чим допомогти?</strong>
        <p>Оберіть тему — Тофік підкаже.</p>
      </div>
    </div>
  `;
}

function supportWidgetMarkup(): string {
  return `
    <section class="support-widget" id="support-widget" aria-label="Швидка підтримка">
      <div class="support-panel" id="support-panel" role="dialog" aria-modal="false" aria-labelledby="support-title" hidden>
        <header class="support-panel__head">
          <div class="support-agent" aria-hidden="true">
            <span class="support-agent__mark">
              <img src="./toffik-support-v3.webp" alt="" />
            </span>
          </div>
          <div>
            <strong id="support-title">Помічник ToffiPacks</strong>
            <span><i aria-hidden="true"></i> Тофік на зв’язку</span>
          </div>
          <button class="support-panel__close" type="button" data-support-close aria-label="Закрити підтримку">×</button>
        </header>

        <div class="support-panel__body">
          <div class="support-conversation" id="support-conversation" aria-live="polite">
            ${supportWelcomeMarkup()}
          </div>

          <div class="support-questions" aria-label="Готові питання">
            <p>Що вас цікавить?</p>
            <div>
              ${supportTopics
                .map(
                  (topic, index) => `
                    <button type="button" data-support-topic="${escapeHtml(topic.id)}" aria-pressed="false">
                      <span>${String(index + 1).padStart(2, '0')}</span>
                      <strong>${escapeHtml(topic.question)}</strong>
                      <i aria-hidden="true">→</i>
                    </button>
                  `,
                )
                .join('')}
            </div>
          </div>
        </div>

        <footer class="support-panel__foot">
          <span>Готові відповіді без очікування</span>
          <a href="#request" data-support-action>Залишити заявку <i aria-hidden="true">→</i></a>
        </footer>
      </div>

      <button
        class="support-trigger"
        id="support-trigger"
        type="button"
        aria-expanded="false"
        aria-controls="support-panel"
        aria-label="Відкрити швидку підтримку"
      >
        <span class="support-trigger__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M6.5 17.5 3 20v-5.2A8 8 0 0 1 2 11c0-4.4 4.5-8 10-8s10 3.6 10 8-4.5 8-10 8c-2 0-3.9-.5-5.5-1.5Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg>
        </span>
        <span class="support-trigger__copy"><strong>Допомога</strong><small>Швидкі відповіді</small></span>
        <i class="support-trigger__status" aria-hidden="true"></i>
      </button>
    </section>
  `;
}

function storefrontTemplate(): string {
  const product = selectedProduct();
  return `
    <div class="page-top-sentinel" id="top" aria-hidden="true"></div>
    <header class="site-header">
      <a class="brand" href="#top" aria-label="ToffiPacks — на головну">
        <span class="brand__mark"><img src="./toffipacks-logo.webp" alt="" /></span>
        <span class="brand__copy"><strong>TOFFIPACKS</strong><small>самозбірні коробки</small></span>
      </a>
      <nav class="site-nav" id="site-nav" aria-label="Основна навігація">
        <a href="#catalog">Розміри</a>
        <a href="#calculator">Калькулятор</a>
        <a href="#about">Про нас</a>
        <a href="#business">Бізнесу</a>
        <a href="#delivery">Доставка</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div class="header-actions">
        <a class="button button--ghost button--small" id="account-button" href="#account">Кабінет</a>
        <a class="button button--primary button--small cart-button" id="cart-button" href="#request">Кошик <span id="cart-count">0</span></a>
        <button class="menu-button" id="menu-button" type="button" aria-expanded="false" aria-controls="site-nav">
          <span></span><span></span><span></span><span class="sr-only">Меню</span>
        </button>
      </div>
    </header>

    <main id="main">
      <section class="hero section">
        <div class="hero__content reveal">
          <p class="eyebrow"><span></span> Розмір → тираж → ціна</p>
          <h1>Коробки за розміром.<br /><em>Ціна — одразу.</em></h1>
          <p class="hero__lead">
            Без категорій «для взуття» чи «для техніки». Оберіть внутрішній розмір,
            вкажіть кількість — калькулятор порахує весь тираж до 50&nbsp;000 штук.
          </p>
          <div class="hero__actions">
            <a class="button button--primary" href="#calculator">Розрахувати вартість</a>
            <a class="text-link" href="#catalog">Дивитися всі розміри <span aria-hidden="true">→</span></a>
          </div>
          <dl class="hero__facts">
            <div><dt id="hero-product-count">${visibleProducts().length}</dt><dd>готових розмірів</dd></div>
            <div><dt>1–50 000</dt><dd>діапазон калькулятора</dd></div>
            <div><dt>Одразу</dt><dd>кінцева вартість</dd></div>
          </dl>
        </div>

        <div class="hero__visual reveal">
          <div class="logo-stage">
            <div class="logo-stage__orbit" aria-hidden="true"></div>
            <div class="logo-stage__image">
              <img src="./toffipacks-logo.webp" alt="Логотип ToffiPacks із деревом у відбитку лапи" />
            </div>
            <div class="logo-stage__note">
              <span class="technical-label">Коробки за розміром</span>
              <strong>Просто обрати.<br />Легко порахувати.</strong>
            </div>
          </div>
        </div>

        <div class="hero-calculator reveal" aria-label="Швидкий розрахунок">
          <div class="hero-calculator__head">
            <span class="technical-label">Швидкий розрахунок</span>
            <span class="price-rule">Кінцева ціна за весь тираж</span>
          </div>
          <div class="field">
            <span id="hero-product-picker-label">Коробка</span>
            ${productPicker('hero-product-picker')}
          </div>
          <label class="field">
            <span>Кількість</span>
            <input class="input" id="hero-quantity-input" type="number" min="1" max="${MAX_QUANTITY}" value="${selectedQuantity}" />
          </label>
          <div class="hero-calculator__result">
            <span id="hero-price-label">Роздрібна ціна</span>
            <strong id="hero-total">${formatMoney(publicUnitPrice(product, selectedQuantity) * selectedQuantity)}</strong>
            <small id="hero-unit">${formatMoney(publicUnitPrice(product, selectedQuantity))} / шт.</small>
          </div>
          <a class="button button--secondary" href="#calculator">Детальний розрахунок</a>
        </div>
      </section>

      <section class="section fit-section" id="fit">
        <div class="section-heading reveal">
          <div>
            <p class="eyebrow"><span></span> Підбір за габаритами</p>
            <h2>Введіть розмір предмета.</h2>
          </div>
          <p>Можна повертати предмет усередині коробки. Ми покажемо найкомпактніші варіанти, у які він входить.</p>
        </div>
        <div class="fit-panel reveal">
          <form class="fit-form" id="fit-form" novalidate>
            <div class="dimension-inputs">
              <label class="field">
                <span>Довжина, мм</span>
                <input class="input" name="length" type="number" min="1" max="2000" value="${fitDimensions?.length ?? 170}" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Ширина, мм</span>
                <input class="input" name="width" type="number" min="1" max="2000" value="${fitDimensions?.width ?? 110}" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Висота, мм</span>
                <input class="input" name="height" type="number" min="1" max="2000" value="${fitDimensions?.height ?? 45}" required />
              </label>
            </div>
            <fieldset class="fit-margin">
              <legend>Запас навколо предмета</legend>
              <div class="fit-margin__options">
                ${([0, 5, 10] as FitMargin[])
                  .map(
                    (margin) => `
                      <label>
                        <input type="radio" name="fitMargin" value="${margin}"${fitMargin === margin ? ' checked' : ''} />
                        <span>${margin === 0 ? 'Точно' : `+${margin} мм / бік`}</span>
                      </label>
                    `,
                  )
                  .join('')}
              </div>
              <p>Запас додається з обох боків кожної сторони предмета.</p>
            </fieldset>
            <button class="button button--primary" type="submit">Знайти коробку</button>
            <p class="form-message" id="fit-message" aria-live="polite"></p>
            <div class="saved-measurements" id="saved-measurements"${savedMeasurements().length ? '' : ' hidden'}>${savedMeasurementsMarkup()}</div>
          </form>
          <div class="fit-panel__drawing">
            <div class="fit-object">
              <span>ваш предмет</span>
              <i class="fit-object__length">Д</i>
              <i class="fit-object__width">Ш</i>
              <i class="fit-object__height">В</i>
            </div>
            <p>Порівнюємо всі три сторони, а не назву товару.</p>
          </div>
        </div>
      </section>

      <section class="section catalog-section" id="catalog">
        <div class="section-heading reveal">
          <div>
            <p class="eyebrow" id="catalog-ready-label"><span></span> ${visibleProducts().length} готових розмірів</p>
            <h2>Оберіть розмір,<br />не призначення.</h2>
          </div>
          <p>Порівняйте внутрішні габарити та одразу порахуйте потрібну кількість.</p>
        </div>
        <div class="catalog-toolbar reveal">
          <label class="search-field">
            <span class="sr-only">Пошук</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"></circle><path d="m16 16 4 4"></path></svg>
            <input id="catalog-search" type="search" placeholder="Номер або розмір" autocomplete="off" />
          </label>
          <div class="sort-field">
            <span id="catalog-sort-label">Сортувати</span>
            <div class="catalog-sort" id="catalog-sort" data-value="size">
              <button
                class="catalog-sort__trigger"
                type="button"
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-labelledby="catalog-sort-label catalog-sort-value"
              >
                <span id="catalog-sort-value">Від компактних</span>
                <i aria-hidden="true"></i>
              </button>
              <div class="catalog-sort__menu" role="listbox" aria-labelledby="catalog-sort-label" hidden>
                <button type="button" role="option" data-sort-value="size" aria-selected="true"><span>Від компактних</span><i aria-hidden="true"></i></button>
                <button type="button" role="option" data-sort-value="price" aria-selected="false"><span>За ціною</span><i aria-hidden="true"></i></button>
                <button type="button" role="option" data-sort-value="number" aria-selected="false"><span>За номером</span><i aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
          <button class="button button--ghost button--small" id="reset-catalog" type="button">Скинути підбір</button>
        </div>
        <div class="catalog-meta">
          <p id="catalog-count" aria-live="polite"></p>
        </div>
        <div class="product-grid" id="product-grid" aria-live="polite"></div>
        <div class="catalog-more" id="catalog-more" hidden>
          <button class="button button--ghost" id="catalog-more-button" type="button" aria-expanded="false"></button>
        </div>
      </section>

      <section class="section calculator-section" id="calculator">
        <div class="calculator-shell reveal">
          <div class="calculator-copy">
            <p class="eyebrow eyebrow--light"><span></span> Калькулятор тиражу</p>
            <h2>Від однієї коробки<br />до 50 тисяч.</h2>
            <p>
              Вкажіть кількість і відразу побачите кінцеву ціну за одну коробку
              та загальну вартість тиражу.
            </p>
            <div class="price-logic">
              <div><span>1–999 шт.</span><strong>роздрібна ціна</strong></div>
              <div><span>1 000–50 000 шт.</span><strong>оптова ціна</strong></div>
              <div><span>Постійним клієнтам</span><strong>персональна ціна</strong></div>
            </div>
          </div>

          <div class="calculator-card">
            <div class="calculator-card__top">
              <span class="technical-label">Розрахунок</span>
              <span class="account-price-badge" id="account-price-badge">Публічна ціна</span>
            </div>
            <div class="field">
              <span id="calculator-product-picker-label">Розмір коробки</span>
              ${productPicker('calculator-product-picker', true)}
            </div>
            <div class="calculator-preview" id="calculator-preview">${boxDiagram(product, true)}</div>
            <div class="quantity-block">
              <div class="quantity-block__label">
                <label for="quantity-input">Кількість</label>
                <output id="quantity-output">${selectedQuantity.toLocaleString('uk-UA')} шт.</output>
              </div>
              <div class="quantity-control">
                <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
                <input id="quantity-input" type="number" min="1" max="${MAX_QUANTITY}" value="${selectedQuantity}" />
                <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
              </div>
              <div class="quantity-guide" aria-label="Правила ціни">
                <span><b>1–999</b><small>роздрібна ціна</small></span>
                <i aria-hidden="true"></i>
                <span><b>від 1 000</b><small>оптова ціна</small></span>
              </div>
              <div class="quantity-presets" aria-label="Швидкий вибір кількості">
                ${[100, 500, 1000, 5000, 10000, 50000].map((value) => `<button type="button" data-quantity="${value}">${value.toLocaleString('uk-UA')}</button>`).join('')}
              </div>
            </div>
            <div class="calculation-result" aria-live="polite">
              <div>
                <span id="calculator-tier">Роздрібна ціна</span>
                <strong id="calculator-unit-price">${formatMoney(publicUnitPrice(product, selectedQuantity))}<small>/ шт.</small></strong>
              </div>
              <div class="calculation-result__total">
                <span>Весь тираж</span>
                <strong id="calculator-total">${formatMoney(publicUnitPrice(product, selectedQuantity) * selectedQuantity)}</strong>
              </div>
            </div>
            <div class="threshold-note" id="threshold-note"></div>
            <button class="button button--gold button--wide" type="button" data-add-selected-to-cart>Додати до кошика</button>
          </div>
        </div>
      </section>

      <section class="section about-section" id="about">
        <div class="about-layout">
          <div class="about-copy reveal">
            <p class="eyebrow"><span></span> Про ToffiPacks</p>
            <h2>Коробки, які легко<br />підібрати й замовити.</h2>
            <p class="about-copy__lead">
              ToffiPacks виготовляє самозбірні коробки для малого бізнесу, виробництв
              і регулярних великих замовлень. В основі сервісу — точний внутрішній розмір,
              зрозуміла ціна та прямий зв’язок із менеджером.
            </p>
            <div class="about-facts">
              <article>
                <span>01</span>
                <strong>Точний підбір</strong>
                <p>Обираєте коробку за трьома габаритами, а не за умовною категорією товару.</p>
              </article>
              <article>
                <span>02</span>
                <strong>Зрозуміле замовлення</strong>
                <p>Розмір, кількість і кінцева вартість зібрані в одному сценарії.</p>
              </article>
            </div>
          </div>

          <article class="eco-card reveal">
            <div class="eco-card__topline">
              <span class="technical-label">Екологічний підхід</span>
              <span class="eco-card__seal" aria-hidden="true"></span>
            </div>
            <h3>Сертифікована<br />вторинна сировина.</h3>
            <p>
              Використовуємо високоякісний перероблений картон із підтверджувальними
              сертифікатами. Повторне використання сировини зменшує потребу в новому картоні
              та дає матеріалу ще один цикл життя.
            </p>
            <p class="eco-card__note">
              Повторне використання матеріалу допомагає зменшувати кількість відходів без
              зайвих слів і декоративних обіцянок.
            </p>
          </article>
        </div>
      </section>

      <section class="section business-section" id="business">
        <div class="section-heading reveal">
          <div>
            <p class="eyebrow"><span></span> Для бізнесу</p>
            <h2>Від першої партії<br />до великих тиражів.</h2>
          </div>
          <p>Працюємо і з невеликими замовленнями, і з регулярними потребами виробництва. Коробка підлаштовується під задачу, а не навпаки.</p>
        </div>
        <div class="business-grid">
          <article class="business-card reveal">
            <span class="business-card__number">01</span>
            <h3>Малий бізнес</h3>
            <p>Можна почати з невеликої партії, перевірити розмір і поступово збільшувати обсяг замовлення.</p>
          </article>
          <article class="business-card reveal">
            <span class="business-card__number">02</span>
            <h3>Великі тиражі</h3>
            <p>Калькулятор одразу рахує замовлення до 50 000 штук. Більший тираж менеджер прорахує окремо.</p>
          </article>
          <article class="business-card business-card--accent reveal">
            <span class="business-card__number">03</span>
            <h3>Під ваш запит</h3>
            <p>Якщо готовий розмір не підходить, залиште потрібні габарити та вимоги — підготуємо коробку під вашу задачу.</p>
            <a class="text-link text-link--light" href="#request">Описати задачу <span>→</span></a>
          </article>
        </div>
      </section>

      <section class="section why-section" id="why">
        <div class="why-heading reveal">
          <p class="eyebrow"><span></span> Чому ToffiPacks</p>
          <h2>Прості умови.<br /><em>Відчутна користь.</em></h2>
          <p>Рішення оцінюємо не гучними словами, а тим, скільки часу, матеріалу й коштів воно заощаджує клієнту.</p>
        </div>
        <div class="why-grid">
          <article class="why-card reveal">
            <span>01</span>
            <h3>Ціна</h3>
            <p>Кінцева вартість за штуку і весь тираж видна ще до заявки.</p>
          </article>
          <article class="why-card reveal">
            <span>02</span>
            <h3>Якість</h3>
            <p>Сертифікована сировина та контроль точності кожного розміру.</p>
          </article>
          <article class="why-card reveal">
            <span>03</span>
            <h3>Доступність</h3>
            <p>Замовлення для малого й великого бізнесу без зайвих кроків.</p>
          </article>
          <article class="why-card why-card--accent reveal">
            <span>04</span>
            <h3>Економія</h3>
            <p>Точний розмір скорочує зайве пакування, а тираж знижує витрати на одиницю.</p>
          </article>
        </div>
      </section>

      <section class="section delivery-section" id="delivery">
        <div class="delivery-layout">
          <div class="delivery-copy reveal">
            <p class="eyebrow eyebrow--light"><span></span> Доставка й оплата</p>
            <h2>Умови відомі<br />до запуску.</h2>
            <p>Менеджер погоджує спосіб доставки, строк і оплату разом із фінальним складом замовлення.</p>
            <a class="button button--gold" href="#request">Залишити заявку</a>
          </div>
          <div class="delivery-list reveal">
            <article>
              <span>01</span>
              <div><h3>Доставка</h3><p>Доставляємо по Києву та Київській області. Формат, адресу й вартість уточнюйте з менеджером.</p></div>
            </article>
            <article>
              <span>02</span>
              <div><h3>Строки</h3><p>Залежать від тиражу та індивідуального розміру. Точну дату називаємо до початку виготовлення.</p></div>
            </article>
            <article>
              <span>03</span>
              <div><h3>Оплата</h3><p>Форму оплати й рахунок погоджуємо разом із підсумковою вартістю до запуску замовлення.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section class="section request-section" id="request">
        <div class="request-copy reveal">
          <p class="eyebrow"><span></span> Кошик</p>
          <h2>Усі потрібні коробки<br />в одному замовленні.</h2>
          <p>
            Додавайте різні розміри, задавайте кількість для кожної позиції
            та одразу бачте загальну вартість.
          </p>
          <div class="cart-summary" id="request-summary" aria-live="polite"></div>
        </div>
        <form class="request-form reveal" id="request-form" novalidate>
          <div class="request-form__head">
            <span class="technical-label">Контактні дані</span>
            <span id="request-account-hint">Гість</span>
          </div>
          <div class="form-grid">
            <label class="field">
              <span>Ім’я *</span>
              <input class="input" name="name" autocomplete="name" required />
            </label>
            <label class="field">
              <span>Телефон *</span>
              <input class="input" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+380..." pattern="[+]?380[0-9]{9}" required />
            </label>
            <label class="field">
              <span>Компанія</span>
              <input class="input" name="company" autocomplete="organization" />
            </label>
          </div>
          <label class="field">
            <span>Коментар</span>
            <textarea class="input textarea" name="comment" rows="4" placeholder="Строк, доставка, особливості замовлення"></textarea>
          </label>
          <label class="checkbox">
            <input name="consent" type="checkbox" required />
            <span>Погоджуюся на обробку введених даних *</span>
          </label>
          <div class="form-status" id="request-status" aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">
            Створити заявку
          </button>
        </form>
      </section>

      <section class="section faq-section" id="faq">
        <div class="faq-intro reveal">
          <p class="eyebrow"><span></span> FAQ</p>
          <h2>Коротко про<br />умови замовлення.</h2>
          <p>Доставка, строки, оплата й індивідуальне виготовлення — без прихованих припущень.</p>
        </div>
        <div class="faq-list reveal">
          ${faqItems
            .map(
              (item, index) => `
                <details${index === 0 ? ' open' : ''}>
                  <summary><span>${escapeHtml(item.question)}</span><i aria-hidden="true"></i></summary>
                  <p>${escapeHtml(item.answer)}</p>
                </details>
              `,
            )
            .join('')}
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-brand">
        <span class="brand__mark brand__mark--large"><img src="./toffipacks-logo.webp" alt="" /></span>
        <div><strong>TOFFIPACKS</strong><p>Самозбірні коробки за точним розміром.</p></div>
      </div>
      <div class="footer-links">
        <a href="#catalog">Розміри</a>
        <a href="#calculator">Ціни</a>
        <a href="#about">Про нас</a>
        <a href="#delivery">Доставка</a>
        <a href="#request">Кошик</a>
        <a href="#account">Кабінет</a>
      </div>
      <div class="footer-meta">
        <p>Самозбірні коробки за точним внутрішнім розміром.</p>
        <span>© 2026 ToffiPacks</span>
      </div>
    </footer>

    ${supportWidgetMarkup()}

    <section class="admin-page" id="admin-page" hidden aria-labelledby="admin-title">
      <header class="admin-header">
        <a class="brand" href="#top">
          <span class="brand__mark"><img src="./toffipacks-logo.webp" alt="" /></span>
          <span class="brand__copy"><strong>TOFFIPACKS</strong><small>кабінет менеджера</small></span>
        </a>
        <a class="button button--ghost button--small" href="#top">Повернутися на сайт</a>
      </header>
      <div id="admin-content"></div>
      <dialog class="admin-product-dialog" id="admin-product-dialog" aria-labelledby="admin-product-dialog-title">
        <button class="dialog-close" type="button" data-close-admin-product aria-label="Закрити">×</button>
        <div id="admin-product-editor"></div>
      </dialog>
    </section>

    <section class="account-page" id="account-page" hidden aria-labelledby="account-page-title">
      <header class="admin-header account-header">
        <a class="brand" href="#top">
          <span class="brand__mark"><img src="./toffipacks-logo.webp" alt="" /></span>
          <span class="brand__copy"><strong>TOFFIPACKS</strong><small>особистий кабінет</small></span>
        </a>
        <a class="button button--ghost button--small" href="#top">Повернутися до коробок</a>
      </header>
      <div class="account-page__content" id="account-page-content"></div>
    </section>

    <dialog class="product-dialog" id="product-dialog" aria-labelledby="product-dialog-title">
      <button class="dialog-close" type="button" data-close-dialog aria-label="Закрити">×</button>
      <div id="product-dialog-content"></div>
    </dialog>

    <dialog class="profile-dialog" id="profile-dialog" aria-labelledby="profile-dialog-title">
      <button class="dialog-close" type="button" data-close-profile aria-label="Закрити">×</button>
      <div id="profile-dialog-content"></div>
    </dialog>
  `;
}

app.innerHTML = storefrontTemplate();

function openSupportPanel(): void {
  const panel = document.querySelector<HTMLElement>('#support-panel');
  const trigger = document.querySelector<HTMLButtonElement>('#support-trigger');
  if (!panel || !trigger || !panel.hidden) return;
  panel.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
  trigger.setAttribute('aria-label', 'Закрити швидку підтримку');
  window.requestAnimationFrame(() => {
    panel.classList.add('is-open');
    panel.querySelector<HTMLButtonElement>('[data-support-topic]')?.focus({ preventScroll: true });
  });
}

function closeSupportPanel(restoreFocus = true): void {
  const panel = document.querySelector<HTMLElement>('#support-panel');
  const trigger = document.querySelector<HTMLButtonElement>('#support-trigger');
  if (!panel || !trigger || panel.hidden) return;
  panel.classList.remove('is-open');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-label', 'Відкрити швидку підтримку');
  window.setTimeout(() => {
    if (!panel.classList.contains('is-open')) panel.hidden = true;
  }, 240);
  if (restoreFocus) trigger.focus({ preventScroll: true });
}

function answerSupportQuestion(topicId: string): void {
  const topic = supportTopics.find((item) => item.id === topicId);
  const conversation = document.querySelector<HTMLElement>('#support-conversation');
  const panel = document.querySelector<HTMLElement>('#support-panel');
  if (!topic || !conversation || !panel) return;
  activeSupportTopicId = topic.id;
  window.clearTimeout(supportResponseTimer);
  panel.classList.add('has-answer', 'is-thinking');
  document.querySelectorAll<HTMLButtonElement>('[data-support-topic]').forEach((button) => {
    const active = button.dataset.supportTopic === topic.id;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  conversation.innerHTML = `
    <div class="support-answer-stage">
      <div class="support-answer-question"><span>${escapeHtml(topic.question)}</span></div>
      <div class="support-message support-message--bot support-message--typing" aria-label="Тофік готує відповідь">
        <i></i><i></i><i></i>
      </div>
    </div>
  `;
  supportResponseTimer = window.setTimeout(() => {
    if (activeSupportTopicId !== topic.id) return;
    panel.classList.remove('is-thinking');
    conversation.innerHTML = `
      <div class="support-answer-stage">
        <div class="support-answer-question"><span>${escapeHtml(topic.question)}</span></div>
        <div class="support-answer-card">
          <span class="support-answer-card__label"><i aria-hidden="true"></i> Тофік підказує</span>
          <p>${escapeHtml(topic.answer)}</p>
          <a href="${escapeHtml(topic.actionHref)}" data-support-action>${escapeHtml(topic.actionLabel)} <i aria-hidden="true">→</i></a>
        </div>
        <button class="support-answer-back" type="button" data-support-back><span aria-hidden="true">←</span> Обрати інше питання</button>
      </div>
    `;
  }, 460);
}

function resetSupportConversation(): void {
  const panel = document.querySelector<HTMLElement>('#support-panel');
  const conversation = document.querySelector<HTMLElement>('#support-conversation');
  if (!panel || !conversation) return;
  window.clearTimeout(supportResponseTimer);
  activeSupportTopicId = '';
  panel.classList.remove('has-answer', 'is-thinking');
  conversation.innerHTML = supportWelcomeMarkup();
  document.querySelectorAll<HTMLButtonElement>('[data-support-topic]').forEach((button) => {
    button.classList.remove('is-active');
    button.setAttribute('aria-pressed', 'false');
  });
  window.setTimeout(() => document.querySelector<HTMLButtonElement>('[data-support-topic]')?.focus({ preventScroll: true }), 80);
}

const productGrid = document.querySelector<HTMLDivElement>('#product-grid');
const catalogCount = document.querySelector<HTMLParagraphElement>('#catalog-count');

function formatMillimeters(value: number): string {
  return new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 1 }).format(Math.max(0, value));
}

function productFitMarkup(product: Product): string {
  if (!fitDimensions) return '';
  const analysis = analyzeFit(fitDimensions, product.dimensions, fitMargin);
  if (analysis.fits) {
    const minimumClearance = Math.min(...analysis.clearancesPerSide);
    return `<div class="product-card__fit"><strong>Підходить</strong><span>мін. ${formatMillimeters(minimumClearance)} мм на бік</span></div>`;
  }
  const missingDimension = Math.max(...analysis.deficitsPerSide) * 2;
  return `<div class="product-card__fit is-near"><strong>Найближчий розмір</strong><span>бракує до ${formatMillimeters(missingDimension)} мм</span></div>`;
}

function productDialogFitNotice(product: Product): string {
  if (!fitDimensions) return '';
  const analysis = analyzeFit(fitDimensions, product.dimensions, fitMargin);
  if (analysis.fits) {
    return `<div class="product-modal__fit is-fit"><strong>Коробка підходить</strong><span>${fitMarginLabel(fitMargin)} враховано у підборі.</span></div>`;
  }
  const missingDimension = Math.max(...analysis.deficitsPerSide) * 2;
  return `<div class="product-modal__fit is-warning" role="status"><strong>Цей розмір замалий</strong><span>Бракує до ${formatMillimeters(missingDimension)} мм для обраного запасу. Додайте лише після ручної перевірки.</span></div>`;
}

function productCard(product: Product): string {
  const account = currentAccount();
  const retail = publicUnitPrice(product, 1);
  const wholesale = publicUnitPrice(product, WHOLESALE_FROM);
  const partner = personalUnitPrice(product, account);
  return `
    <article
      class="product-card${product.id === selectedProductId ? ' is-selected' : ''}"
      data-product-card="${escapeHtml(product.id)}"
    >
      <div class="product-card__head">
        <span class="product-card__number">№${escapeHtml(product.number)}</span>
        <span class="product-card__size-label">внутрішній розмір</span>
      </div>
      <div class="product-card__visual">${boxDiagram(product, true)}</div>
      <h3>${dimensionText(product.dimensions)}</h3>
      ${productFitMarkup(product)}
      <div class="product-card__prices">
        ${
          partner !== null
            ? `<div class="partner-price"><span>Ваша персональна</span><strong>${formatMoney(partner)}<small>/шт.</small></strong></div>`
            : `
              <div><span>1–999 шт.</span><strong>${formatMoney(retail)}</strong></div>
              <div><span>від 1000 шт.</span><strong>${formatMoney(wholesale)}</strong></div>
            `
        }
      </div>
      <span class="button button--card product-card__cta" aria-hidden="true">Детальніше</span>
      <button
        class="product-card__open"
        type="button"
        data-open-product="${escapeHtml(product.id)}"
        aria-label="Відкрити коробку №${escapeHtml(product.number)}, ${dimensionText(product.dimensions)}"
      ></button>
    </article>
  `;
}

function productDialogContent(product: Product): string {
  const account = currentAccount();
  const calculatedUnit = unitPrice(product, selectedQuantity, account);
  const total = calculatedUnit * selectedQuantity;
  return `
    <div class="product-modal">
      <div class="product-modal__visual">
        <div class="product-modal__labels">
          <span>№${escapeHtml(product.number)}</span>
        </div>
        <div class="product-modal__drawing">${boxDiagram(product, true)}</div>
        <p>Внутрішній розмір · Д × Ш × В</p>
      </div>
      <div class="product-modal__content">
        <p class="eyebrow"><span></span> Внутрішній розмір</p>
        <h2 id="product-dialog-title">${dimensionText(product.dimensions)}</h2>
        ${productDialogFitNotice(product)}

        <div class="product-modal__rules">
          <div><span>1–999 шт.</span><strong>${formatMoney(publicUnitPrice(product, 1))} / шт.</strong></div>
          <div><span>від 1 000 шт.</span><strong>${formatMoney(publicUnitPrice(product, WHOLESALE_FROM))} / шт.</strong></div>
        </div>

        <div class="quantity-block quantity-block--modal">
          <div class="quantity-block__label">
            <label for="modal-quantity-input">Кількість</label>
            <output id="modal-quantity-output">${selectedQuantity.toLocaleString('uk-UA')} шт.</output>
          </div>
          <div class="quantity-control">
            <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
            <input id="modal-quantity-input" type="number" min="1" max="${MAX_QUANTITY}" value="${selectedQuantity}" />
            <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
          </div>
          <div class="quantity-presets quantity-presets--modal" aria-label="Швидкий вибір кількості">
            ${[100, 500, 1000, 5000, 10000, 50000].map((value) => `<button type="button" data-quantity="${value}">${value.toLocaleString('uk-UA')}</button>`).join('')}
          </div>
        </div>

        <div class="product-modal__total" aria-live="polite">
          <div><span id="modal-price-tier">${priceTypeLabel(selectedQuantity, account, product)}</span><strong id="modal-unit-price">${formatMoney(calculatedUnit)} / шт.</strong></div>
          <div><span>Весь тираж</span><strong id="modal-total">${formatMoney(total)}</strong></div>
        </div>

        <div class="product-modal__actions">
          <button class="button button--primary" type="button" data-product-to-cart>Додати до кошика</button>
          <button class="button button--ghost" type="button" data-product-to-calculator>Відкрити калькулятор</button>
        </div>
      </div>
    </div>
  `;
}

function updateProductDialog(): void {
  const dialog = document.querySelector<HTMLDialogElement>('#product-dialog');
  if (!dialog?.open || !activeProductDialogId) return;
  const product = visibleProducts().find((item) => item.id === activeProductDialogId);
  if (!product) return;
  const account = currentAccount();
  const calculatedUnit = unitPrice(product, selectedQuantity, account);
  const quantityInput = dialog.querySelector<HTMLInputElement>('#modal-quantity-input');
  if (quantityInput) quantityInput.value = String(selectedQuantity);
  const quantityOutput = dialog.querySelector<HTMLOutputElement>('#modal-quantity-output');
  if (quantityOutput) quantityOutput.value = `${selectedQuantity.toLocaleString('uk-UA')} шт.`;
  const tier = dialog.querySelector<HTMLElement>('#modal-price-tier');
  if (tier) tier.textContent = priceTypeLabel(selectedQuantity, account, product);
  const unit = dialog.querySelector<HTMLElement>('#modal-unit-price');
  if (unit) unit.textContent = `${formatMoney(calculatedUnit)} / шт.`;
  const total = dialog.querySelector<HTMLElement>('#modal-total');
  if (total) total.textContent = formatMoney(calculatedUnit * selectedQuantity);
  dialog.querySelectorAll<HTMLButtonElement>('[data-quantity]').forEach((button) => {
    button.classList.toggle('is-active', Number(button.dataset.quantity) === selectedQuantity);
  });
}

function openProductDialog(productId: string): void {
  const product = visibleProducts().find((item) => item.id === productId);
  const dialog = document.querySelector<HTMLDialogElement>('#product-dialog');
  const content = document.querySelector<HTMLDivElement>('#product-dialog-content');
  if (!product || !dialog || !content) return;
  activeProductDialogId = product.id;
  selectProduct(product.id);
  content.innerHTML = productDialogContent(product);
  dialog.classList.remove('is-closing');
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  updateProductDialog();
}

function closeProductDialog(afterClose?: () => void): void {
  const dialog = document.querySelector<HTMLDialogElement>('#product-dialog');
  if (!dialog) {
    activeProductDialogId = null;
    afterClose?.();
    return;
  }

  const finishClosing = (): void => {
    dialog.classList.remove('is-closing');
    if (dialog.open && typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    activeProductDialogId = null;
    afterClose?.();
  };

  if (!dialog.open || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finishClosing();
    return;
  }

  if (dialog.classList.contains('is-closing')) return;
  dialog.classList.add('is-closing');
  window.setTimeout(finishClosing, 230);
}

function filteredProducts(): Product[] {
  const products = visibleProducts();
  const normalizedSearch = catalogSearch.trim().toLocaleLowerCase('uk-UA');
  const result = products.filter((product) => {
    const searchable = `${product.number} ${product.name} ${dimensionText(product.dimensions)}`.toLocaleLowerCase('uk-UA');
    const matchesSearch = !normalizedSearch || searchable.includes(normalizedSearch);
    const matchesDimensions = !fitDimensions || analyzeFit(fitDimensions, product.dimensions, fitMargin).fits;
    return matchesSearch && matchesDimensions;
  });

  return result.sort((first, second) => {
    if (catalogSort === 'price') return first.basePrice - second.basePrice;
    if (catalogSort === 'number') return first.number.localeCompare(second.number, 'uk-UA', { numeric: true });
    return productVolume(first) - productVolume(second);
  });
}

function nearestProducts(): Product[] {
  if (!fitDimensions) return [];
  const normalizedSearch = catalogSearch.trim().toLocaleLowerCase('uk-UA');
  return visibleProducts()
    .filter((product) => {
      const searchable = `${product.number} ${product.name} ${dimensionText(product.dimensions)}`.toLocaleLowerCase('uk-UA');
      return !normalizedSearch || searchable.includes(normalizedSearch);
    })
    .map((product) => {
      const analysis = analyzeFit(fitDimensions as Dimensions, product.dimensions, fitMargin);
      const deficit = analysis.deficitsPerSide.reduce((sum, value) => sum + value, 0);
      return { product, deficit };
    })
    .sort((first, second) => first.deficit - second.deficit || productVolume(first.product) - productVolume(second.product))
    .slice(0, 3)
    .map(({ product }) => product);
}

function renderCatalog(loading = false): void {
  if (!productGrid || !catalogCount) return;
  const more = document.querySelector<HTMLElement>('#catalog-more');
  const moreButton = document.querySelector<HTMLButtonElement>('#catalog-more-button');
  if (loading) {
    catalogCount.textContent = 'Оновлюємо список…';
    if (more) more.hidden = true;
    productGrid.innerHTML = Array.from(
      { length: 6 },
      () => '<div class="product-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>',
    ).join('');
    return;
  }

  const result = filteredProducts();
  const fitNote = fitDimensions ? ` · предмет ${dimensionText(fitDimensions)} · ${fitMarginLabel(fitMargin)}` : '';
  catalogCount.textContent = `${result.length} із ${visibleProducts().length} розмірів${fitNote}`;
  if (!result.length) {
    const nearest = nearestProducts();
    productGrid.innerHTML = `
      <div class="empty-state${nearest.length ? ' empty-state--nearest' : ''}">
        <div class="empty-state__box" aria-hidden="true"></div>
        <h3>Готового розміру немає.</h3>
        <p>${fitMargin ? `Із запасом ${fitMarginLabel(fitMargin)} точного варіанта немає. Найближчі коробки нижче замалі — це позначено окремо.` : 'Змініть габарити предмета або залиште заявку з потрібним розміром.'}</p>
        <div class="empty-state__actions">
          ${fitMargin ? '<button class="button button--ghost" type="button" data-use-tight-fit>Показати без запасу</button>' : ''}
          <a class="button button--primary" href="#request">Описати свій розмір</a>
        </div>
        ${nearest.length ? `<div class="nearest-results"><div class="nearest-results__head"><strong>Найближчі готові розміри</strong><span>Вони не відповідають обраному запасу</span></div><div class="nearest-results__grid">${nearest.map(productCard).join('')}</div></div>` : ''}
      </div>
    `;
    if (more) more.hidden = true;
    return;
  }
  const isMobile = window.matchMedia('(max-width: 680px)').matches;
  const canCollapse = isMobile && !catalogSearch.trim() && !fitDimensions && result.length > 4;
  const visibleResult = canCollapse && !catalogExpanded ? result.slice(0, 4) : result;
  productGrid.innerHTML = visibleResult.map(productCard).join('');
  if (more && moreButton) {
    more.hidden = !canCollapse;
    moreButton.textContent = catalogExpanded ? 'Згорнути каталог' : `Показати всі ${result.length} розмірів`;
    moreButton.setAttribute('aria-expanded', String(catalogExpanded));
  }
}

function queueCatalogRender(): void {
  window.clearTimeout(catalogTimer);
  renderCatalog(true);
  catalogTimer = window.setTimeout(() => renderCatalog(false), 320);
}

function syncProductPickers(rebuildOptions = false): void {
  const product = selectedProduct();
  document.querySelectorAll<HTMLElement>('[data-product-picker]').forEach((picker) => {
    picker.dataset.value = product.id;
    const number = picker.querySelector<HTMLElement>('.product-picker__value b');
    const dimensions = picker.querySelector<HTMLElement>('.product-picker__value span');
    if (number) number.textContent = `№${product.number}`;
    if (dimensions) dimensions.textContent = dimensionText(product.dimensions);

    const menu = picker.querySelector<HTMLElement>('.product-picker__menu');
    if (menu && rebuildOptions) menu.innerHTML = productPickerOptions();
    picker.querySelectorAll<HTMLButtonElement>('[data-product-picker-value]').forEach((option) => {
      option.setAttribute('aria-selected', String(option.dataset.productPickerValue === product.id));
    });
  });
}

function closeProductPicker(picker: HTMLElement, restoreFocus = false): void {
  const trigger = picker.querySelector<HTMLButtonElement>('[data-product-picker-trigger]');
  const menu = picker.querySelector<HTMLElement>('.product-picker__menu');
  picker.classList.remove('is-open');
  trigger?.setAttribute('aria-expanded', 'false');
  window.setTimeout(() => {
    if (menu && !picker.classList.contains('is-open')) menu.hidden = true;
  }, 190);
  if (restoreFocus) trigger?.focus();
}

function closeProductPickers(except?: HTMLElement): void {
  document.querySelectorAll<HTMLElement>('[data-product-picker].is-open').forEach((picker) => {
    if (picker !== except) closeProductPicker(picker);
  });
}

function openProductPicker(picker: HTMLElement, focusSelected = false): void {
  closeProductPickers(picker);
  const trigger = picker.querySelector<HTMLButtonElement>('[data-product-picker-trigger]');
  const menu = picker.querySelector<HTMLElement>('.product-picker__menu');
  if (!trigger || !menu) return;
  menu.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
  window.requestAnimationFrame(() => {
    picker.classList.add('is-open');
    const selected = picker.querySelector<HTMLButtonElement>('[data-product-picker-value][aria-selected="true"]');
    selected?.scrollIntoView({ block: 'nearest' });
    if (focusSelected) selected?.focus();
  });
}

function toggleProductPicker(picker: HTMLElement): void {
  if (picker.classList.contains('is-open')) closeProductPicker(picker);
  else openProductPicker(picker);
}

function renderCalculator(): void {
  const product = selectedProduct();
  const account = currentAccount();
  const calculatedUnit = unitPrice(product, selectedQuantity, account);
  const total = calculatedUnit * selectedQuantity;
  const tier = priceTypeLabel(selectedQuantity, account, product);

  syncProductPickers();
  document.querySelectorAll<HTMLInputElement>('#quantity-input, #hero-quantity-input, #modal-quantity-input').forEach((input) => {
    input.value = String(selectedQuantity);
  });

  const output = document.querySelector<HTMLOutputElement>('#quantity-output');
  if (output) output.value = `${selectedQuantity.toLocaleString('uk-UA')} шт.`;

  const preview = document.querySelector<HTMLDivElement>('#calculator-preview');
  if (preview) {
    preview.classList.remove('is-changing');
    void preview.offsetWidth;
    preview.classList.add('is-changing');
    preview.innerHTML = boxDiagram(product, true);
  }

  const tierElement = document.querySelector<HTMLElement>('#calculator-tier');
  if (tierElement) tierElement.textContent = tier;
  const unitElement = document.querySelector<HTMLElement>('#calculator-unit-price');
  if (unitElement) unitElement.innerHTML = `${formatMoney(calculatedUnit)}<small>/ шт.</small>`;
  const totalElement = document.querySelector<HTMLElement>('#calculator-total');
  if (totalElement) totalElement.textContent = formatMoney(total);

  const heroTier = document.querySelector<HTMLElement>('#hero-price-label');
  if (heroTier) heroTier.textContent = tier;
  const heroTotal = document.querySelector<HTMLElement>('#hero-total');
  if (heroTotal) heroTotal.textContent = formatMoney(total);
  const heroUnit = document.querySelector<HTMLElement>('#hero-unit');
  if (heroUnit) heroUnit.textContent = `${formatMoney(calculatedUnit)} / шт.`;

  const badge = document.querySelector<HTMLElement>('#account-price-badge');
  if (badge) {
    const hasPersonalPrice = personalUnitPrice(product, account) !== null;
    badge.textContent = hasPersonalPrice ? 'Персональна ціна активна' : 'Публічна ціна';
    badge.classList.toggle('is-partner', hasPersonalPrice);
  }

  const threshold = document.querySelector<HTMLElement>('#threshold-note');
  if (threshold) {
    if (personalUnitPrice(product, account) !== null) {
      threshold.innerHTML = `<strong>Ваша персональна ціна:</strong> ${formatMoney(calculatedUnit)} за одиницю незалежно від тиражу.`;
    } else if (selectedQuantity < WHOLESALE_FROM) {
      const missing = WHOLESALE_FROM - selectedQuantity;
      const wholesaleTotal = publicUnitPrice(product, WHOLESALE_FROM) * WHOLESALE_FROM;
      threshold.innerHTML = `Ще <strong>${missing.toLocaleString('uk-UA')} шт.</strong> до оптового тарифу. 1000 шт. коштуватимуть ${formatMoney(wholesaleTotal)}.`;
    } else {
      threshold.innerHTML = `<strong>Оптовий тариф активний.</strong> Економія проти роздрібної ціни — ${formatMoney(selectedQuantity)} на всьому тиражі.`;
    }
  }

  document.querySelectorAll<HTMLButtonElement>('[data-quantity]').forEach((button) => {
    button.classList.toggle('is-active', Number(button.dataset.quantity) === selectedQuantity);
  });
  renderCart();
  updateProductDialog();
}

function selectProduct(productId: string, scrollToCalculator = false): void {
  if (!visibleProducts().some((product) => product.id === productId)) return;
  selectedProductId = productId;
  renderCatalog(false);
  renderCalculator();
  if (scrollToCalculator) {
    document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function setQuantity(value: number): void {
  selectedQuantity = clampQuantity(value);
  renderCalculator();
}

function addToCart(productId: string, quantity: number): void {
  if (!visibleProducts().some((product) => product.id === productId)) return;
  const storedCart = cartItems();
  const existing = storedCart.find((item) => item.productId === productId);
  if (existing) existing.quantity = clampQuantity(quantity);
  else storedCart.push({ productId, quantity: clampQuantity(quantity) });
  writeStorage(STORAGE.cart, storedCart);
  renderCart();

  const cartButton = document.querySelector<HTMLElement>('#cart-button');
  cartButton?.classList.remove('is-updated');
  void cartButton?.offsetWidth;
  cartButton?.classList.add('is-updated');
}

function updateCartQuantity(productId: string, quantity: number): void {
  const storedCart = cartItems();
  const item = storedCart.find((candidate) => candidate.productId === productId);
  if (!item) return;
  item.quantity = clampQuantity(quantity);
  writeStorage(STORAGE.cart, storedCart);
  renderCart();
}

function removeFromCart(productId: string): void {
  writeStorage(
    STORAGE.cart,
    cartItems().filter((item) => item.productId !== productId),
  );
  renderCart();
}

function renderCart(): void {
  const container = document.querySelector<HTMLDivElement>('#request-summary');
  const count = document.querySelector<HTMLElement>('#cart-count');
  const submit = document.querySelector<HTMLButtonElement>('#request-form button[type="submit"]');
  const storedCart = cartItems();
  const account = currentAccount();

  if (count) count.textContent = String(storedCart.length);
  if (submit) submit.disabled = storedCart.length === 0;
  if (!container) return;

  if (!storedCart.length) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty__visual" aria-hidden="true">
          <svg viewBox="0 0 132 92" fill="none">
            <path class="cart-empty__lid" d="M20 34 53 14h58L78 34H20Z" />
            <path class="cart-empty__front" d="M20 34h58v40H20V34Z" />
            <path class="cart-empty__side" d="m78 34 33-20v40L78 74V34Z" />
            <path d="M20 34h58m0 0 33-20M78 34v40M20 74h58l33-20V14H53L20 34v40Z" />
            <path class="cart-empty__fold" d="m20 34 30 12 28-12" />
            <circle cx="110" cy="71" r="15" />
            <path class="cart-empty__plus" d="M110 64v14m-7-7h14" />
          </svg>
        </div>
        <strong>Кошик порожній</strong>
        <p>Оберіть розмір і додайте потрібну кількість коробок.</p>
        <a class="button button--ghost button--small" href="#catalog">Обрати коробки</a>
      </div>
    `;
    return;
  }

  let cartTotal = 0;
  const itemsMarkup = storedCart
    .map((item) => {
      const product = visibleProducts().find((candidate) => candidate.id === item.productId);
      if (!product) return '';
      const price = unitPrice(product, item.quantity, account);
      const lineTotal = price * item.quantity;
      cartTotal += lineTotal;
      return `
        <article class="cart-item">
          <div class="cart-item__index">№${escapeHtml(product.number)}</div>
          <div class="cart-item__info">
            <strong>${dimensionText(product.dimensions)}</strong>
            <span>${formatMoney(price)} / шт.</span>
          </div>
          <label class="cart-item__quantity">
            <span>Кількість</span>
            <div class="cart-item__quantity-control">
              <button type="button" data-cart-step="-100" data-cart-product="${escapeHtml(product.id)}" aria-label="Зменшити кількість коробки №${escapeHtml(product.number)} на 100">−</button>
              <input class="input" type="number" min="1" max="${MAX_QUANTITY}" value="${item.quantity}" data-cart-quantity="${escapeHtml(product.id)}" />
              <button type="button" data-cart-step="100" data-cart-product="${escapeHtml(product.id)}" aria-label="Збільшити кількість коробки №${escapeHtml(product.number)} на 100">+</button>
            </div>
          </label>
          <div class="cart-item__total">
            <span>Сума</span>
            <strong>${formatMoney(lineTotal)}</strong>
          </div>
          <div class="cart-item__actions">
            <button type="button" data-edit-cart="${escapeHtml(product.id)}">Змінити</button>
            <button class="cart-item__remove" type="button" data-remove-cart="${escapeHtml(product.id)}" aria-label="Прибрати коробку №${escapeHtml(product.number)} з кошика">×</button>
          </div>
        </article>
      `;
    })
    .join('');

  container.innerHTML = `
    <div class="cart-list">${itemsMarkup}</div>
    <div class="cart-summary__total">
      <span>${positionLabel(storedCart.length)}</span>
      <div><small>Загальна вартість</small><strong>${formatMoney(cartTotal)}</strong></div>
    </div>
    <div class="cart-summary__actions">
      <a class="cart-continue" href="#catalog">+ Додати ще один розмір</a>
      <button type="button" data-clear-cart>Очистити кошик</button>
    </div>
  `;
}

function repeatOrder(orderId: string): void {
  const order = orders().find((item) => item.id === orderId);
  if (!order) return;
  const availableIds = new Set(visibleProducts().map((product) => product.id));
  const repeated = order.items
    .filter((item) => availableIds.has(item.productId))
    .map((item) => ({ productId: item.productId, quantity: clampQuantity(item.quantity) }));
  if (!repeated.length) return;
  const merged = cartItems().filter((item) => !repeated.some((candidate) => candidate.productId === item.productId));
  writeStorage(STORAGE.cart, [...merged, ...repeated]);
  renderCart();
  window.location.hash = 'request';
  window.setTimeout(() => document.querySelector('#request')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
}

function renderAccountButton(): void {
  const button = document.querySelector<HTMLAnchorElement>('#account-button');
  const account = currentAccount();
  if (!button) return;
  button.textContent = account ? account.name.split(' ')[0] : 'Кабінет';
  button.classList.toggle('is-signed-in', Boolean(account));

  const hint = document.querySelector<HTMLElement>('#request-account-hint');
  if (hint) hint.textContent = account ? account.name : 'Гість';

  const form = document.querySelector<HTMLFormElement>('#request-form');
  if (form && account) {
    const setValue = (name: string, value: string): void => {
      const input = form.elements.namedItem(name);
      if (input instanceof HTMLInputElement && !input.value) input.value = value;
    };
    setValue('name', account.name);
    setValue('phone', account.phone);
    setValue('company', account.company);
  }
  renderCart();
}

function accountPageContent(): string {
  const account = currentAccount();
  if (account) {
    const accountOrders = orders()
      .filter((order) => order.accountId === account.id)
      .slice()
      .reverse();
    const activeOrders = accountOrders.filter((order) => order.status !== 'Закрита').length;
    const orderTotal = accountOrders.reduce((sum, order) => sum + order.total, 0);
    const initials = account.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toLocaleUpperCase('uk-UA');
    const product = selectedProduct();
    const personalPrice = unitPrice(product, selectedQuantity, account);
    const personalPriceProducts = visibleProducts().flatMap((item) => {
      const price = personalUnitPrice(item, account);
      return price === null ? [] : [{ product: item, price }];
    });
    const personalPriceCount = personalPriceProducts.length;
    const hasPersonalPrices = personalPriceCount > 0;
    return `
      <div class="account-dashboard">
        <section class="account-dashboard__hero">
          <div class="account-identity">
            <span class="account-avatar">${escapeHtml(initials || 'TP')}</span>
            <div>
              <p class="eyebrow eyebrow--light"><span></span> Особистий кабінет</p>
              <h1 id="account-page-title">${escapeHtml(account.name)}</h1>
              <p>${escapeHtml(account.phone)}${account.company ? ` · ${escapeHtml(account.company)}` : ''}</p>
            </div>
          </div>
          <div class="account-dashboard__hero-actions">
            <span class="account-client-badge">${account.partner ? 'Постійний клієнт' : 'Новий клієнт'}</span>
            <button class="account-logout" type="button" id="logout-button">Вийти</button>
          </div>
          <div class="account-price-card${hasPersonalPrices ? ' is-partner' : ''}">
            <span>Ваші ціни</span>
            <strong>${hasPersonalPrices ? 'Персональні ціни активні' : 'Стандартні ціни'}</strong>
            <p>${hasPersonalPrices ? `Окремі ціни застосовано для ${personalPriceCount} розмірів у каталозі, калькуляторі та кошику.` : 'Усі суми показані одразу в кінцевому вигляді.'}</p>
          </div>
        </section>

        <div class="account-kpis">
          <article><span>Усі заявки</span><strong>${accountOrders.length}</strong><small>оформлено</small></article>
          <article><span>Активні</span><strong>${activeOrders}</strong><small>потребують уваги</small></article>
          <article><span>Сума заявок</span><strong>${formatMoney(orderTotal)}</strong><small>загальна вартість</small></article>
        </div>

        <section class="account-personal-prices${hasPersonalPrices ? ' is-active' : ''}">
          <div class="account-personal-prices__head">
            <div>
              <p class="eyebrow"><span></span> Ваш персональний прайс</p>
              <h2>${hasPersonalPrices ? 'Ціни, доступні тільки вам.' : 'Персональні ціни ще не налаштовані.'}</h2>
            </div>
            <p>${hasPersonalPrices ? 'Менеджер задає кінцеву ціну окремо для кожного розміру. Вона автоматично використовується в усіх розрахунках після входу.' : 'Після узгодження менеджер додасть індивідуальні ціни для потрібних коробок.'}</p>
          </div>
          ${
            hasPersonalPrices
              ? `<div class="account-personal-prices__grid">
                  ${personalPriceProducts
                    .map(
                      ({ product: priceProduct, price }, index) => `
                        <button type="button" data-account-price-product="${escapeHtml(priceProduct.id)}">
                          <span class="account-personal-prices__index">${String(index + 1).padStart(2, '0')}</span>
                          <span class="account-personal-prices__product"><strong>№${escapeHtml(priceProduct.number)}</strong><small>${dimensionText(priceProduct.dimensions)}</small></span>
                          <span class="account-personal-prices__value"><strong>${formatMoney(price)}</strong><small>за 1 шт.</small></span>
                          <i aria-hidden="true">→</i>
                        </button>
                      `,
                    )
                    .join('')}
                </div>`
              : '<a class="button button--ghost" href="#catalog">Переглянути звичайні ціни</a>'
          }
        </section>

        <div class="account-dashboard__grid">
          <section class="account-orders-panel">
            <div class="account-panel-heading">
              <div><p class="eyebrow"><span></span> Історія</p><h2>Мої заявки</h2></div>
              <a class="text-link" href="#request">Нова заявка <span>→</span></a>
            </div>
            <div class="account-order-list">
              ${
                accountOrders.length
                  ? accountOrders
                      .map((order) => {
                        const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
                        return `
                          <article class="account-order">
                            <div class="account-order__main">
                              <span>${escapeHtml(order.id)}</span>
                              <strong>${positionLabel(order.items.length)}</strong>
                              <small>${totalQuantity.toLocaleString('uk-UA')} шт. загалом</small>
                            </div>
                            <div class="account-order__price"><strong>${formatMoney(order.total)}</strong><small>загальна сума</small></div>
                            <div class="account-order__meta"><span>${escapeHtml(order.status)}</span><time datetime="${order.createdAt}">${new Date(order.createdAt).toLocaleDateString('uk-UA')}</time></div>
                            <div class="account-order__items">
                              ${order.items
                                .map(
                                  (item) => `<span><b>№${escapeHtml(item.productNumber)}</b> ${dimensionText(item.dimensions)} · ${item.quantity.toLocaleString('uk-UA')} шт.</span>`,
                                )
                                .join('')}
                            </div>
                            <button class="account-order__repeat" type="button" data-repeat-order="${escapeHtml(order.id)}">Повторити замовлення</button>
                          </article>
                        `;
                      })
                      .join('')
                  : '<div class="account-empty"><strong>Заявок ще немає.</strong><p>Оберіть розмір, порахуйте тираж і збережіть першу заявку.</p><a class="button button--primary" href="#catalog">До каталогу</a></div>'
              }
            </div>
          </section>

          <aside class="account-sidebar">
            <article class="account-quick-order">
              <p class="technical-label">Швидкий розрахунок</p>
              <div class="account-quick-order__box">${boxDiagram(product, false)}</div>
              <span>Коробка №${escapeHtml(product.number)}</span>
              <h3>${dimensionText(product.dimensions)}</h3>
              <div><span>${selectedQuantity.toLocaleString('uk-UA')} шт. · ${personalUnitPrice(product, account) !== null ? 'ваша ціна' : 'ціна на сайті'}</span><strong>${formatMoney(personalPrice * selectedQuantity)}</strong></div>
              <button class="button button--gold button--wide" type="button" data-add-selected-to-cart>Додати до кошика</button>
            </article>
            <article class="account-profile-card">
              <div><p class="technical-label">Профіль</p><button class="text-link" type="button" data-edit-profile>Дані клієнта</button></div>
              <dl>
                <div><dt>Телефон</dt><dd>${escapeHtml(account.phone)}</dd></div>
                <div><dt>Компанія</dt><dd>${escapeHtml(account.company || 'Не вказано')}</dd></div>
                <div><dt>Статус</dt><dd>${account.partner ? 'Постійний клієнт' : 'Новий клієнт'}</dd></div>
              </dl>
              ${account.role === 'admin' ? '<a class="button button--ghost button--wide" href="#admin">Відкрити адмінку</a>' : ''}
            </article>
            ${
              savedMeasurements().length
                ? `<article class="account-measurements"><div><p class="technical-label">Збережені розміри</p><span>${savedMeasurements().length} останніх</span></div><div class="account-measurements__list">${savedMeasurements()
                    .map(
                      (measurement) => `<button type="button" data-saved-measurement="${escapeHtml(measurement.id)}"><strong>${dimensionText(measurement.dimensions)}</strong><span>${fitMarginLabel(measurement.margin)}</span></button>`,
                    )
                    .join('')}</div></article>`
                : ''
            }
          </aside>
        </div>
      </div>
    `;
  }

  return `
    <div class="auth-layout">
      <div class="auth-intro">
        <p class="eyebrow"><span></span> Кабінет ToffiPacks</p>
        <h1 id="account-page-title">Увійдіть за номером телефону.</h1>
        <p>Постійним клієнтам менеджер може налаштувати окрему персональну ціну для кожної коробки.</p>
      </div>
      <div class="auth-forms">
        <div class="auth-tabs" role="tablist">
          <button class="is-active" type="button" role="tab" aria-selected="true" data-auth-tab="login">Вхід</button>
          <button type="button" role="tab" aria-selected="false" data-auth-tab="register">Реєстрація</button>
        </div>
        <form id="login-form" class="auth-form" data-auth-panel="login" novalidate>
          <label class="field"><span>Телефон</span><input class="input" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+380..." pattern="[+]?380[0-9]{9}" required /></label>
          <label class="field"><span>Пароль</span><input class="input" name="password" type="password" required /></label>
          <div class="form-status" data-auth-status aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">Увійти</button>
        </form>
        <form id="register-form" class="auth-form" data-auth-panel="register" hidden novalidate>
          <div class="form-grid">
            <label class="field"><span>Ім’я *</span><input class="input" name="name" required /></label>
            <label class="field"><span>Телефон *</span><input class="input" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+380..." pattern="[+]?380[0-9]{9}" required /></label>
          </div>
          <label class="field"><span>Компанія</span><input class="input" name="company" /></label>
          <label class="field"><span>Пароль, від 8 символів *</span><input class="input" name="password" type="password" minlength="8" required /></label>
          <div class="form-status" data-auth-status aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">Створити акаунт</button>
        </form>
      </div>
    </div>
  `;
}

function renderAccountPage(): void {
  const content = document.querySelector<HTMLDivElement>('#account-page-content');
  if (content) content.innerHTML = accountPageContent();
}

function profileEditorMarkup(account: Account): string {
  return `
    <div class="profile-editor">
      <p class="eyebrow"><span></span> Дані клієнта</p>
      <h2 id="profile-dialog-title">Оновити профіль.</h2>
      <p>Телефон використовується для входу та зв’язку щодо заявки.</p>
      <form id="profile-form" novalidate>
        <label class="field"><span>Ім’я *</span><input class="input" name="name" value="${escapeHtml(account.name)}" autocomplete="name" required /></label>
        <label class="field"><span>Телефон *</span><input class="input" name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${escapeHtml(account.phone)}" pattern="[+]?380[0-9]{9}" required /></label>
        <label class="field"><span>Компанія</span><input class="input" name="company" value="${escapeHtml(account.company)}" autocomplete="organization" /></label>
        <label class="field"><span>Новий пароль</span><input class="input" name="password" type="password" minlength="8" autocomplete="new-password" placeholder="Залиште порожнім, щоб не змінювати" /></label>
        <div class="form-status" data-profile-status aria-live="polite"></div>
        <div class="profile-editor__actions">
          <button class="button button--ghost" type="button" data-close-profile>Скасувати</button>
          <button class="button button--primary" type="submit">Зберегти дані</button>
        </div>
      </form>
    </div>
  `;
}

function openProfileEditor(): void {
  const account = currentAccount();
  const dialog = document.querySelector<HTMLDialogElement>('#profile-dialog');
  const content = document.querySelector<HTMLElement>('#profile-dialog-content');
  if (!account || !dialog || !content) return;
  content.innerHTML = profileEditorMarkup(account);
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  content.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
}

async function handleProfileSave(form: HTMLFormElement): Promise<void> {
  form.classList.add('was-validated');
  const status = form.querySelector<HTMLElement>('[data-profile-status]');
  if (!form.reportValidity()) {
    if (status) {
      status.className = 'form-status is-error';
      status.textContent = 'Перевірте ім’я, телефон і новий пароль.';
    }
    return;
  }
  const current = currentAccount();
  if (!current) return;
  const data = new FormData(form);
  const phone = normalizePhone(String(data.get('phone') ?? ''));
  const stored = accounts();
  if (stored.some((account) => account.id !== current.id && phoneKey(account.phone) === phoneKey(phone))) {
    if (status) {
      status.className = 'form-status is-error';
      status.textContent = 'Акаунт із таким номером уже існує.';
    }
    return;
  }
  const password = String(data.get('password') ?? '');
  if (backendEnabled) {
    try {
      const updatedAccount = await backendApi.updateMe({
        name: String(data.get('name') ?? '').trim(),
        phone,
        company: String(data.get('company') ?? '').trim(),
        ...(password ? { password } : {}),
      });
      cacheAccount(updatedAccount);
      document.querySelector<HTMLDialogElement>('#profile-dialog')?.close();
      renderAccountButton();
      renderAccountPage();
      renderCalculator();
      renderCatalog(false);
    } catch (error) {
      if (status) {
        status.className = 'form-status is-error';
        status.textContent = apiErrorMessage(error, 'Не вдалося оновити профіль.');
      }
    }
    return;
  }
  const updated = stored.map((account) =>
    account.id === current.id
      ? {
          ...account,
          name: String(data.get('name') ?? '').trim(),
          phone,
          company: String(data.get('company') ?? '').trim(),
          password: password || account.password,
        }
      : account,
  );
  writeStorage(STORAGE.accounts, updated);
  document.querySelector<HTMLDialogElement>('#profile-dialog')?.close();
  renderAccountButton();
  renderAccountPage();
  renderCalculator();
  renderCatalog(false);
}

function setFormStatus(form: HTMLFormElement, message: string, type: 'error' | 'success'): void {
  const status = form.querySelector<HTMLElement>('[data-auth-status]');
  if (!status) return;
  status.textContent = message;
  status.className = `form-status is-${type}`;
}

function apiErrorMessage(error: unknown, fallback: string): string {
  return error instanceof ApiRequestError ? error.message : fallback;
}

function login(phone: string, password: string): Account | null {
  const normalized = phoneKey(phone);
  const account = accounts().find(
    (candidate) => phoneKey(candidate.phone) === normalized && candidate.password === password,
  );
  if (!account) return null;
  localStorage.setItem(STORAGE.session, account.id);
  return account;
}

async function handleLogin(form: HTMLFormElement, adminOnly = false): Promise<void> {
  form.classList.add('was-validated');
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  let account: Account | null = null;
  if (backendEnabled) {
    try {
      const serverAccount = await backendApi.login(
        String(formData.get('phone') ?? ''),
        String(formData.get('password') ?? ''),
      );
      if (adminOnly && serverAccount.role !== 'admin') {
        clearApiSession();
      } else {
        account = cacheAccount(serverAccount);
        await refreshBackendSession();
      }
    } catch (error) {
      setFormStatus(form, apiErrorMessage(error, 'Сервер авторизації недоступний.'), 'error');
      return;
    }
  } else {
    account = login(String(formData.get('phone') ?? ''), String(formData.get('password') ?? ''));
  }
  if (!account || (adminOnly && account.role !== 'admin')) {
    setFormStatus(form, adminOnly ? 'Потрібен акаунт менеджера.' : 'Невірний телефон або пароль.', 'error');
    return;
  }
  renderAccountButton();
  renderCalculator();
  renderCatalog(false);
  if (adminOnly) {
    renderAdmin();
  } else {
    renderAccountPage();
    window.location.hash = 'account';
  }
}

async function handleRegister(form: HTMLFormElement): Promise<void> {
  form.classList.add('was-validated');
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const phone = normalizePhone(String(formData.get('phone') ?? ''));
  if (backendEnabled) {
    try {
      const account = await backendApi.register({
        name: String(formData.get('name') ?? '').trim(),
        phone,
        company: String(formData.get('company') ?? '').trim(),
        password: String(formData.get('password') ?? ''),
      });
      cacheAccount(account);
      writeStorage(STORAGE.orders, []);
      renderAccountButton();
      renderCalculator();
      renderCatalog(false);
      renderAccountPage();
      window.location.hash = 'account';
    } catch (error) {
      setFormStatus(form, apiErrorMessage(error, 'Не вдалося створити акаунт.'), 'error');
    }
    return;
  }
  const existingAccounts = accounts();
  if (existingAccounts.some((account) => phoneKey(account.phone) === phoneKey(phone))) {
    setFormStatus(form, 'Акаунт із таким номером уже існує.', 'error');
    return;
  }
  const account: Account = {
    id: `account-${Date.now().toString(36)}`,
    name: String(formData.get('name') ?? '').trim(),
    phone,
    company: String(formData.get('company') ?? '').trim(),
    password: String(formData.get('password') ?? ''),
    role: 'client',
    partner: false,
    fixedMarkup: DEFAULT_PARTNER_MARKUP,
    productPrices: {},
    createdAt: new Date().toISOString(),
  };
  existingAccounts.push(account);
  writeStorage(STORAGE.accounts, existingAccounts);
  localStorage.setItem(STORAGE.session, account.id);
  renderAccountButton();
  renderCalculator();
  renderCatalog(false);
  renderAccountPage();
  window.location.hash = 'account';
}

async function submitRequest(form: HTMLFormElement): Promise<void> {
  const status = document.querySelector<HTMLDivElement>('#request-status');
  const storedCart = cartItems();
  if (!storedCart.length) {
    if (status) {
      status.className = 'form-status is-error';
      status.textContent = 'Додайте хоча б одну коробку до кошика.';
    }
    return;
  }
  form.classList.add('was-validated');
  if (!form.reportValidity()) {
    if (status) {
      status.className = 'form-status is-error';
      status.textContent = 'Перевірте обов’язкові поля та згоду.';
    }
    return;
  }

  const formData = new FormData(form);
  const account = currentAccount();
  const requestPhone = normalizePhone(String(formData.get('phone') ?? ''));
  const linkedAccount = account ?? accounts().find((candidate) => normalizePhone(candidate.phone) === requestPhone);
  const orderItems: OrderItem[] = storedCart.flatMap((cartItem) => {
    const product = visibleProducts().find((candidate) => candidate.id === cartItem.productId);
    if (!product) return [];
    const calculatedUnit = unitPrice(product, cartItem.quantity, account);
    return [
      {
        productId: product.id,
        productNumber: product.number,
        dimensions: product.dimensions,
        quantity: cartItem.quantity,
        unitPrice: calculatedUnit,
        total: calculatedUnit * cartItem.quantity,
        priceType: priceTypeLabel(cartItem.quantity, account, product),
      },
    ];
  });
  const orderTotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  if (backendEnabled) {
    const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent ?? '';
      submitButton.textContent = 'Зберігаємо заявку…';
    }
    try {
      const serverOrder = await backendApi.createOrder({
        customerName: String(formData.get('name') ?? '').trim(),
        phone: requestPhone,
        company: String(formData.get('company') ?? '').trim(),
        comment: String(formData.get('comment') ?? '').trim(),
        items: storedCart.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      });
      writeStorage(STORAGE.orders, [...orders().filter((item) => item.id !== serverOrder.id), serverOrder] satisfies Order[]);
      writeStorage(STORAGE.cart, []);
      renderCart();
      renderAccountPage();
      if (status) {
        status.className = 'form-status is-success';
        status.innerHTML = `<strong>Заявку ${escapeHtml(serverOrder.id)} створено.</strong><span>${positionLabel(serverOrder.items.length)} на суму ${formatMoney(serverOrder.total)}. Менеджер побачить її в адмінці.</span>`;
      }
    } catch (error) {
      if (status) {
        status.className = 'form-status is-error';
        status.textContent = apiErrorMessage(error, 'Не вдалося передати заявку на сервер.');
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.originalText || 'Надіслати заявку';
        submitButton.focus();
      }
    }
    return;
  }
  const createdAt = new Date().toISOString();
  const order: Order = {
    id: `TP-${Date.now().toString(36).toUpperCase()}`,
    createdAt,
    customerName: String(formData.get('name') ?? '').trim(),
    phone: requestPhone,
    company: String(formData.get('company') ?? '').trim(),
    comment: String(formData.get('comment') ?? '').trim(),
    items: orderItems,
    total: orderTotal,
    accountId: linkedAccount?.id,
    status: 'Нова',
    statusHistory: [{ status: 'Нова', at: createdAt }],
  };
  const storedOrders = orders();
  storedOrders.push(order);
  writeStorage(STORAGE.orders, storedOrders);
  writeStorage(STORAGE.cart, []);
  renderCart();
  renderAccountPage();

  if (status) {
    status.className = 'form-status is-success';
    status.innerHTML = `<strong>Заявку ${escapeHtml(order.id)} створено.</strong><span>${positionLabel(order.items.length)} на суму ${formatMoney(order.total)}. Номер можна повідомити менеджеру.</span>`;
  }
  form.querySelector<HTMLButtonElement>('button[type="submit"]')?.focus();
}

const ORDER_STATUSES: OrderStatus[] = ['Нова', 'У роботі', 'Уточнення', 'Підтверджена', 'Закрита'];

function orderStatusClass(status: OrderStatus): string {
  if (status === 'Нова') return 'is-new';
  if (status === 'У роботі') return 'is-progress';
  if (status === 'Уточнення') return 'is-clarifying';
  if (status === 'Підтверджена') return 'is-confirmed';
  return 'is-closed';
}

function orderStatusControl(order: Order): string {
  return `
    <div class="order-status-control ${orderStatusClass(order.status)}" data-order-status-control>
      <button class="order-status-control__trigger" type="button" data-order-status-trigger aria-haspopup="listbox" aria-expanded="false">
        <span class="order-status-control__dot" aria-hidden="true"></span>
        <span>${escapeHtml(order.status)}</span>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <div class="order-status-control__menu" role="listbox" aria-label="Статус заявки ${escapeHtml(order.id)}" hidden>
        ${ORDER_STATUSES.map(
          (status) => `
            <button class="${orderStatusClass(status)}" type="button" role="option" aria-selected="${status === order.status}" data-order-status-option="${escapeHtml(status)}" data-order-id="${escapeHtml(order.id)}">
              <span class="order-status-control__dot" aria-hidden="true"></span>
              <span>${escapeHtml(status)}</span>
              ${status === order.status ? '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>' : ''}
            </button>
          `,
        ).join('')}
      </div>
    </div>
  `;
}

function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function dateFromKey(value: string): Date {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, Math.max(0, (month || 1) - 1), day || 1, 12);
}

function formatAdminDate(value: string): string {
  return dateFromKey(value).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function adminCalendarMarkup(open = false): string {
  const today = new Date();
  const todayKey = dateKey(today);
  const cursorSource = adminCalendarCursor || adminOrderDate || todayKey;
  const cursorValue = dateFromKey(cursorSource);
  const cursor = new Date(cursorValue.getFullYear(), cursorValue.getMonth(), 1, 12);
  adminCalendarCursor = dateKey(cursor);
  const offsetFromMonday = (cursor.getDay() + 6) % 7;
  const gridStart = new Date(cursor);
  gridStart.setDate(cursor.getDate() - offsetFromMonday);
  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    const value = dateKey(date);
    const outside = date.getMonth() !== cursor.getMonth();
    const rangeStart = value === adminOrderDate;
    const rangeEnd = value === adminOrderDateEnd;
    const selected = rangeStart || rangeEnd;
    const inRange = Boolean(adminOrderDate && adminOrderDateEnd && value > adminOrderDate && value < adminOrderDateEnd);
    const isToday = value === todayKey;
    const classes = [
      outside ? 'is-outside' : '',
      inRange ? 'is-in-range' : '',
      rangeStart ? 'is-range-start' : '',
      rangeEnd ? 'is-range-end' : '',
      selected ? 'is-selected' : '',
      isToday ? 'is-today' : '',
    ]
      .filter(Boolean)
      .join(' ');
    return `<button class="${classes}" type="button" data-calendar-date="${value}" aria-label="${date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}" aria-pressed="${selected}">${date.getDate()}</button>`;
  }).join('');
  const selectedLabel = adminOrderDate
    ? adminOrderDateEnd && adminOrderDateEnd !== adminOrderDate
      ? `${formatAdminDate(adminOrderDate)} — ${formatAdminDate(adminOrderDateEnd)}`
      : formatAdminDate(adminOrderDate)
    : 'Усі дати';
  const rangeDays = adminOrderDate && adminOrderDateEnd
    ? Math.round((dateFromKey(adminOrderDateEnd).getTime() - dateFromKey(adminOrderDate).getTime()) / 86_400_000) + 1
    : 0;
  const rangeTitle = !adminOrderDate
    ? 'Оберіть початок'
    : !adminOrderDateEnd
      ? 'Тепер оберіть кінець'
      : rangeDays === 1
        ? 'Обрано один день'
        : `Обрано ${rangeDays} дн.`;
  const rangeCaption = !adminOrderDate
    ? 'Перший клік — початкова дата'
    : !adminOrderDateEnd
      ? `Початок: ${formatAdminDate(adminOrderDate)}`
      : `${formatAdminDate(adminOrderDate)} — ${formatAdminDate(adminOrderDateEnd)}`;
  const monthLabel = cursor.toLocaleDateString('uk-UA', { month: 'long', year: 'numeric' });
  return `
    <div class="admin-calendar${open ? ' is-open' : ''}" data-admin-calendar>
      <button class="admin-calendar__trigger" type="button" data-calendar-trigger aria-haspopup="dialog" aria-expanded="${open}">
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 2v3m10-3v3M3 8h14M4 4h12a1 1 0 0 1 1 1v12H3V5a1 1 0 0 1 1-1Z" /></svg>
        <span><small>Період заявок</small><strong>${escapeHtml(selectedLabel)}</strong></span>
        <svg class="admin-calendar__chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <div class="admin-calendar__popover" role="dialog" aria-label="Оберіть період заявок"${open ? '' : ' hidden'}>
        <div class="admin-calendar__head">
          <strong>${escapeHtml(monthLabel)}</strong>
          <div>
            <button type="button" data-calendar-month="-1" aria-label="Попередній місяць"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m10 3-5 5 5 5" /></svg></button>
            <button type="button" data-calendar-month="1" aria-label="Наступний місяць"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg></button>
          </div>
        </div>
        <div class="admin-calendar__range-state${adminOrderDate && !adminOrderDateEnd ? ' is-pending' : ''}" aria-live="polite">
          <span aria-hidden="true">${adminOrderDate && adminOrderDateEnd ? '✓' : adminOrderDate ? '2' : '1'}</span>
          <div><strong>${escapeHtml(rangeTitle)}</strong><small>${escapeHtml(rangeCaption)}</small></div>
        </div>
        <div class="admin-calendar__weekdays" aria-hidden="true">${['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map((day) => `<span>${day}</span>`).join('')}</div>
        <div class="admin-calendar__days">${days}</div>
        <div class="admin-calendar__footer">
          <button type="button" data-calendar-clear${adminOrderDate ? '' : ' disabled'}>Очистити</button>
          <small>Дати включно</small>
        </div>
      </div>
    </div>
  `;
}

function adminViewFromHash(): AdminView {
  if (window.location.hash === '#admin-orders') return 'orders';
  if (window.location.hash === '#admin-clients') return 'clients';
  if (window.location.hash === '#admin-products') return 'products';
  return 'overview';
}

function adminNavigation(view: AdminView, orderCount: number, clientCount: number, productCount: number): string {
  const links: Array<{ view: AdminView; href: string; label: string; count?: number }> = [
    { view: 'overview', href: '#admin', label: 'Огляд' },
    { view: 'orders', href: '#admin-orders', label: 'Замовлення', count: orderCount },
    { view: 'clients', href: '#admin-clients', label: 'Клієнти', count: clientCount },
    { view: 'products', href: '#admin-products', label: 'Товари', count: productCount },
  ];
  return links
    .map(
      (link, index) => `
        <a class="admin-nav__link${view === link.view ? ' is-active' : ''}" href="${link.href}"${view === link.view ? ' aria-current="page"' : ''}>
          <span>${String(index + 1).padStart(2, '0')}</span>
          <strong>${link.label}</strong>
          ${link.count === undefined ? '' : `<b>${link.count}</b>`}
        </a>
      `,
    )
    .join('');
}

function adminFrame(account: Account, view: AdminView, content: string): string {
  const storedOrders = orders();
  const clients = accounts().filter((item) => item.role === 'client');
  const productCount = catalogItems().length;
  const notice = adminNotice
    ? `<div class="admin-notice" role="status"><span>Готово</span><p>${escapeHtml(adminNotice)}</p></div>`
    : '';
  adminNotice = '';
  return `
    <div class="admin-workspace">
      <aside class="admin-sidebar-nav">
        <div class="admin-sidebar-nav__head">
          <span class="technical-label">ToffiPacks / Control</span>
          <h2>Управління</h2>
          <p>Замовлення, клієнти й каталог в одному кабінеті.</p>
        </div>
        <nav class="admin-nav" aria-label="Розділи адмінки">
          ${adminNavigation(view, storedOrders.length, clients.length, productCount)}
        </nav>
        <div class="admin-sidebar-nav__footer">
          <span>Ви увійшли як</span>
          <strong>${escapeHtml(account.name)}</strong>
          <small>${escapeHtml(account.phone)}</small>
          <button class="text-link" id="admin-logout" type="button">Вийти</button>
        </div>
      </aside>
      <main class="admin-main">
        ${notice}
        ${content}
      </main>
    </div>
  `;
}

function adminOrderCard(order: Order): string {
  const searchable = `${order.id} ${order.customerName} ${order.phone} ${order.company}`.toLocaleLowerCase('uk-UA');
  return `
    <article class="order-card" data-admin-order data-status="${escapeHtml(order.status)}" data-date="${order.createdAt.slice(0, 10)}" data-search="${escapeHtml(searchable)}">
      <div class="order-card__top">
        <div><span>${escapeHtml(order.id)}</span><strong>${escapeHtml(order.customerName)}</strong></div>
        ${orderStatusControl(order)}
      </div>
      <div class="order-card__grid">
        <div><span>Контакт</span><a href="tel:${escapeHtml(order.phone)}">${escapeHtml(order.phone)}</a><small>Телефон клієнта</small></div>
        <div><span>Позицій</span><strong>${order.items.length}</strong><small>${order.items.reduce((sum, item) => sum + item.quantity, 0).toLocaleString('uk-UA')} шт. загалом</small></div>
        <div><span>Сума</span><strong>${formatMoney(order.total)}</strong><small>кінцева вартість</small></div>
      </div>
      <div class="order-card__items">
        ${order.items
          .map(
            (item) => `
              <div>
                <span>№${escapeHtml(item.productNumber)}</span>
                <strong>${dimensionText(item.dimensions)}</strong>
                <small>${item.quantity.toLocaleString('uk-UA')} шт. · ${formatMoney(item.unitPrice)} / шт.</small>
                <b>${formatMoney(item.total)}</b>
              </div>
            `,
          )
          .join('')}
      </div>
      ${order.company || order.comment ? `<p class="order-card__comment">${escapeHtml(order.company)}${order.company && order.comment ? ' · ' : ''}${escapeHtml(order.comment)}</p>` : ''}
      <div class="order-status-history" aria-label="Історія статусів">
        <span>Історія</span>
        <div>
          ${(order.statusHistory ?? [{ status: order.status, at: order.createdAt }])
            .slice()
            .reverse()
            .slice(0, 5)
            .map(
              (entry) => `<p><strong>${escapeHtml(entry.status)}</strong><time datetime="${escapeHtml(entry.at)}">${new Date(entry.at).toLocaleString('uk-UA')}</time></p>`,
            )
            .join('')}
        </div>
      </div>
      <label class="order-card__manager-note">
        <span>Нотатка менеджера</span>
        <textarea data-order-note="${escapeHtml(order.id)}" rows="2" placeholder="Домовленості після дзвінка, дата або деталі">${escapeHtml(order.managerNote ?? '')}</textarea>
      </label>
      <div class="order-card__footer">
        <time datetime="${order.createdAt}">${new Date(order.createdAt).toLocaleString('uk-UA')}</time>
        <button type="button" data-delete-order="${escapeHtml(order.id)}">
          <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 5h12M7 2h4l1 3H6l1-3Zm-2 3 1 11h6l1-11M8 8v5m3-5v5" /></svg>
          Видалити заявку
        </button>
      </div>
    </article>
  `;
}

function adminOverviewPage(storedOrders: Order[], clients: Account[]): string {
  const openOrders = storedOrders.filter((order) => order.status !== 'Закрита').length;
  const total = storedOrders.reduce((sum, order) => sum + order.total, 0);
  const activeProducts = visibleProducts().length;
  const latest = storedOrders.slice(0, 3);
  return `
    <div class="admin-page-heading admin-page-heading--overview">
      <div><p class="eyebrow"><span></span> Панель керування</p><h1 id="admin-title">Все важливе<br />на одному екрані.</h1></div>
      <p>Швидкий стан каталогу, заявок і клієнтів. Детальна робота винесена в окремі розділи.</p>
    </div>
    <div class="admin-stats admin-stats--large">
      <article><span>Усі заявки</span><strong>${storedOrders.length}</strong><small>${openOrders} потребують уваги</small></article>
      <article><span>Оборот заявок</span><strong>${formatMoney(total)}</strong><small>сума збережених розрахунків</small></article>
      <article><span>Клієнти</span><strong>${clients.length}</strong><small>${clients.filter((client) => client.partner).length} постійних</small></article>
      <article><span>Товари на сайті</span><strong>${activeProducts}</strong><small>${catalogItems().length - activeProducts} приховано</small></article>
    </div>
    <section class="admin-quick-grid" aria-label="Швидкі дії">
      <a href="#admin-orders"><span>01</span><h2>Замовлення</h2><p>Змінюйте статус, телефонуйте клієнту й дивіться склад заявки.</p><b>Відкрити →</b></a>
      <a href="#admin-products"><span>02</span><h2>Каталог</h2><p>Додавайте коробки, редагуйте розміри, ціни та видимість.</p><b>Керувати →</b></a>
      <a href="#admin-clients"><span>03</span><h2>Клієнти</h2><p>Активуйте постійного клієнта та його персональні умови.</p><b>Переглянути →</b></a>
    </section>
    <section class="admin-backup-panel">
      <div><span class="technical-label">Локальна копія</span><h2>Резерв даних кабінету</h2><p>Збережіть товари, заявки, клієнтів і локальні налаштування одним JSON-файлом.</p></div>
      <div class="admin-backup-panel__actions">
        <button class="button button--ghost button--small" type="button" data-export-backup>Завантажити копію</button>
        <label class="button button--ghost button--small admin-file-button">Відновити з копії<input type="file" accept=".json,application/json" data-import-backup /></label>
      </div>
    </section>
    <section class="admin-section">
      <div class="admin-section__head"><h2>Останні заявки</h2><a class="text-link" href="#admin-orders">Усі замовлення →</a></div>
      <div class="orders-list">
        ${latest.length ? latest.map(adminOrderCard).join('') : '<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
      </div>
    </section>
  `;
}

function adminOrdersPage(storedOrders: Order[]): string {
  const statuses: Array<OrderStatus | 'Усі'> = ['Усі', 'Нова', 'У роботі', 'Уточнення', 'Підтверджена', 'Закрита'];
  return `
    <div class="admin-page-heading">
      <div><p class="eyebrow"><span></span> Замовлення</p><h1 id="admin-title">Заявки без хаосу.</h1></div>
      <p>Пошук за клієнтом або номером, швидка зміна статусу та повний склад кожного замовлення.</p>
    </div>
    <div class="admin-toolbar">
      <label class="admin-search"><span class="sr-only">Пошук заявок</span><input id="admin-order-search" type="search" value="${escapeHtml(adminOrderSearch)}" placeholder="Номер, ім’я або телефон" /></label>
      ${adminCalendarMarkup()}
      <div class="admin-filter-chips" aria-label="Фільтр за статусом">
        ${statuses.map((status) => `<button class="${adminOrderStatus === status ? 'is-active' : ''}" type="button" data-admin-order-filter="${status}">${status}</button>`).join('')}
      </div>
    </div>
    <div class="admin-results-meta"><strong id="admin-order-count">${storedOrders.length}</strong><span>заявок показано</span></div>
    <div class="orders-list" id="admin-orders-list">
      ${storedOrders.length ? storedOrders.map(adminOrderCard).join('') : '<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
    </div>
  `;
}

function clientProductPricesMarkup(client: Account): string {
  return `
    <div class="client-prices-panel__head">
      <div>
        <span class="technical-label">Персональний прайс</span>
        <h3>Окрема ціна для кожної коробки</h3>
      </div>
      <p>Вкажіть кінцеву ціну за одну штуку. Це не відсоток і не загальна знижка.</p>
    </div>
    <div class="client-product-prices">
      ${catalogItems()
        .map((product, index) => {
          const personalPrice = Number(client.productPrices?.[product.id]);
          const hasPrice = Number.isFinite(personalPrice) && personalPrice > 0;
          return `
            <label class="client-product-price${product.active ? '' : ' is-hidden'}">
              <span class="client-product-price__index">${String(index + 1).padStart(2, '0')}</span>
              <span class="client-product-price__product">
                <strong>№${escapeHtml(product.number)} · ${dimensionText(product.dimensions)}</strong>
                <small>${product.active ? 'Доступна на сайті' : 'Прихована в каталозі'}</small>
              </span>
              <span class="client-product-price__public">
                <small>Звичайна / оптова</small>
                <strong>${formatMoney(publicUnitPrice(product, 1))} / ${formatMoney(publicUnitPrice(product, WHOLESALE_FROM))}</strong>
              </span>
              <span class="client-product-price__field">
                <small>Ціна клієнта</small>
                <span>
                  <input
                    class="input"
                    type="number"
                    inputmode="decimal"
                    min="0.01"
                    max="10000"
                    step="0.01"
                    value="${hasPrice ? personalPrice : ''}"
                    placeholder="Не задано"
                    data-client-product-price="${escapeHtml(product.id)}"
                    data-client-id="${escapeHtml(client.id)}"
                    ${client.partner ? '' : 'disabled'}
                  />
                  <em>грн / шт.</em>
                </span>
              </span>
            </label>
          `;
        })
        .join('')}
    </div>
  `;
}

function adminClientsPage(clients: Account[]): string {
  if (!expandedClientPriceIds.size) {
    const initialClient = clients.find((client) => client.partner) ?? clients[0];
    if (initialClient) expandedClientPriceIds.add(initialClient.id);
  }
  return `
    <div class="admin-page-heading">
      <div><p class="eyebrow"><span></span> Клієнти</p><h1 id="admin-title">Контакти й особливі умови.</h1></div>
      <p>Знайдіть клієнта за телефоном, активуйте статус постійного та задайте окрему кінцеву ціну для кожної коробки.</p>
    </div>
    <div class="admin-toolbar admin-toolbar--clients">
      <label class="admin-search"><span class="sr-only">Пошук клієнтів</span><input id="admin-client-search" type="search" placeholder="Ім’я, компанія або телефон" /></label>
    </div>
    <div class="clients-table clients-table--expanded">
      <div class="clients-table__head"><span>Клієнт</span><span>Статус</span><span>Персональні ціни</span></div>
      ${clients.length
        ? clients
            .map((client) => {
              const expanded = expandedClientPriceIds.has(client.id);
              const priceCount = catalogItems().filter((product) => Number(client.productPrices?.[product.id]) > 0).length;
              return `
                <article class="client-card" data-admin-client data-search="${escapeHtml(`${client.name} ${client.company} ${client.phone}`.toLocaleLowerCase('uk-UA'))}">
                  <div class="client-row">
                    <div class="client-row__identity"><strong>${escapeHtml(client.name)}</strong><span>${escapeHtml(client.company || 'Без компанії')}</span><a href="tel:${escapeHtml(client.phone)}">${escapeHtml(client.phone)}</a></div>
                    <label class="partner-toggle"><input type="checkbox" data-partner-toggle="${client.id}"${client.partner ? ' checked' : ''} /><span>${client.partner ? 'Постійний' : 'Звичайний'}</span></label>
                    <button class="client-prices-toggle${expanded ? ' is-open' : ''}" type="button" data-client-prices-toggle="${escapeHtml(client.id)}" aria-expanded="${expanded}" aria-controls="client-prices-${escapeHtml(client.id)}">
                      <span><strong>${priceCount} із ${catalogItems().length}</strong><small>цін налаштовано</small></span>
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 9 5 5 5-5" /></svg>
                    </button>
                  </div>
                  <section class="client-prices-panel${expanded ? ' is-open' : ''}" id="client-prices-${escapeHtml(client.id)}"${expanded ? '' : ' hidden'}>
                    ${clientProductPricesMarkup(client)}
                  </section>
                </article>
              `;
            })
            .join('')
        : '<div class="admin-empty"><h3>Клієнтів ще немає.</h3></div>'}
    </div>
  `;
}

function filteredAdminProducts(): ManagedProduct[] {
  const search = adminProductSearch.trim().toLocaleLowerCase('uk-UA');
  return catalogItems().filter((product) => {
    const matchesSearch = !search || `${product.number} ${product.name} ${dimensionText(product.dimensions)}`.toLocaleLowerCase('uk-UA').includes(search);
    const matchesVisibility = adminProductVisibility === 'all' || (adminProductVisibility === 'active' ? product.active : !product.active);
    return matchesSearch && matchesVisibility;
  });
}

function adminProductList(): string {
  const products = filteredAdminProducts();
  if (!products.length) return '<div class="admin-empty"><h3>Нічого не знайдено.</h3><p>Змініть пошук або фільтр видимості.</p></div>';
  return products
    .map(
      (product) => `
        <article class="admin-product-card${product.active ? '' : ' is-hidden'}" data-admin-product="${product.id}">
          <div class="admin-product-card__visual">${boxDiagram(product, false)}</div>
          <div class="admin-product-card__content">
            <div class="admin-product-card__top"><span>№${escapeHtml(product.number)}</span><b>${product.active ? 'На сайті' : 'Приховано'}</b></div>
            <h3>${dimensionText(product.dimensions)}</h3>
            <p>${escapeHtml(product.name)}</p>
            <dl>
              <div><dt>1–999 шт.</dt><dd>${formatMoney(publicUnitPrice(product, 1))}</dd></div>
              <div><dt>від 1000 шт.</dt><dd>${formatMoney(publicUnitPrice(product, WHOLESALE_FROM))}</dd></div>
            </dl>
            <div class="admin-product-card__actions">
              <button class="button button--primary button--small" type="button" data-edit-product="${product.id}">Редагувати</button>
              <button class="button button--ghost button--small" type="button" data-toggle-product="${product.id}">${product.active ? 'Приховати' : 'Показати'}</button>
              <button class="admin-danger-link" type="button" data-delete-product="${product.id}">Видалити</button>
            </div>
          </div>
        </article>
      `,
    )
    .join('');
}

function adminProductsPage(): string {
  return `
    <div class="admin-page-heading admin-page-heading--products">
      <div><p class="eyebrow"><span></span> Товари</p><h1 id="admin-title">Каталог під контролем.</h1></div>
      <div class="admin-page-heading__action"><p>Окрема сторінка для розмірів, цін і видимості коробок.</p><button class="button button--primary" type="button" data-create-product>Додати коробку</button></div>
    </div>
    <div class="admin-toolbar admin-toolbar--products">
      <label class="admin-search"><span class="sr-only">Пошук товарів</span><input id="admin-product-search" type="search" value="${escapeHtml(adminProductSearch)}" placeholder="Номер або розмір" /></label>
      <div class="admin-filter-chips" aria-label="Фільтр товарів">
        <button class="${adminProductVisibility === 'all' ? 'is-active' : ''}" type="button" data-product-filter="all">Усі</button>
        <button class="${adminProductVisibility === 'active' ? 'is-active' : ''}" type="button" data-product-filter="active">На сайті</button>
        <button class="${adminProductVisibility === 'hidden' ? 'is-active' : ''}" type="button" data-product-filter="hidden">Приховані</button>
      </div>
      <button class="button button--ghost button--small" type="button" data-export-products>Експорт CSV</button>
      <label class="button button--ghost button--small admin-file-button">Імпорт CSV<input type="file" accept=".csv,text/csv" data-import-products /></label>
      <button class="admin-danger-link" type="button" data-reset-products>Відновити початкові</button>
    </div>
    <div class="admin-results-meta"><strong id="admin-product-count">${filteredAdminProducts().length}</strong><span>товарів показано</span></div>
    <div class="admin-products-grid" id="admin-product-list">${adminProductList()}</div>
  `;
}

function renderAdmin(): void {
  const content = document.querySelector<HTMLDivElement>('#admin-content');
  if (!content) return;
  const account = currentAccount();
  if (!account || account.role !== 'admin') {
    content.innerHTML = `
      <div class="admin-login">
        <p class="eyebrow"><span></span> Для менеджера</p>
        <h1 id="admin-title">Вхід до керування.</h1>
        <p>Замовлення, клієнти та каталог доступні тільки менеджеру.</p>
        <form id="admin-login-form" class="auth-form" novalidate>
          <label class="field"><span>Телефон</span><input class="input" name="phone" type="tel" autocomplete="tel" required /></label>
          <label class="field"><span>Пароль</span><input class="input" name="password" type="password" autocomplete="current-password" required /></label>
          <div class="form-status" data-auth-status aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">Увійти</button>
        </form>
      </div>
    `;
    return;
  }

  const storedOrders = orders().slice().reverse();
  const clients = accounts().filter((item) => item.role === 'client');
  const view = adminViewFromHash();
  let pageContent = adminOverviewPage(storedOrders, clients);
  if (view === 'orders') pageContent = adminOrdersPage(storedOrders);
  if (view === 'clients') pageContent = adminClientsPage(clients);
  if (view === 'products') pageContent = adminProductsPage();
  content.innerHTML = adminFrame(account, view, pageContent);
  if (view === 'orders') filterAdminOrders();
}

function filterAdminOrders(): void {
  const search = adminOrderSearch.trim().toLocaleLowerCase('uk-UA');
  let visible = 0;
  document.querySelectorAll<HTMLElement>('[data-admin-order]').forEach((card) => {
    const matchesSearch = !search || (card.dataset.search ?? '').includes(search);
    const matchesStatus = adminOrderStatus === 'Усі' || card.dataset.status === adminOrderStatus;
    const orderDate = card.dataset.date ?? '';
    const matchesDate = !adminOrderDate
      || (!adminOrderDateEnd && orderDate === adminOrderDate)
      || Boolean(adminOrderDateEnd && orderDate >= adminOrderDate && orderDate <= adminOrderDateEnd);
    card.hidden = !(matchesSearch && matchesStatus && matchesDate);
    if (!card.hidden) visible += 1;
  });
  const count = document.querySelector<HTMLElement>('#admin-order-count');
  if (count) count.textContent = String(visible);
}

function closeOrderStatusMenus(except?: HTMLElement): void {
  document.querySelectorAll<HTMLElement>('[data-order-status-control]').forEach((control) => {
    if (control === except) return;
    control.classList.remove('is-open');
    control.querySelector<HTMLElement>('.order-status-control__menu')?.setAttribute('hidden', '');
    control.querySelector<HTMLButtonElement>('[data-order-status-trigger]')?.setAttribute('aria-expanded', 'false');
  });
}

function closeAdminCalendar(): void {
  const control = document.querySelector<HTMLElement>('[data-admin-calendar]');
  if (!control) return;
  control.classList.remove('is-open');
  control.querySelector<HTMLElement>('.admin-calendar__popover')?.setAttribute('hidden', '');
  control.querySelector<HTMLButtonElement>('[data-calendar-trigger]')?.setAttribute('aria-expanded', 'false');
}

function replaceAdminCalendar(open: boolean, focusSelector?: string): void {
  const control = document.querySelector<HTMLElement>('[data-admin-calendar]');
  if (!control) return;
  control.outerHTML = adminCalendarMarkup(open);
  if (focusSelector) {
    window.requestAnimationFrame(() =>
      document.querySelector<HTMLElement>(`[data-admin-calendar] ${focusSelector}`)?.focus(),
    );
  }
}

async function updateOrderStatus(orderId: string, nextStatus: OrderStatus): Promise<void> {
  const storedOrders = orders();
  const order = storedOrders.find((item) => item.id === orderId);
  if (!order || order.status === nextStatus) return;
  if (backendEnabled) {
    try {
      const updated = await backendApi.updateOrder(orderId, { status: nextStatus });
      writeStorage(STORAGE.orders, storedOrders.map((item) => (item.id === orderId ? updated : item)) satisfies Order[]);
    } catch (error) {
      adminNotice = apiErrorMessage(error, 'Не вдалося змінити статус заявки.');
    }
    renderAdmin();
    return;
  }
  const previousStatus = order.status;
  order.status = nextStatus;
  order.statusHistory = [
    ...(order.statusHistory ?? [{ status: previousStatus, at: order.createdAt }]),
    { status: nextStatus, at: new Date().toISOString() },
  ];
  writeStorage(STORAGE.orders, storedOrders);
  renderAdmin();
}

function filterAdminClients(value: string): void {
  const search = value.trim().toLocaleLowerCase('uk-UA');
  document.querySelectorAll<HTMLElement>('[data-admin-client]').forEach((row) => {
    row.hidden = Boolean(search) && !(row.dataset.search ?? '').includes(search);
  });
}

function renderAdminProductList(): void {
  const list = document.querySelector<HTMLElement>('#admin-product-list');
  if (list) list.innerHTML = adminProductList();
  const count = document.querySelector<HTMLElement>('#admin-product-count');
  if (count) count.textContent = String(filteredAdminProducts().length);
}

function refreshProductSurfaces(): void {
  const available = visibleProducts();
  if (!available.length) return;
  if (!available.some((product) => product.id === selectedProductId)) selectedProductId = available[0].id;
  syncProductPickers(true);
  const heroCount = document.querySelector<HTMLElement>('#hero-product-count');
  if (heroCount) heroCount.textContent = String(available.length);
  const catalogLabel = document.querySelector<HTMLElement>('#catalog-ready-label');
  if (catalogLabel) catalogLabel.innerHTML = `<span></span> ${available.length} готових розмірів`;
  renderCatalog(false);
  renderCalculator();
  renderCart();
}

function productEditorMarkup(product?: ManagedProduct): string {
  const isEditing = Boolean(product);
  const model: ManagedProduct = product ?? {
    id: '',
    number: '',
    name: '',
    dimensions: { length: 180, width: 120, height: 50 },
    basePrice: 5,
    active: true,
    updatedAt: now,
  };
  return `
    <div class="admin-product-editor">
      <p class="eyebrow"><span></span> ${isEditing ? 'Редагування товару' : 'Новий товар'}</p>
      <h2 id="admin-product-dialog-title">${isEditing ? `Коробка №${escapeHtml(model.number)}` : 'Додати коробку'}</h2>
      <p>Після збереження товар одразу оновиться в каталозі та калькуляторі.</p>
      <form id="admin-product-form" novalidate>
        <input type="hidden" name="productId" value="${escapeHtml(model.id)}" />
        <div class="admin-editor-grid admin-editor-grid--identity">
          <label class="field"><span>Номер *</span><input class="input" name="number" value="${escapeHtml(model.number)}" maxlength="20" required /></label>
          <label class="field"><span>Назва</span><input class="input" name="name" value="${escapeHtml(model.name)}" placeholder="Самозбірна коробка" /></label>
        </div>
        <fieldset class="admin-editor-fieldset">
          <legend>Внутрішній розмір, мм</legend>
          <div class="admin-editor-grid admin-editor-grid--dimensions">
            <label class="field"><span>Довжина *</span><input class="input" name="length" type="number" min="1" max="2000" value="${model.dimensions.length}" required /></label>
            <label class="field"><span>Ширина *</span><input class="input" name="width" type="number" min="1" max="2000" value="${model.dimensions.width}" required /></label>
            <label class="field"><span>Висота *</span><input class="input" name="height" type="number" min="1" max="2000" value="${model.dimensions.height}" required /></label>
          </div>
        </fieldset>
        <div class="admin-editor-grid admin-editor-grid--price">
          <label class="field"><span>Базова ціна, грн *</span><input class="input" name="basePrice" type="number" min="0.01" max="10000" step="0.01" value="${model.basePrice}" required /></label>
          <div class="admin-editor-price-preview"><span>На сайті зараз</span><strong>${formatMoney(publicUnitPrice(model, 1))}</strong><small>опт: ${formatMoney(publicUnitPrice(model, WHOLESALE_FROM))}</small></div>
        </div>
        <label class="checkbox admin-editor-active"><input name="active" type="checkbox"${model.active ? ' checked' : ''} /><span>Показувати товар у каталозі</span></label>
        <div class="form-status" data-product-form-status aria-live="polite"></div>
        <div class="admin-editor-actions">
          <button class="button button--ghost" type="button" data-close-admin-product>Скасувати</button>
          <button class="button button--primary" type="submit">${isEditing ? 'Зберегти зміни' : 'Створити товар'}</button>
        </div>
      </form>
    </div>
  `;
}

function openAdminProductEditor(productId?: string): void {
  const dialog = document.querySelector<HTMLDialogElement>('#admin-product-dialog');
  const content = document.querySelector<HTMLElement>('#admin-product-editor');
  if (!dialog || !content) return;
  const product = productId ? catalogItems().find((item) => item.id === productId) : undefined;
  content.innerHTML = productEditorMarkup(product);
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  content.querySelector<HTMLInputElement>('input[name="number"]')?.focus();
}

async function handleAdminProductSave(form: HTMLFormElement): Promise<void> {
  form.classList.add('was-validated');
  const status = form.querySelector<HTMLElement>('[data-product-form-status]');
  if (!form.reportValidity()) {
    if (status) {
      status.className = 'form-status is-error';
      status.textContent = 'Перевірте обов’язкові поля.';
    }
    return;
  }
  const data = new FormData(form);
  const productId = String(data.get('productId') ?? '');
  const number = String(data.get('number') ?? '').trim();
  const stored = catalogItems();
  const existing = stored.find((product) => product.id === productId);
  if (!PRODUCT_NUMBER_PATTERN.test(number)) {
    if (status) {
      status.className = 'form-status is-error';
      status.textContent = 'У номері можна використовувати літери, цифри, крапку, дефіс і підкреслення.';
    }
    return;
  }
  if (stored.some((product) => product.number.toLocaleLowerCase('uk-UA') === number.toLocaleLowerCase('uk-UA') && product.id !== productId)) {
    if (status) {
      status.className = 'form-status is-error';
      status.textContent = 'Товар із таким номером уже існує.';
    }
    return;
  }
  const active = data.get('active') === 'on';
  if (existing?.active && !active && visibleProducts().length <= 1) {
    if (status) {
      status.className = 'form-status is-error';
      status.textContent = 'У каталозі має залишитися хоча б один активний товар.';
    }
    return;
  }
  const id = existing?.id ?? `box-${number.toLocaleLowerCase('uk-UA').replace(/[^a-zа-яіїєґ0-9]+/giu, '-')}-${Date.now().toString(36)}`;
  const updated: ManagedProduct = {
    ...existing,
    id,
    number,
    name: String(data.get('name') ?? '').trim() || `Самозбірна коробка №${number}`,
    dimensions: {
      length: Number(data.get('length')),
      width: Number(data.get('width')),
      height: Number(data.get('height')),
    },
    basePrice: Number(data.get('basePrice')),
    active,
    updatedAt: new Date().toISOString(),
  };
  if (backendEnabled) {
    try {
      const serverProduct = existing
        ? await backendApi.updateProduct(existing.id, updated)
        : await backendApi.createProduct({
            number: updated.number,
            name: updated.name,
            dimensions: updated.dimensions,
            basePrice: updated.basePrice,
            sourceQuantity: updated.sourceQuantity,
            active: updated.active,
          });
      const next = existing
        ? stored.map((product) => (product.id === existing.id ? serverProduct : product))
        : [...stored, serverProduct];
      saveCatalog(next satisfies ManagedProduct[]);
      refreshProductSurfaces();
      document.querySelector<HTMLDialogElement>('#admin-product-dialog')?.close();
      adminNotice = existing ? `Товар №${number} оновлено.` : `Товар №${number} додано до каталогу.`;
      renderAdmin();
    } catch (error) {
      if (status) {
        status.className = 'form-status is-error';
        status.textContent = apiErrorMessage(error, 'Не вдалося зберегти товар на сервері.');
      }
    }
    return;
  }
  const next = existing ? stored.map((product) => (product.id === existing.id ? updated : product)) : [...stored, updated];
  saveCatalog(next);
  refreshProductSurfaces();
  document.querySelector<HTMLDialogElement>('#admin-product-dialog')?.close();
  adminNotice = existing ? `Товар №${number} оновлено.` : `Товар №${number} додано до каталогу.`;
  renderAdmin();
}

function downloadJson(filename: string, value: unknown): void {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function downloadText(filename: string, value: string, type: string): void {
  const blob = new Blob([value], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function csvCell(value: string | number | boolean): string {
  const text = String(value);
  return /[;"\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function productsCsv(): string {
  const header = ['number', 'name', 'length', 'width', 'height', 'basePrice', 'active'];
  const rows = catalogItems().map((product) =>
    [
      product.number,
      product.name,
      product.dimensions.length,
      product.dimensions.width,
      product.dimensions.height,
      product.basePrice,
      product.active,
    ]
      .map(csvCell)
      .join(';'),
  );
  return `\uFEFF${[header.join(';'), ...rows].join('\r\n')}`;
}

interface BackupPayload {
  version: 1;
  createdAt: string;
  accounts: Account[];
  orders: Order[];
  products: ManagedProduct[];
  cart: CartItem[];
  measurements: SavedMeasurement[];
  fit: FitState | null;
}

function backupPayload(): BackupPayload {
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    accounts: accounts(),
    orders: orders(),
    products: catalogItems(),
    cart: cartItems(),
    measurements: savedMeasurements(),
    fit: fitDimensions ? { dimensions: fitDimensions, margin: fitMargin } : null,
  };
}

function isBackupPayload(value: unknown): value is BackupPayload {
  if (!value || typeof value !== 'object') return false;
  const payload = value as Partial<BackupPayload>;
  if (payload.version !== 1) return false;
  if (!Array.isArray(payload.accounts) || !Array.isArray(payload.orders) || !Array.isArray(payload.products)) return false;
  const validAccounts = payload.accounts.every(
    (account) =>
      account &&
      typeof account.id === 'string' &&
      typeof account.phone === 'string' &&
      (account.role === 'admin' || account.role === 'client'),
  );
  const validProducts = payload.products.every(
    (product) =>
      product &&
      typeof product.id === 'string' &&
      typeof product.number === 'string' &&
      Number.isFinite(product.basePrice) &&
      [product.dimensions?.length, product.dimensions?.width, product.dimensions?.height].every(
        (side) => Number.isFinite(side) && Number(side) > 0,
      ),
  );
  const validOrders = payload.orders.every(
    (order) =>
      order &&
      typeof order.id === 'string' &&
      typeof order.phone === 'string' &&
      Array.isArray(order.items) &&
      Number.isFinite(order.total),
  );
  return validAccounts && validProducts && validOrders && payload.accounts.some((account) => account.role === 'admin');
}

async function handleBackupImport(input: HTMLInputElement): Promise<void> {
  const file = input.files?.[0];
  if (!file) return;
  if (backendEnabled) {
    adminNotice = 'Серверну копію можна завантажити, а відновлення виконується тільки на сервері адміністратором інфраструктури.';
    input.value = '';
    renderAdmin();
    return;
  }
  try {
    const parsed: unknown = JSON.parse(await file.text());
    if (!isBackupPayload(parsed)) throw new Error('Файл не є коректною резервною копією ToffiPacks.');
    if (!window.confirm('Відновити локальні дані з цієї копії? Поточні заявки, клієнти й товари буде замінено.')) return;
    writeStorage(STORAGE.accounts, parsed.accounts);
    writeStorage(STORAGE.orders, parsed.orders);
    writeStorage(STORAGE.products, parsed.products);
    writeStorage(STORAGE.cart, Array.isArray(parsed.cart) ? parsed.cart : []);
    writeStorage(STORAGE.measurements, Array.isArray(parsed.measurements) ? parsed.measurements : []);
    if (parsed.fit) writeStorage(STORAGE.fit, parsed.fit);
    else localStorage.removeItem(STORAGE.fit);
    fitDimensions = parsed.fit?.dimensions ?? null;
    fitMargin = parsed.fit?.margin === 5 || parsed.fit?.margin === 10 ? parsed.fit.margin : 0;
    if (!accounts().some((account) => account.id === localStorage.getItem(STORAGE.session))) {
      localStorage.removeItem(STORAGE.session);
    }
    refreshProductSurfaces();
    renderAccountButton();
    renderAccountPage();
    adminNotice = `Резервну копію від ${new Date(parsed.createdAt).toLocaleString('uk-UA')} відновлено.`;
    renderAdmin();
  } catch (error) {
    adminNotice = error instanceof Error ? error.message : 'Не вдалося відновити резервну копію.';
    renderAdmin();
  } finally {
    input.value = '';
  }
}

function parseCsv(value: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (character === '"') {
      if (quoted && value[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === ';' && !quoted) {
      row.push(cell.trim());
      cell = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && value[index + 1] === '\n') index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += character;
    }
  }
  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function importedProducts(csv: string): ManagedProduct[] {
  const rows = parseCsv(csv.replace(/^\uFEFF/, ''));
  const headers = rows.shift()?.map((header) => header.trim()) ?? [];
  const required = ['number', 'name', 'length', 'width', 'height', 'basePrice', 'active'];
  if (!required.every((header) => headers.includes(header))) {
    throw new Error(`Потрібні колонки: ${required.join(', ')}`);
  }
  const position = Object.fromEntries(headers.map((header, index) => [header, index]));
  const stored = catalogItems();
  const byNumber = new Map(stored.map((product) => [product.number.toLocaleLowerCase('uk-UA'), product]));
  const imported = rows.map((cells) => {
    const value = (name: string): string => cells[position[name]]?.trim() ?? '';
    const number = value('number');
    const numeric = (name: string): number => Number(value(name).replace(',', '.'));
    const dimensions = { length: numeric('length'), width: numeric('width'), height: numeric('height') };
    const basePrice = numeric('basePrice');
    if (
      !PRODUCT_NUMBER_PATTERN.test(number) ||
      !Object.values(dimensions).every((side) => Number.isFinite(side) && side > 0) ||
      !Number.isFinite(basePrice) ||
      basePrice <= 0
    ) {
      throw new Error(`Некоректні дані для коробки ${number || 'без номера'}.`);
    }
    const existing = byNumber.get(number.toLocaleLowerCase('uk-UA'));
    const activeValue = value('active').toLocaleLowerCase('uk-UA');
    return {
      ...existing,
      id: existing?.id ?? `box-${number.toLocaleLowerCase('uk-UA').replace(/[^a-zа-яіїєґ0-9]+/giu, '-')}-${Date.now().toString(36)}`,
      number,
      name: value('name') || existing?.name || `Самозбірна коробка №${number}`,
      dimensions,
      basePrice,
      active: !['false', '0', 'ні', 'no'].includes(activeValue),
      updatedAt: new Date().toISOString(),
    } satisfies ManagedProduct;
  });
  const importedNumbers = new Set(imported.map((product) => product.number.toLocaleLowerCase('uk-UA')));
  return [...stored.filter((product) => !importedNumbers.has(product.number.toLocaleLowerCase('uk-UA'))), ...imported];
}

async function handleProductImport(input: HTMLInputElement): Promise<void> {
  const file = input.files?.[0];
  if (!file) return;
  try {
    const next = importedProducts(await file.text());
    if (!window.confirm(`Імпортувати ${next.length} товарів? Позиції з однаковими номерами буде оновлено.`)) return;
    if (backendEnabled) {
      const serverProducts = await backendApi.adminProducts();
      for (const product of next) {
        const existing = serverProducts.find((item) => item.id === product.id || item.number.toLocaleLowerCase('uk-UA') === product.number.toLocaleLowerCase('uk-UA'));
        if (existing) {
          await backendApi.updateProduct(existing.id, product);
        } else {
          await backendApi.createProduct({
            number: product.number,
            name: product.name,
            dimensions: product.dimensions,
            basePrice: product.basePrice,
            sourceQuantity: product.sourceQuantity,
            active: product.active,
          });
        }
      }
      saveCatalog((await backendApi.adminProducts()) satisfies ManagedProduct[]);
      refreshProductSurfaces();
      adminNotice = 'CSV імпортовано на сервер. Каталог оновлено.';
      renderAdmin();
      return;
    }
    saveCatalog(next);
    refreshProductSurfaces();
    adminNotice = 'CSV імпортовано. Каталог оновлено.';
    renderAdmin();
  } catch (error) {
    adminNotice = error instanceof Error ? error.message : 'Не вдалося прочитати CSV.';
    renderAdmin();
  } finally {
    input.value = '';
  }
}

function syncRoute(): void {
  const adminPage = document.querySelector<HTMLElement>('#admin-page');
  const accountPage = document.querySelector<HTMLElement>('#account-page');
  const storefront = document.querySelector<HTMLElement>('#main');
  const header = document.querySelector<HTMLElement>('.site-header');
  const footer = document.querySelector<HTMLElement>('.site-footer');
  const supportWidget = document.querySelector<HTMLElement>('#support-widget');
  const strip = document.querySelector<HTMLElement>('.demo-strip');
  const showAdmin = ['#admin', '#admin-orders', '#admin-clients', '#admin-products'].includes(window.location.hash);
  const showAccount = window.location.hash === '#account';
  if (adminPage) adminPage.hidden = !showAdmin;
  if (accountPage) accountPage.hidden = !showAccount;
  if (storefront) storefront.hidden = showAdmin || showAccount;
  if (header) header.hidden = showAdmin || showAccount;
  if (footer) footer.hidden = showAdmin || showAccount;
  if (supportWidget) supportWidget.hidden = showAdmin;
  if (strip) strip.hidden = showAdmin || showAccount;
  document.body.classList.toggle('is-admin', showAdmin);
  document.body.classList.toggle('is-account', showAccount);
  if (showAdmin) {
    closeSupportPanel(false);
    renderAdmin();
    if (backendEnabled && hasApiSession()) {
      void refreshBackendSession().then(() => renderAdmin()).catch((error) => {
        adminNotice = apiErrorMessage(error, 'Не вдалося оновити дані адмінки.');
        renderAdmin();
      });
    }
    window.scrollTo({ top: 0 });
  } else if (showAccount) {
    renderAccountPage();
    if (backendEnabled && hasApiSession()) {
      void refreshBackendSession().then(() => {
        renderAccountButton();
        renderAccountPage();
      }).catch(() => undefined);
    }
    window.scrollTo({ top: 0 });
  }
}

function initializeRevealAnimations(): void {
  const items = document.querySelectorAll<HTMLElement>('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  items.forEach((item) => observer.observe(item));
}

document.querySelector<HTMLButtonElement>('#menu-button')?.addEventListener('click', (event) => {
  const button = event.currentTarget as HTMLButtonElement;
  const nav = document.querySelector<HTMLElement>('#site-nav');
  const open = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(open));
  nav?.classList.toggle('is-open', open);
});

document.querySelector<HTMLButtonElement>('#support-trigger')?.addEventListener('click', () => {
  const panel = document.querySelector<HTMLElement>('#support-panel');
  if (panel?.hidden) openSupportPanel();
  else closeSupportPanel();
});

document.querySelector<HTMLButtonElement>('[data-support-close]')?.addEventListener('click', () => {
  closeSupportPanel();
});

document.querySelectorAll<HTMLAnchorElement>('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#site-nav')?.classList.remove('is-open');
    document.querySelector<HTMLButtonElement>('#menu-button')?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector<HTMLAnchorElement>('.site-header .brand[href="#top"]')?.addEventListener('click', (event) => {
  event.preventDefault();
  if (window.location.hash !== '#top') {
    window.history.pushState(null, '', '#top');
    syncRoute();
  }
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
});

document.querySelector<HTMLFormElement>('#fit-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  form.classList.add('was-validated');
  const message = document.querySelector<HTMLParagraphElement>('#fit-message');
  if (!form.reportValidity()) {
    if (message) {
      message.textContent = 'Вкажіть три додатні розміри.';
      message.className = 'form-message is-error';
    }
    return;
  }
  const data = new FormData(form);
  fitDimensions = {
    length: Number(data.get('length')),
    width: Number(data.get('width')),
    height: Number(data.get('height')),
  };
  const requestedMargin = Number(data.get('fitMargin'));
  fitMargin = requestedMargin === 5 || requestedMargin === 10 ? requestedMargin : 0;
  rememberMeasurement(fitDimensions, fitMargin);
  catalogExpanded = false;
  if (message) {
    message.textContent = `Розміри застосовано · ${fitMarginLabel(fitMargin)}.`;
    message.className = 'form-message is-success';
  }
  queueCatalogRender();
  window.setTimeout(() => document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' }), 180);
});

document.querySelector<HTMLInputElement>('#catalog-search')?.addEventListener('input', (event) => {
  catalogSearch = (event.currentTarget as HTMLInputElement).value;
  catalogExpanded = false;
  queueCatalogRender();
});

const catalogSortControl = document.querySelector<HTMLElement>('#catalog-sort');
const catalogSortTrigger = catalogSortControl?.querySelector<HTMLButtonElement>('.catalog-sort__trigger');
const catalogSortMenu = catalogSortControl?.querySelector<HTMLElement>('.catalog-sort__menu');
const catalogSortOptions = Array.from(
  catalogSortControl?.querySelectorAll<HTMLButtonElement>('[data-sort-value]') ?? [],
);

function closeCatalogSort(restoreFocus = false): void {
  if (!catalogSortTrigger || !catalogSortMenu) return;
  catalogSortTrigger.setAttribute('aria-expanded', 'false');
  catalogSortMenu.hidden = true;
  catalogSortControl?.classList.remove('is-open');
  if (restoreFocus) catalogSortTrigger.focus();
}

function openCatalogSort(): void {
  if (!catalogSortTrigger || !catalogSortMenu) return;
  catalogSortTrigger.setAttribute('aria-expanded', 'true');
  catalogSortMenu.hidden = false;
  catalogSortControl?.classList.add('is-open');
}

function selectCatalogSort(value: CatalogSort): void {
  const option = catalogSortOptions.find((item) => item.dataset.sortValue === value);
  const valueLabel = document.querySelector<HTMLElement>('#catalog-sort-value');
  if (!option || !catalogSortControl || !valueLabel) return;
  catalogSort = value;
  catalogSortControl.dataset.value = value;
  valueLabel.textContent = option.querySelector('span')?.textContent ?? option.textContent;
  catalogSortOptions.forEach((item) => {
    item.setAttribute('aria-selected', String(item === option));
  });
  closeCatalogSort(true);
  queueCatalogRender();
}

catalogSortTrigger?.addEventListener('click', () => {
  if (catalogSortMenu?.hidden) {
    openCatalogSort();
  } else {
    closeCatalogSort();
  }
});

catalogSortOptions.forEach((option) => {
  option.addEventListener('click', () => {
    selectCatalogSort(option.dataset.sortValue as CatalogSort);
  });
});

catalogSortControl?.addEventListener('keydown', (event) => {
  const activeIndex = catalogSortOptions.indexOf(document.activeElement as HTMLButtonElement);
  const selectedIndex = catalogSortOptions.findIndex((option) => option.getAttribute('aria-selected') === 'true');
  if (event.key === 'Escape') {
    event.preventDefault();
    closeCatalogSort(true);
    return;
  }
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Home' && event.key !== 'End') return;
  event.preventDefault();
  if (catalogSortMenu?.hidden) openCatalogSort();
  let nextIndex = activeIndex >= 0 ? activeIndex : selectedIndex;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = catalogSortOptions.length - 1;
  if (event.key === 'ArrowDown') nextIndex = (nextIndex + 1) % catalogSortOptions.length;
  if (event.key === 'ArrowUp') nextIndex = (nextIndex - 1 + catalogSortOptions.length) % catalogSortOptions.length;
  catalogSortOptions[nextIndex]?.focus();
});

document.addEventListener('click', (event) => {
  if (!catalogSortControl?.contains(event.target as Node)) closeCatalogSort();
});

document.querySelector<HTMLButtonElement>('#reset-catalog')?.addEventListener('click', () => {
  fitDimensions = null;
  fitMargin = 0;
  catalogSearch = '';
  catalogExpanded = false;
  const search = document.querySelector<HTMLInputElement>('#catalog-search');
  if (search) search.value = '';
  const message = document.querySelector<HTMLParagraphElement>('#fit-message');
  if (message) message.textContent = '';
  localStorage.removeItem(STORAGE.fit);
  queueCatalogRender();
});

document.querySelector<HTMLButtonElement>('#catalog-more-button')?.addEventListener('click', () => {
  catalogExpanded = !catalogExpanded;
  renderCatalog(false);
  if (!catalogExpanded) document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

window.addEventListener('resize', () => renderCatalog(false));

document.querySelector<HTMLInputElement>('#quantity-input')?.addEventListener('input', (event) => {
  setQuantity(Number((event.currentTarget as HTMLInputElement).value));
});

document.querySelector<HTMLInputElement>('#hero-quantity-input')?.addEventListener('input', (event) => {
  setQuantity(Number((event.currentTarget as HTMLInputElement).value));
});

document.querySelector<HTMLFormElement>('#request-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  void submitRequest(event.currentTarget as HTMLFormElement);
});

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;

  const supportTopic = target.closest<HTMLButtonElement>('[data-support-topic]');
  if (supportTopic?.dataset.supportTopic) {
    answerSupportQuestion(supportTopic.dataset.supportTopic);
    return;
  }

  if (target.closest('[data-support-back]')) {
    resetSupportConversation();
    return;
  }

  if (target.closest('[data-support-action]')) {
    closeSupportPanel(false);
    return;
  }

  const productPickerOption = target.closest<HTMLButtonElement>('[data-product-picker-value]');
  if (productPickerOption?.dataset.productPickerValue) {
    const picker = productPickerOption.closest<HTMLElement>('[data-product-picker]');
    if (picker) closeProductPicker(picker, true);
    selectProduct(productPickerOption.dataset.productPickerValue);
    return;
  }

  const productPickerTrigger = target.closest<HTMLButtonElement>('[data-product-picker-trigger]');
  if (productPickerTrigger) {
    const picker = productPickerTrigger.closest<HTMLElement>('[data-product-picker]');
    if (picker) toggleProductPicker(picker);
    return;
  }

  if (!target.closest('[data-product-picker]')) closeProductPickers();

  if (!target.closest('[data-order-status-control]')) closeOrderStatusMenus();
  if (!target.closest('[data-admin-calendar]')) closeAdminCalendar();

  const statusTrigger = target.closest<HTMLButtonElement>('[data-order-status-trigger]');
  if (statusTrigger) {
    const control = statusTrigger.closest<HTMLElement>('[data-order-status-control]');
    const menu = control?.querySelector<HTMLElement>('.order-status-control__menu');
    if (!control || !menu) return;
    const willOpen = menu.hidden;
    closeOrderStatusMenus(control);
    menu.hidden = !willOpen;
    control.classList.toggle('is-open', willOpen);
    statusTrigger.setAttribute('aria-expanded', String(willOpen));
    return;
  }

  const statusOption = target.closest<HTMLButtonElement>('[data-order-status-option]');
  if (statusOption?.dataset.orderId && statusOption.dataset.orderStatusOption) {
    void updateOrderStatus(statusOption.dataset.orderId, statusOption.dataset.orderStatusOption as OrderStatus);
    return;
  }

  const calendarTrigger = target.closest<HTMLButtonElement>('[data-calendar-trigger]');
  if (calendarTrigger) {
    const control = calendarTrigger.closest<HTMLElement>('[data-admin-calendar]');
    const popover = control?.querySelector<HTMLElement>('.admin-calendar__popover');
    if (!control || !popover) return;
    const willOpen = popover.hidden;
    closeOrderStatusMenus();
    popover.hidden = !willOpen;
    control.classList.toggle('is-open', willOpen);
    calendarTrigger.setAttribute('aria-expanded', String(willOpen));
    return;
  }

  const calendarMonth = target.closest<HTMLButtonElement>('[data-calendar-month]');
  if (calendarMonth?.dataset.calendarMonth) {
    const cursor = dateFromKey(adminCalendarCursor || dateKey(new Date()));
    cursor.setMonth(cursor.getMonth() + Number(calendarMonth.dataset.calendarMonth), 1);
    adminCalendarCursor = dateKey(cursor);
    replaceAdminCalendar(true, `[data-calendar-month="${calendarMonth.dataset.calendarMonth}"]`);
    return;
  }

  const calendarDate = target.closest<HTMLButtonElement>('[data-calendar-date]');
  if (calendarDate?.dataset.calendarDate) {
    const selectedDate = calendarDate.dataset.calendarDate;
    adminCalendarCursor = selectedDate;
    if (!adminOrderDate || adminOrderDateEnd) {
      adminOrderDate = selectedDate;
      adminOrderDateEnd = '';
      replaceAdminCalendar(true, `[data-calendar-date="${selectedDate}"]`);
    } else {
      adminOrderDateEnd = selectedDate;
      if (adminOrderDateEnd < adminOrderDate) {
        [adminOrderDate, adminOrderDateEnd] = [adminOrderDateEnd, adminOrderDate];
      }
      replaceAdminCalendar(false);
    }
    filterAdminOrders();
    return;
  }

  if (target.closest('[data-calendar-clear]')) {
    adminOrderDate = '';
    adminOrderDateEnd = '';
    replaceAdminCalendar(false);
    filterAdminOrders();
    return;
  }

  const savedMeasurementButton = target.closest<HTMLButtonElement>('[data-saved-measurement]');
  if (savedMeasurementButton?.dataset.savedMeasurement) {
    const measurement = savedMeasurements().find((item) => item.id === savedMeasurementButton.dataset.savedMeasurement);
    if (measurement) applySavedMeasurement(measurement);
    return;
  }

  if (target.closest('[data-clear-measurements]')) {
    localStorage.removeItem(STORAGE.measurements);
    renderSavedMeasurements();
    renderAccountPage();
    return;
  }

  if (target.closest('[data-use-tight-fit]') && fitDimensions) {
    fitMargin = 0;
    rememberMeasurement(fitDimensions, fitMargin);
    const marginInput = document.querySelector<HTMLInputElement>('#fit-form input[name="fitMargin"][value="0"]');
    if (marginInput) marginInput.checked = true;
    queueCatalogRender();
    return;
  }

  const productTrigger = target.closest<HTMLElement>('[data-open-product]');
  if (productTrigger?.dataset.openProduct) {
    openProductDialog(productTrigger.dataset.openProduct);
    return;
  }

  const preset = target.closest<HTMLButtonElement>('[data-quantity]');
  if (preset?.dataset.quantity) {
    setQuantity(Number(preset.dataset.quantity));
    return;
  }

  const step = target.closest<HTMLButtonElement>('[data-quantity-step]');
  if (step?.dataset.quantityStep) {
    setQuantity(selectedQuantity + Number(step.dataset.quantityStep));
    return;
  }

  if (target.closest('[data-product-to-cart]')) {
    addToCart(activeProductDialogId ?? selectedProductId, selectedQuantity);
    closeProductDialog();
    return;
  }

  if (target.closest('[data-add-selected-to-cart]')) {
    addToCart(selectedProductId, selectedQuantity);
    return;
  }

  const cartStep = target.closest<HTMLButtonElement>('[data-cart-step]');
  if (cartStep?.dataset.cartProduct && cartStep.dataset.cartStep) {
    const item = cartItems().find((candidate) => candidate.productId === cartStep.dataset.cartProduct);
    if (item) updateCartQuantity(item.productId, item.quantity + Number(cartStep.dataset.cartStep));
    return;
  }

  const editCartButton = target.closest<HTMLButtonElement>('[data-edit-cart]');
  if (editCartButton?.dataset.editCart) {
    const item = cartItems().find((candidate) => candidate.productId === editCartButton.dataset.editCart);
    if (item) {
      setQuantity(item.quantity);
      openProductDialog(item.productId);
    }
    return;
  }

  if (target.closest('[data-clear-cart]')) {
    if (window.confirm('Очистити всі позиції кошика?')) {
      writeStorage(STORAGE.cart, []);
      renderCart();
    }
    return;
  }

  const repeatOrderButton = target.closest<HTMLButtonElement>('[data-repeat-order]');
  if (repeatOrderButton?.dataset.repeatOrder) {
    repeatOrder(repeatOrderButton.dataset.repeatOrder);
    return;
  }

  const removeCartButton = target.closest<HTMLButtonElement>('[data-remove-cart]');
  if (removeCartButton?.dataset.removeCart) {
    removeFromCart(removeCartButton.dataset.removeCart);
    return;
  }

  if (target.closest('[data-product-to-calculator]')) {
    closeProductDialog(() => {
      window.location.hash = 'calculator';
      document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return;
  }

  const closeButton = target.closest<HTMLElement>('[data-close-dialog]');
  if (closeButton) {
    closeProductDialog();
    return;
  }

  if (target.closest('[data-edit-profile]')) {
    openProfileEditor();
    return;
  }

  if (target.closest('[data-close-profile]')) {
    document.querySelector<HTMLDialogElement>('#profile-dialog')?.close();
    return;
  }

  const authTab = target.closest<HTMLButtonElement>('[data-auth-tab]');
  if (authTab?.dataset.authTab) {
    const container = authTab.closest('.auth-forms');
    container?.querySelectorAll<HTMLButtonElement>('[data-auth-tab]').forEach((button) => {
      const active = button.dataset.authTab === authTab.dataset.authTab;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });
    container?.querySelectorAll<HTMLElement>('[data-auth-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.authPanel !== authTab.dataset.authTab;
    });
    return;
  }

  if (target.closest('#logout-button')) {
    if (backendEnabled) void backendApi.logout().catch(() => clearApiSession());
    localStorage.removeItem(STORAGE.session);
    renderAccountButton();
    renderCalculator();
    renderCatalog(false);
    renderAccountPage();
    return;
  }

  const accountPriceProduct = target.closest<HTMLButtonElement>('[data-account-price-product]');
  if (accountPriceProduct?.dataset.accountPriceProduct) {
    const product = visibleProducts().find((item) => item.id === accountPriceProduct.dataset.accountPriceProduct);
    if (product) {
      selectedProductId = product.id;
      renderCalculator();
      renderCatalog(false);
      window.location.hash = 'calculator';
    }
    return;
  }

  const clientPricesToggle = target.closest<HTMLButtonElement>('[data-client-prices-toggle]');
  if (clientPricesToggle?.dataset.clientPricesToggle) {
    const clientId = clientPricesToggle.dataset.clientPricesToggle;
    const panel = document.getElementById(`client-prices-${clientId}`);
    const willOpen = !clientPricesToggle.classList.contains('is-open');
    clientPricesToggle.classList.toggle('is-open', willOpen);
    clientPricesToggle.setAttribute('aria-expanded', String(willOpen));
    if (willOpen) {
      expandedClientPriceIds.add(clientId);
      if (panel) {
        panel.hidden = false;
        window.requestAnimationFrame(() => panel.classList.add('is-open'));
      }
    } else {
      expandedClientPriceIds.delete(clientId);
      panel?.classList.remove('is-open');
      window.setTimeout(() => {
        if (panel && !panel.classList.contains('is-open')) panel.hidden = true;
      }, 220);
    }
    return;
  }

  if (target.closest('[data-create-product]')) {
    openAdminProductEditor();
    return;
  }

  const editProduct = target.closest<HTMLElement>('[data-edit-product]');
  if (editProduct?.dataset.editProduct) {
    openAdminProductEditor(editProduct.dataset.editProduct);
    return;
  }

  if (target.closest('[data-close-admin-product]')) {
    document.querySelector<HTMLDialogElement>('#admin-product-dialog')?.close();
    return;
  }

  const toggleProduct = target.closest<HTMLElement>('[data-toggle-product]');
  if (toggleProduct?.dataset.toggleProduct) {
    const stored = catalogItems();
    const product = stored.find((item) => item.id === toggleProduct.dataset.toggleProduct);
    if (product) {
      if (backendEnabled) {
        void backendApi.updateProduct(product.id, { active: !product.active }).then((updated) => {
          saveCatalog(stored.map((item) => (item.id === product.id ? updated : item)) satisfies ManagedProduct[]);
          refreshProductSurfaces();
          adminNotice = updated.active ? `Товар №${updated.number} повернуто на сайт.` : `Товар №${updated.number} приховано.`;
          renderAdmin();
        }).catch((error) => {
          adminNotice = apiErrorMessage(error, 'Не вдалося змінити видимість товару.');
          renderAdmin();
        });
        return;
      }
      if (product.active && visibleProducts().length <= 1) {
        adminNotice = 'У каталозі має залишитися хоча б один активний товар.';
      } else {
        product.active = !product.active;
        product.updatedAt = new Date().toISOString();
        saveCatalog(stored);
        refreshProductSurfaces();
        adminNotice = product.active ? `Товар №${product.number} повернуто на сайт.` : `Товар №${product.number} приховано.`;
      }
      renderAdmin();
    }
    return;
  }

  const deleteProduct = target.closest<HTMLElement>('[data-delete-product]');
  if (deleteProduct?.dataset.deleteProduct) {
    const stored = catalogItems();
    const product = stored.find((item) => item.id === deleteProduct.dataset.deleteProduct);
    if (!product) return;
    if (product.active && visibleProducts().length <= 1) {
      adminNotice = 'Не можна видалити останній активний товар.';
      renderAdmin();
      return;
    }
    if (window.confirm(`Видалити коробку №${product.number}? Цю дію не можна скасувати.`)) {
      if (backendEnabled) {
        void backendApi.deleteProduct(product.id).then(() => {
          saveCatalog(stored.filter((item) => item.id !== product.id));
          writeStorage(STORAGE.cart, cartItems().filter((item) => item.productId !== product.id));
          refreshProductSurfaces();
          adminNotice = `Товар №${product.number} видалено.`;
          renderAdmin();
        }).catch((error) => {
          adminNotice = apiErrorMessage(error, 'Не вдалося видалити товар.');
          renderAdmin();
        });
        return;
      }
      saveCatalog(stored.filter((item) => item.id !== product.id));
      writeStorage(STORAGE.cart, cartItems().filter((item) => item.productId !== product.id));
      refreshProductSurfaces();
      adminNotice = `Товар №${product.number} видалено.`;
      renderAdmin();
    }
    return;
  }

  const deleteOrder = target.closest<HTMLButtonElement>('[data-delete-order]');
  if (deleteOrder?.dataset.deleteOrder) {
    const order = orders().find((item) => item.id === deleteOrder.dataset.deleteOrder);
    if (!order) return;
    if (window.confirm(`Видалити заявку ${order.id} від ${order.customerName}? Цю дію не можна скасувати.`)) {
      if (backendEnabled) {
        void backendApi.deleteOrder(order.id).then(() => {
          writeStorage(STORAGE.orders, orders().filter((item) => item.id !== order.id));
          adminNotice = `Заявку ${order.id} видалено.`;
          renderAdmin();
        }).catch((error) => {
          adminNotice = apiErrorMessage(error, 'Не вдалося видалити заявку.');
          renderAdmin();
        });
        return;
      }
      writeStorage(
        STORAGE.orders,
        orders().filter((item) => item.id !== order.id),
      );
      adminNotice = `Заявку ${order.id} видалено.`;
      renderAdmin();
    }
    return;
  }

  const productFilter = target.closest<HTMLButtonElement>('[data-product-filter]');
  if (productFilter?.dataset.productFilter) {
    adminProductVisibility = productFilter.dataset.productFilter as ProductVisibility;
    renderAdmin();
    return;
  }

  const orderFilter = target.closest<HTMLButtonElement>('[data-admin-order-filter]');
  if (orderFilter?.dataset.adminOrderFilter) {
    adminOrderStatus = orderFilter.dataset.adminOrderFilter as OrderStatus | 'Усі';
    document.querySelectorAll<HTMLButtonElement>('[data-admin-order-filter]').forEach((button) => {
      button.classList.toggle('is-active', button === orderFilter);
    });
    filterAdminOrders();
    return;
  }

  if (target.closest('[data-export-backup]')) {
    if (backendEnabled) {
      void backendApi.backup().then((payload) => {
        downloadJson(`toffipacks-server-backup-${new Date().toISOString().slice(0, 10)}.json`, payload);
      }).catch((error) => {
        adminNotice = apiErrorMessage(error, 'Не вдалося завантажити серверну копію.');
        renderAdmin();
      });
      return;
    }
    downloadJson(`toffipacks-backup-${new Date().toISOString().slice(0, 10)}.json`, backupPayload());
    return;
  }

  if (target.closest('[data-export-products]')) {
    downloadText(`toffipacks-products-${new Date().toISOString().slice(0, 10)}.csv`, productsCsv(), 'text/csv;charset=utf-8');
    return;
  }

  if (target.closest('[data-reset-products]')) {
    if (window.confirm('Відновити початковий каталог? Усі ручні зміни товарів буде втрачено.')) {
      if (backendEnabled) {
        void backendApi.resetProducts().then((products) => {
          saveCatalog(products satisfies ManagedProduct[]);
          refreshProductSurfaces();
          adminNotice = 'Початковий каталог відновлено.';
          renderAdmin();
        }).catch((error) => {
          adminNotice = apiErrorMessage(error, 'Не вдалося відновити каталог.');
          renderAdmin();
        });
        return;
      }
      saveCatalog(seedProducts.map((product) => ({ ...product, active: true, updatedAt: new Date().toISOString() })));
      refreshProductSurfaces();
      adminNotice = 'Початковий каталог відновлено.';
      renderAdmin();
    }
    return;
  }

  if (target.closest('#admin-logout')) {
    if (backendEnabled) void backendApi.logout().catch(() => clearApiSession());
    localStorage.removeItem(STORAGE.session);
    renderAccountButton();
    renderCalculator();
    renderCatalog(false);
    window.location.hash = 'admin';
    renderAdmin();
    return;
  }
});

document.addEventListener('keydown', (event) => {
  const target = event.target as HTMLElement;

  const supportPanel = document.querySelector<HTMLElement>('#support-panel');
  if (event.key === 'Escape' && supportPanel && !supportPanel.hidden) {
    event.preventDefault();
    closeSupportPanel();
    return;
  }

  const supportTopic = target.closest<HTMLButtonElement>('[data-support-topic]');
  if (supportTopic && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
    event.preventDefault();
    const topics = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-support-topic]'));
    const current = topics.indexOf(supportTopic);
    let next = current;
    if (event.key === 'ArrowDown') next = (current + 1) % topics.length;
    if (event.key === 'ArrowUp') next = (current - 1 + topics.length) % topics.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = topics.length - 1;
    topics[next]?.focus();
    return;
  }

  const productPickerTrigger = target.closest<HTMLButtonElement>('[data-product-picker-trigger]');
  if (productPickerTrigger) {
    const picker = productPickerTrigger.closest<HTMLElement>('[data-product-picker]');
    if (picker && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault();
      openProductPicker(picker, true);
      return;
    }
    if (picker && event.key === 'Escape' && picker.classList.contains('is-open')) {
      event.preventDefault();
      closeProductPicker(picker, true);
      return;
    }
  }

  const productPickerOption = target.closest<HTMLButtonElement>('[data-product-picker-value]');
  if (productPickerOption) {
    const picker = productPickerOption.closest<HTMLElement>('[data-product-picker]');
    const options = Array.from(picker?.querySelectorAll<HTMLButtonElement>('[data-product-picker-value]') ?? []);
    const current = options.indexOf(productPickerOption);
    if (event.key === 'Escape') {
      event.preventDefault();
      if (picker) closeProductPicker(picker, true);
      return;
    }
    if (event.key === 'Tab') {
      if (picker) closeProductPicker(picker);
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) || !options.length) return;
    event.preventDefault();
    let next = current;
    if (event.key === 'ArrowDown') next = (current + 1) % options.length;
    if (event.key === 'ArrowUp') next = (current - 1 + options.length) % options.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = options.length - 1;
    options[next]?.focus();
    options[next]?.scrollIntoView({ block: 'nearest' });
    return;
  }

  const statusTrigger = target.closest<HTMLButtonElement>('[data-order-status-trigger]');
  if (statusTrigger && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
    event.preventDefault();
    const control = statusTrigger.closest<HTMLElement>('[data-order-status-control]');
    const menu = control?.querySelector<HTMLElement>('.order-status-control__menu');
    if (menu?.hidden) statusTrigger.click();
    const options = Array.from(control?.querySelectorAll<HTMLButtonElement>('[data-order-status-option]') ?? []);
    const selected = Math.max(0, options.findIndex((option) => option.getAttribute('aria-selected') === 'true'));
    options[event.key === 'ArrowUp' ? Math.max(0, selected - 1) : selected]?.focus();
    return;
  }

  const statusOption = target.closest<HTMLButtonElement>('[data-order-status-option]');
  if (statusOption) {
    const control = statusOption.closest<HTMLElement>('[data-order-status-control]');
    const options = Array.from(control?.querySelectorAll<HTMLButtonElement>('[data-order-status-option]') ?? []);
    const current = options.indexOf(statusOption);
    if (event.key === 'Escape') {
      event.preventDefault();
      closeOrderStatusMenus();
      control?.querySelector<HTMLButtonElement>('[data-order-status-trigger]')?.focus();
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = current;
    if (event.key === 'ArrowDown') next = (current + 1) % options.length;
    if (event.key === 'ArrowUp') next = (current - 1 + options.length) % options.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = options.length - 1;
    options[next]?.focus();
    return;
  }

  const calendarControl = target.closest<HTMLElement>('[data-admin-calendar]');
  if (calendarControl && event.key === 'Escape') {
    event.preventDefault();
    closeAdminCalendar();
    calendarControl.querySelector<HTMLButtonElement>('[data-calendar-trigger]')?.focus();
    return;
  }

  const calendarTrigger = target.closest<HTMLButtonElement>('[data-calendar-trigger]');
  if (calendarTrigger && event.key === 'ArrowDown') {
    event.preventDefault();
    const popover = calendarControl?.querySelector<HTMLElement>('.admin-calendar__popover');
    if (popover?.hidden) calendarTrigger.click();
    const preferred =
      calendarControl?.querySelector<HTMLButtonElement>('[data-calendar-date].is-selected') ??
      calendarControl?.querySelector<HTMLButtonElement>('[data-calendar-date].is-today') ??
      calendarControl?.querySelector<HTMLButtonElement>('[data-calendar-date]:not(.is-outside)');
    preferred?.focus();
    return;
  }

  const calendarDay = target.closest<HTMLButtonElement>('[data-calendar-date]');
  if (calendarDay && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
    event.preventDefault();
    const dayButtons = Array.from(calendarControl?.querySelectorAll<HTMLButtonElement>('[data-calendar-date]') ?? []);
    const current = dayButtons.indexOf(calendarDay);
    const offset = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' ? -7 : 7;
    dayButtons[current + offset]?.focus();
  }
});

document.addEventListener('input', (event) => {
  const target = event.target;
  if (target instanceof HTMLInputElement && target.id === 'modal-quantity-input') {
    setQuantity(Number(target.value));
    return;
  }
  if (target instanceof HTMLInputElement && target.id === 'admin-product-search') {
    adminProductSearch = target.value;
    renderAdminProductList();
    return;
  }
  if (target instanceof HTMLInputElement && target.id === 'admin-order-search') {
    adminOrderSearch = target.value;
    filterAdminOrders();
    return;
  }
  if (target instanceof HTMLInputElement && target.id === 'admin-client-search') {
    filterAdminClients(target.value);
    return;
  }
  if (target instanceof HTMLInputElement && target.name === 'basePrice' && target.closest('#admin-product-form')) {
    const basePrice = Number(target.value) || 0;
    const model = { ...selectedProduct(), basePrice };
    const preview = target.closest('form')?.querySelector<HTMLElement>('.admin-editor-price-preview');
    const retail = preview?.querySelector<HTMLElement>('strong');
    const wholesale = preview?.querySelector<HTMLElement>('small');
    if (retail) retail.textContent = formatMoney(publicUnitPrice(model, 1));
    if (wholesale) wholesale.textContent = `опт: ${formatMoney(publicUnitPrice(model, WHOLESALE_FROM))}`;
  }
});

document.addEventListener('submit', (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (form.id === 'login-form') {
    event.preventDefault();
    void handleLogin(form);
  } else if (form.id === 'register-form') {
    event.preventDefault();
    void handleRegister(form);
  } else if (form.id === 'admin-login-form') {
    event.preventDefault();
    void handleLogin(form, true);
  } else if (form.id === 'admin-product-form') {
    event.preventDefault();
    void handleAdminProductSave(form);
  } else if (form.id === 'profile-form') {
    event.preventDefault();
    void handleProfileSave(form);
  }
});

document.addEventListener('change', (event) => {
  const target = event.target;

  if (target instanceof HTMLInputElement && target.matches('[data-import-products]')) {
    void handleProductImport(target);
    return;
  }

  if (target instanceof HTMLInputElement && target.matches('[data-import-backup]')) {
    void handleBackupImport(target);
    return;
  }

  if (target instanceof HTMLTextAreaElement && target.dataset.orderNote) {
    const storedOrders = orders();
    const order = storedOrders.find((item) => item.id === target.dataset.orderNote);
    if (order) {
      order.managerNote = target.value.trim();
      writeStorage(STORAGE.orders, storedOrders);
      if (backendEnabled) {
        void backendApi.updateOrder(order.id, { managerNote: order.managerNote }).then((updated) => {
          writeStorage(STORAGE.orders, storedOrders.map((item) => (item.id === updated.id ? updated : item)) satisfies Order[]);
        }).catch((error) => {
          adminNotice = apiErrorMessage(error, 'Не вдалося зберегти нотатку менеджера.');
          renderAdmin();
        });
      }
    }
    return;
  }

  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;

  if (target instanceof HTMLInputElement && target.dataset.cartQuantity) {
    updateCartQuantity(target.dataset.cartQuantity, Number(target.value));
    return;
  }

  if (target instanceof HTMLInputElement && target.dataset.partnerToggle) {
    const storedAccounts = accounts();
    const account = storedAccounts.find((item) => item.id === target.dataset.partnerToggle);
    if (account) {
      account.partner = target.checked;
      if (account.partner && !Object.keys(account.productPrices ?? {}).length) {
        account.productPrices = Object.fromEntries(
          catalogItems().map((product) => [
            product.id,
            Math.round((product.basePrice + DEFAULT_PARTNER_MARKUP) * 100) / 100,
          ]),
        );
      }
      if (account.partner) expandedClientPriceIds.add(account.id);
      writeStorage(STORAGE.accounts, storedAccounts);
      if (backendEnabled) {
        void backendApi.updateClient(account.id, { partner: account.partner, productPrices: account.productPrices }).then((updated) => {
          writeStorage(STORAGE.accounts, storedAccounts.map((item) => (item.id === updated.id ? updated : item)) satisfies Account[]);
          renderAdmin();
        }).catch((error) => {
          adminNotice = apiErrorMessage(error, 'Не вдалося змінити статус клієнта.');
          renderAdmin();
        });
        return;
      }
      renderAdmin();
    }
    return;
  }

  if (target instanceof HTMLInputElement && target.dataset.clientProductPrice && target.dataset.clientId) {
    const storedAccounts = accounts();
    const account = storedAccounts.find((item) => item.id === target.dataset.clientId);
    if (account) {
      const rawValue = target.value.trim();
      const nextPrice = Number(rawValue);
      if (rawValue && (!Number.isFinite(nextPrice) || nextPrice < 0.01 || nextPrice > 10000)) {
        target.setCustomValidity('Вкажіть кінцеву ціну від 0,01 до 10 000 грн.');
        target.reportValidity();
        return;
      }
      target.setCustomValidity('');
      account.productPrices = { ...(account.productPrices ?? {}) };
      if (rawValue) account.productPrices[target.dataset.clientProductPrice] = Math.round(nextPrice * 100) / 100;
      else delete account.productPrices[target.dataset.clientProductPrice];
      expandedClientPriceIds.add(account.id);
      writeStorage(STORAGE.accounts, storedAccounts);
      const priceCount = catalogItems().filter((product) => Number(account.productPrices?.[product.id]) > 0).length;
      const summary = document.querySelector<HTMLElement>(`[data-client-prices-toggle="${CSS.escape(account.id)}"] strong`);
      if (summary) summary.textContent = `${priceCount} із ${catalogItems().length}`;
      const priceCard = target.closest<HTMLElement>('.client-product-price');
      priceCard?.classList.remove('is-saved');
      if (priceCard) {
        void priceCard.offsetWidth;
        priceCard.classList.add('is-saved');
        window.setTimeout(() => priceCard.classList.remove('is-saved'), 900);
      }
      if (backendEnabled) {
        void backendApi.updateClient(account.id, { productPrices: account.productPrices }).then((updated) => {
          writeStorage(STORAGE.accounts, storedAccounts.map((item) => (item.id === updated.id ? updated : item)) satisfies Account[]);
        }).catch((error) => {
          adminNotice = apiErrorMessage(error, 'Не вдалося зберегти персональну ціну.');
          renderAdmin();
        });
        return;
      }
    }
  }
});

document.querySelector<HTMLDialogElement>('#product-dialog')?.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closeProductDialog();
  }
});

document.querySelector<HTMLDialogElement>('#product-dialog')?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeProductDialog();
});

document.querySelector<HTMLDialogElement>('#admin-product-dialog')?.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) (event.currentTarget as HTMLDialogElement).close();
});

document.querySelector<HTMLDialogElement>('#profile-dialog')?.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) (event.currentTarget as HTMLDialogElement).close();
});

window.addEventListener('hashchange', syncRoute);

async function hydrateFromBackend(): Promise<void> {
  if (!backendEnabled) return;
  document.body.dataset.backend = 'loading';
  try {
    saveCatalog((await backendApi.products()) satisfies ManagedProduct[]);
    if (hasApiSession()) await refreshBackendSession();
    document.body.dataset.backend = 'online';
    refreshProductSurfaces();
    renderAccountButton();
    syncRoute();
  } catch (error) {
    document.body.dataset.backend = 'offline';
    console.error('ToffiPacks backend is unavailable:', error);
    if (window.location.hash.startsWith('#admin')) {
      adminNotice = 'Сервер тимчасово недоступний. Дані не змінено.';
      renderAdmin();
    }
  }
}

function refreshClientPriceSurfaces(): void {
  renderAccountButton();
  renderCatalog(false);
  renderCalculator();
  renderAccountPage();
}

async function refreshSignedInClientPrices(): Promise<void> {
  if (!backendEnabled || !hasApiSession() || currentAccount()?.role !== 'client') return;
  try {
    cacheAccount(await backendApi.me());
    refreshClientPriceSurfaces();
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 401) {
      clearApiSession();
      localStorage.removeItem(STORAGE.session);
      refreshClientPriceSurfaces();
    }
  }
}

window.addEventListener('storage', (event) => {
  if (event.key === STORAGE.accounts && currentAccount()?.role === 'client') refreshClientPriceSurfaces();
});

window.addEventListener('focus', () => {
  void refreshSignedInClientPrices();
});

window.setInterval(() => {
  if (document.visibilityState === 'visible') void refreshSignedInClientPrices();
}, 20_000);

renderCatalog(true);
window.setTimeout(() => renderCatalog(false), 460);
renderCalculator();
renderAccountButton();
syncRoute();
initializeRevealAnimations();
void hydrateFromBackend();

if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('./sw.js').catch(() => undefined);
  });
}
