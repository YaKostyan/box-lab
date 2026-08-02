import './styles.css';
import {
  DEFAULT_PARTNER_MARKUP,
  faqItems,
  fitsWithRotation,
  formatMoney,
  MAX_QUANTITY,
  productVolume,
  products,
  publicUnitPrice,
  unitPrice,
  WHOLESALE_FROM,
  type Dimensions,
  type Product,
} from './data';

type AccountRole = 'client' | 'admin';
type OrderStatus = 'Нова' | 'У роботі' | 'Уточнення' | 'Підтверджена' | 'Закрита';
type CatalogSort = 'size' | 'price' | 'number';

interface Account {
  id: string;
  name: string;
  phone: string;
  company: string;
  password: string;
  role: AccountRole;
  partner: boolean;
  fixedMarkup: number;
  createdAt: string;
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

const STORAGE = {
  accounts: 'toffipacks-accounts-v3',
  orders: 'toffipacks-orders-v3',
  session: 'toffipacks-session-v3',
  cart: 'toffipacks-cart-v1',
};

const now = new Date().toISOString();
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
}

initializeStorage();

let selectedProductId = 'box-101';
let selectedQuantity = 500;
let catalogSearch = '';
let catalogSort: CatalogSort = 'size';
let fitDimensions: Dimensions | null = null;
let catalogTimer: number | undefined;
let activeProductDialogId: string | null = null;

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Root element #app was not found.');

function accounts(): Account[] {
  return readStorage<Account[]>(STORAGE.accounts, seedAccounts);
}

function orders(): Order[] {
  const stored = readStorage<Array<Order | LegacyOrder>>(STORAGE.orders, seedOrders);
  return stored.map((order) => {
    if ('items' in order && Array.isArray(order.items)) return order;
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
    };
  });
}

function cartItems(): CartItem[] {
  return readStorage<CartItem[]>(STORAGE.cart, []).filter(
    (item) => products.some((product) => product.id === item.productId) && item.quantity > 0,
  );
}

function currentAccount(): Account | null {
  const accountId = localStorage.getItem(STORAGE.session);
  return accounts().find((account) => account.id === accountId) ?? null;
}

function selectedProduct(): Product {
  return products.find((product) => product.id === selectedProductId) ?? products[0];
}

function clampQuantity(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(MAX_QUANTITY, Math.max(1, Math.round(value)));
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

function priceTypeLabel(quantity: number, account: Account | null): string {
  if (account?.partner) return 'Фіксована ціна клієнта';
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
        <text class="box-visual__number" x="${x + lengthScale / 2}" y="${y + heightScale * 0.56}">№${product.number}</text>
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

function productOptions(): string {
  return products
    .map(
      (product) =>
        `<option value="${product.id}"${product.id === selectedProductId ? ' selected' : ''}>№${product.number} · ${dimensionText(product.dimensions)}</option>`,
    )
    .join('');
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
            <div><dt>12</dt><dd>готових розмірів</dd></div>
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
          <label class="field">
            <span>Коробка</span>
            <select class="select" id="hero-product-select">${productOptions()}</select>
          </label>
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
                <input class="input" name="length" type="number" min="1" max="2000" value="170" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Ширина, мм</span>
                <input class="input" name="width" type="number" min="1" max="2000" value="110" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Висота, мм</span>
                <input class="input" name="height" type="number" min="1" max="2000" value="45" required />
              </label>
            </div>
            <button class="button button--primary" type="submit">Знайти коробку</button>
            <p class="form-message" id="fit-message" aria-live="polite"></p>
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
            <p class="eyebrow"><span></span> 12 готових розмірів</p>
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
            <label class="field">
              <span>Розмір коробки</span>
              <select class="select select--large" id="calculator-product-select">${productOptions()}</select>
            </label>
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
            <div class="eco-card__limit">
              <strong>до 2 кг</strong>
              <p>рекомендоване навантаження для цього картону</p>
            </div>
            <p class="eco-card__note">
              За умови щільного внутрішнього пакування коробка надійно утримує вміст під час
              зберігання та перевезення.
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
              <div><h3>Доставка</h3><p>Відправлення по Україні: місто, відділення або адресний формат узгоджуємо під час підтвердження.</p></div>
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

    <section class="admin-page" id="admin-page" hidden aria-labelledby="admin-title">
      <header class="admin-header">
        <a class="brand" href="#top">
          <span class="brand__mark"><img src="./toffipacks-logo.webp" alt="" /></span>
          <span class="brand__copy"><strong>TOFFIPACKS</strong><small>кабінет менеджера</small></span>
        </a>
        <a class="button button--ghost button--small" href="#top">Повернутися на сайт</a>
      </header>
      <div id="admin-content"></div>
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
  `;
}

app.innerHTML = storefrontTemplate();

const productGrid = document.querySelector<HTMLDivElement>('#product-grid');
const catalogCount = document.querySelector<HTMLParagraphElement>('#catalog-count');

function productCard(product: Product): string {
  const account = currentAccount();
  const retail = publicUnitPrice(product, 1);
  const wholesale = publicUnitPrice(product, WHOLESALE_FROM);
  const partner = account?.partner ? unitPrice(product, 1, account) : null;
  return `
    <article
      class="product-card${product.id === selectedProductId ? ' is-selected' : ''}"
      data-open-product="${product.id}"
      tabindex="0"
      role="button"
      aria-label="Відкрити коробку №${product.number}, ${dimensionText(product.dimensions)}"
    >
      <div class="product-card__head">
        <span class="product-card__number">№${product.number}</span>
        <span class="product-card__size-label">внутрішній розмір</span>
      </div>
      <div class="product-card__visual">${boxDiagram(product, true)}</div>
      <h3>${dimensionText(product.dimensions)}</h3>
      <div class="product-card__prices">
        ${
          partner !== null
            ? `<div class="partner-price"><span>Ваша фіксована</span><strong>${formatMoney(partner)}<small>/шт.</small></strong></div>`
            : `
              <div><span>1–999 шт.</span><strong>${formatMoney(retail)}</strong></div>
              <div><span>від 1000 шт.</span><strong>${formatMoney(wholesale)}</strong></div>
            `
        }
      </div>
      <button class="button button--card" type="button" data-open-product="${product.id}">
        Детальніше
      </button>
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
          <span>№${product.number}</span>
        </div>
        <div class="product-modal__drawing">${boxDiagram(product, true)}</div>
        <p>Внутрішній розмір · Д × Ш × В</p>
      </div>
      <div class="product-modal__content">
        <p class="eyebrow"><span></span> Внутрішній розмір</p>
        <h2 id="product-dialog-title">${dimensionText(product.dimensions)}</h2>

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
          <div><span id="modal-price-tier">${priceTypeLabel(selectedQuantity, account)}</span><strong id="modal-unit-price">${formatMoney(calculatedUnit)} / шт.</strong></div>
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
  const product = products.find((item) => item.id === activeProductDialogId);
  if (!product) return;
  const account = currentAccount();
  const calculatedUnit = unitPrice(product, selectedQuantity, account);
  const quantityInput = dialog.querySelector<HTMLInputElement>('#modal-quantity-input');
  if (quantityInput) quantityInput.value = String(selectedQuantity);
  const quantityOutput = dialog.querySelector<HTMLOutputElement>('#modal-quantity-output');
  if (quantityOutput) quantityOutput.value = `${selectedQuantity.toLocaleString('uk-UA')} шт.`;
  const tier = dialog.querySelector<HTMLElement>('#modal-price-tier');
  if (tier) tier.textContent = priceTypeLabel(selectedQuantity, account);
  const unit = dialog.querySelector<HTMLElement>('#modal-unit-price');
  if (unit) unit.textContent = `${formatMoney(calculatedUnit)} / шт.`;
  const total = dialog.querySelector<HTMLElement>('#modal-total');
  if (total) total.textContent = formatMoney(calculatedUnit * selectedQuantity);
  dialog.querySelectorAll<HTMLButtonElement>('[data-quantity]').forEach((button) => {
    button.classList.toggle('is-active', Number(button.dataset.quantity) === selectedQuantity);
  });
}

function openProductDialog(productId: string): void {
  const product = products.find((item) => item.id === productId);
  const dialog = document.querySelector<HTMLDialogElement>('#product-dialog');
  const content = document.querySelector<HTMLDivElement>('#product-dialog-content');
  if (!product || !dialog || !content) return;
  activeProductDialogId = product.id;
  selectProduct(product.id);
  content.innerHTML = productDialogContent(product);
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  updateProductDialog();
}

function filteredProducts(): Product[] {
  const normalizedSearch = catalogSearch.trim().toLocaleLowerCase('uk-UA');
  const result = products.filter((product) => {
    const searchable = `${product.number} ${product.name} ${dimensionText(product.dimensions)}`.toLocaleLowerCase('uk-UA');
    const matchesSearch = !normalizedSearch || searchable.includes(normalizedSearch);
    const matchesDimensions = !fitDimensions || fitsWithRotation(fitDimensions, product.dimensions);
    return matchesSearch && matchesDimensions;
  });

  return result.sort((first, second) => {
    if (catalogSort === 'price') return first.basePrice - second.basePrice;
    if (catalogSort === 'number') return Number(first.number) - Number(second.number);
    return productVolume(first) - productVolume(second);
  });
}

function renderCatalog(loading = false): void {
  if (!productGrid || !catalogCount) return;
  if (loading) {
    catalogCount.textContent = 'Оновлюємо список…';
    productGrid.innerHTML = Array.from(
      { length: 6 },
      () => '<div class="product-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>',
    ).join('');
    return;
  }

  const result = filteredProducts();
  const fitNote = fitDimensions ? ` · предмет ${dimensionText(fitDimensions)}` : '';
  catalogCount.textContent = `${result.length} із ${products.length} розмірів${fitNote}`;
  if (!result.length) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__box" aria-hidden="true"></div>
        <h3>Готового розміру немає.</h3>
        <p>Змініть габарити предмета або залиште заявку з потрібним розміром.</p>
        <a class="button button--primary" href="#request">Описати свій розмір</a>
      </div>
    `;
    return;
  }
  productGrid.innerHTML = result.map(productCard).join('');
}

function queueCatalogRender(): void {
  window.clearTimeout(catalogTimer);
  renderCatalog(true);
  catalogTimer = window.setTimeout(() => renderCatalog(false), 320);
}

function renderCalculator(): void {
  const product = selectedProduct();
  const account = currentAccount();
  const calculatedUnit = unitPrice(product, selectedQuantity, account);
  const total = calculatedUnit * selectedQuantity;
  const tier = priceTypeLabel(selectedQuantity, account);

  document.querySelectorAll<HTMLSelectElement>('#calculator-product-select, #hero-product-select').forEach((select) => {
    select.value = product.id;
  });
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
    badge.textContent = account?.partner ? 'Персональна ціна активна' : 'Публічна ціна';
    badge.classList.toggle('is-partner', Boolean(account?.partner));
  }

  const threshold = document.querySelector<HTMLElement>('#threshold-note');
  if (threshold) {
    if (account?.partner) {
      threshold.innerHTML = `<strong>Фіксована ціна:</strong> ${formatMoney(calculatedUnit)} за одиницю незалежно від тиражу.`;
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
  if (!products.some((product) => product.id === productId)) return;
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
  if (!products.some((product) => product.id === productId)) return;
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
        <span aria-hidden="true">□</span>
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
      const product = products.find((candidate) => candidate.id === item.productId);
      if (!product) return '';
      const price = unitPrice(product, item.quantity, account);
      const lineTotal = price * item.quantity;
      cartTotal += lineTotal;
      return `
        <article class="cart-item">
          <div class="cart-item__index">№${product.number}</div>
          <div class="cart-item__info">
            <strong>${dimensionText(product.dimensions)}</strong>
            <span>${formatMoney(price)} / шт.</span>
          </div>
          <label class="cart-item__quantity">
            <span>Кількість</span>
            <input class="input" type="number" min="1" max="${MAX_QUANTITY}" value="${item.quantity}" data-cart-quantity="${product.id}" />
          </label>
          <div class="cart-item__total">
            <span>Сума</span>
            <strong>${formatMoney(lineTotal)}</strong>
          </div>
          <button class="cart-item__remove" type="button" data-remove-cart="${product.id}" aria-label="Прибрати коробку №${product.number} з кошика">×</button>
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
    <a class="cart-continue" href="#catalog">+ Додати ще один розмір</a>
  `;
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
          <div class="account-price-card${account.partner ? ' is-partner' : ''}">
            <span>Ваші ціни</span>
            <strong>${account.partner ? 'Персональна ціна активна' : 'Стандартні ціни'}</strong>
            <p>${account.partner ? 'Ваша ціна вже застосована в каталозі, калькуляторі та кошику.' : 'Усі суми показані одразу в кінцевому вигляді.'}</p>
          </div>
        </section>

        <div class="account-kpis">
          <article><span>Усі заявки</span><strong>${accountOrders.length}</strong><small>оформлено</small></article>
          <article><span>Активні</span><strong>${activeOrders}</strong><small>потребують уваги</small></article>
          <article><span>Сума заявок</span><strong>${formatMoney(orderTotal)}</strong><small>загальна вартість</small></article>
        </div>

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
                              <strong>${positionLabel(order.items.length)}</strong>
                              <small>${totalQuantity.toLocaleString('uk-UA')} шт. загалом</small>
                            </div>
                            <div class="account-order__price"><strong>${formatMoney(order.total)}</strong><small>загальна сума</small></div>
                            <div class="account-order__meta"><span>${escapeHtml(order.status)}</span><time datetime="${order.createdAt}">${new Date(order.createdAt).toLocaleDateString('uk-UA')}</time></div>
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
              <span>Коробка №${product.number}</span>
              <h3>${dimensionText(product.dimensions)}</h3>
              <div><span>${selectedQuantity.toLocaleString('uk-UA')} шт.</span><strong>${formatMoney(personalPrice * selectedQuantity)}</strong></div>
              <button class="button button--gold button--wide" type="button" data-add-selected-to-cart>Додати до кошика</button>
            </article>
            <article class="account-profile-card">
              <div><p class="technical-label">Профіль</p><a href="#account">Дані клієнта</a></div>
              <dl>
                <div><dt>Телефон</dt><dd>${escapeHtml(account.phone)}</dd></div>
                <div><dt>Компанія</dt><dd>${escapeHtml(account.company || 'Не вказано')}</dd></div>
                <div><dt>Статус</dt><dd>${account.partner ? 'Постійний клієнт' : 'Новий клієнт'}</dd></div>
              </dl>
              ${account.role === 'admin' ? '<a class="button button--ghost button--wide" href="#admin">Відкрити адмінку</a>' : ''}
            </article>
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
        <p>Постійним клієнтам менеджер може активувати фіксовану ціну нижче публічної оптової.</p>
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
          <label class="field"><span>Пароль, від 6 символів *</span><input class="input" name="password" type="password" minlength="6" required /></label>
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

function setFormStatus(form: HTMLFormElement, message: string, type: 'error' | 'success'): void {
  const status = form.querySelector<HTMLElement>('[data-auth-status]');
  if (!status) return;
  status.textContent = message;
  status.className = `form-status is-${type}`;
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

function handleLogin(form: HTMLFormElement, adminOnly = false): void {
  form.classList.add('was-validated');
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const account = login(String(formData.get('phone') ?? ''), String(formData.get('password') ?? ''));
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

function handleRegister(form: HTMLFormElement): void {
  form.classList.add('was-validated');
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const phone = normalizePhone(String(formData.get('phone') ?? ''));
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

function submitRequest(form: HTMLFormElement): void {
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
  const orderItems: OrderItem[] = storedCart.flatMap((cartItem) => {
    const product = products.find((candidate) => candidate.id === cartItem.productId);
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
        priceType: priceTypeLabel(cartItem.quantity, account),
      },
    ];
  });
  const orderTotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const order: Order = {
    id: `TP-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    customerName: String(formData.get('name') ?? '').trim(),
    phone: normalizePhone(String(formData.get('phone') ?? '')),
    company: String(formData.get('company') ?? '').trim(),
    comment: String(formData.get('comment') ?? '').trim(),
    items: orderItems,
    total: orderTotal,
    accountId: account?.id,
    status: 'Нова',
  };
  const storedOrders = orders();
  storedOrders.push(order);
  writeStorage(STORAGE.orders, storedOrders);
  writeStorage(STORAGE.cart, []);
  renderCart();
  renderAccountPage();

  if (status) {
    status.className = 'form-status is-success';
    status.innerHTML = `<strong>Заявку створено.</strong><span>${positionLabel(order.items.length)} на суму ${formatMoney(order.total)}.</span>`;
  }
  form.querySelector<HTMLButtonElement>('button[type="submit"]')?.focus();
}

function orderStatusOptions(selected: OrderStatus): string {
  const statuses: OrderStatus[] = ['Нова', 'У роботі', 'Уточнення', 'Підтверджена', 'Закрита'];
  return statuses
    .map((status) => `<option value="${status}"${status === selected ? ' selected' : ''}>${status}</option>`)
    .join('');
}

function renderAdmin(): void {
  const content = document.querySelector<HTMLDivElement>('#admin-content');
  if (!content) return;
  const account = currentAccount();
  if (!account || account.role !== 'admin') {
    content.innerHTML = `
      <div class="admin-login">
        <p class="eyebrow"><span></span> Для менеджера</p>
        <h1 id="admin-title">Вхід для менеджера.</h1>
        <p>Увійдіть, щоб переглядати заявки та керувати статусами клієнтів.</p>
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
  const openOrders = storedOrders.filter((order) => order.status !== 'Закрита').length;
  const total = storedOrders.reduce((sum, order) => sum + order.total, 0);

  content.innerHTML = `
    <div class="admin-shell">
      <div class="admin-title-row">
        <div>
          <p class="eyebrow"><span></span> Кабінет менеджера</p>
          <h1 id="admin-title">Заявки та клієнти.</h1>
        </div>
        <div>
          <span>${escapeHtml(account.phone)}</span>
          <button class="text-link" id="admin-logout" type="button">Вийти</button>
        </div>
      </div>
      <div class="admin-stats">
        <article><span>Усі заявки</span><strong>${storedOrders.length}</strong></article>
        <article><span>Активні</span><strong>${openOrders}</strong></article>
        <article><span>Клієнти</span><strong>${clients.length}</strong></article>
        <article><span>Загальна сума</span><strong>${formatMoney(total)}</strong></article>
      </div>
      <section class="admin-section">
        <div class="admin-section__head"><h2>Заявки</h2><span>${storedOrders.length} записів</span></div>
        <div class="orders-list">
          ${
            storedOrders.length
              ? storedOrders
                  .map(
                    (order) => `
                      <article class="order-card">
                        <div class="order-card__top">
                          <div><span>${escapeHtml(order.id)}</span><strong>${escapeHtml(order.customerName)}</strong></div>
                          <select class="select status-select" data-order-status="${escapeHtml(order.id)}">${orderStatusOptions(order.status)}</select>
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
                        <time datetime="${order.createdAt}">${new Date(order.createdAt).toLocaleString('uk-UA')}</time>
                      </article>
                    `,
                  )
                  .join('')
              : '<div class="empty-state"><h3>Заявок ще немає.</h3><p>Нові заявки з’являться в цьому розділі.</p></div>'
          }
        </div>
      </section>
      <section class="admin-section">
        <div class="admin-section__head"><h2>Клієнти</h2><span>Персональні умови</span></div>
        <div class="clients-table">
          <div class="clients-table__head"><span>Клієнт</span><span>Персональна ціна</span></div>
          ${clients
            .map(
              (client) => `
                <div class="client-row">
                  <div><strong>${escapeHtml(client.name)}</strong><span>${escapeHtml(client.company || 'Без компанії')}</span><a href="tel:${escapeHtml(client.phone)}">${escapeHtml(client.phone)}</a></div>
                  <label class="partner-toggle"><input type="checkbox" data-partner-toggle="${client.id}"${client.partner ? ' checked' : ''} /><span>${client.partner ? 'Активна' : 'Неактивна'}</span></label>
                </div>
              `,
            )
            .join('')}
        </div>
      </section>
    </div>
  `;
}

function syncRoute(): void {
  const adminPage = document.querySelector<HTMLElement>('#admin-page');
  const accountPage = document.querySelector<HTMLElement>('#account-page');
  const storefront = document.querySelector<HTMLElement>('#main');
  const header = document.querySelector<HTMLElement>('.site-header');
  const footer = document.querySelector<HTMLElement>('.site-footer');
  const strip = document.querySelector<HTMLElement>('.demo-strip');
  const showAdmin = window.location.hash === '#admin';
  const showAccount = window.location.hash === '#account';
  if (adminPage) adminPage.hidden = !showAdmin;
  if (accountPage) accountPage.hidden = !showAccount;
  if (storefront) storefront.hidden = showAdmin || showAccount;
  if (header) header.hidden = showAdmin || showAccount;
  if (footer) footer.hidden = showAdmin || showAccount;
  if (strip) strip.hidden = showAdmin || showAccount;
  document.body.classList.toggle('is-admin', showAdmin);
  document.body.classList.toggle('is-account', showAccount);
  if (showAdmin) {
    renderAdmin();
    window.scrollTo({ top: 0 });
  } else if (showAccount) {
    renderAccountPage();
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
  if (message) {
    message.textContent = 'Розміри застосовано. Показуємо коробки нижче.';
    message.className = 'form-message is-success';
  }
  queueCatalogRender();
  window.setTimeout(() => document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' }), 180);
});

document.querySelector<HTMLInputElement>('#catalog-search')?.addEventListener('input', (event) => {
  catalogSearch = (event.currentTarget as HTMLInputElement).value;
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
  catalogSearch = '';
  const search = document.querySelector<HTMLInputElement>('#catalog-search');
  if (search) search.value = '';
  const message = document.querySelector<HTMLParagraphElement>('#fit-message');
  if (message) message.textContent = '';
  queueCatalogRender();
});

document.querySelector<HTMLSelectElement>('#calculator-product-select')?.addEventListener('change', (event) => {
  selectProduct((event.currentTarget as HTMLSelectElement).value);
});

document.querySelector<HTMLSelectElement>('#hero-product-select')?.addEventListener('change', (event) => {
  selectProduct((event.currentTarget as HTMLSelectElement).value);
});

document.querySelector<HTMLInputElement>('#quantity-input')?.addEventListener('input', (event) => {
  setQuantity(Number((event.currentTarget as HTMLInputElement).value));
});

document.querySelector<HTMLInputElement>('#hero-quantity-input')?.addEventListener('input', (event) => {
  setQuantity(Number((event.currentTarget as HTMLInputElement).value));
});

document.querySelector<HTMLFormElement>('#request-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  submitRequest(event.currentTarget as HTMLFormElement);
});

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
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
    document.querySelector<HTMLDialogElement>('#product-dialog')?.close();
    activeProductDialogId = null;
    return;
  }

  if (target.closest('[data-add-selected-to-cart]')) {
    addToCart(selectedProductId, selectedQuantity);
    return;
  }

  const removeCartButton = target.closest<HTMLButtonElement>('[data-remove-cart]');
  if (removeCartButton?.dataset.removeCart) {
    removeFromCart(removeCartButton.dataset.removeCart);
    return;
  }

  if (target.closest('[data-product-to-calculator]')) {
    document.querySelector<HTMLDialogElement>('#product-dialog')?.close();
    activeProductDialogId = null;
    window.location.hash = 'calculator';
    document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  const closeButton = target.closest<HTMLElement>('[data-close-dialog]');
  if (closeButton) {
    closeButton.closest<HTMLDialogElement>('dialog')?.close();
    activeProductDialogId = null;
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
    localStorage.removeItem(STORAGE.session);
    renderAccountButton();
    renderCalculator();
    renderCatalog(false);
    renderAccountPage();
    return;
  }

  if (target.closest('#admin-logout')) {
    localStorage.removeItem(STORAGE.session);
    renderAccountButton();
    renderCalculator();
    renderCatalog(false);
    renderAdmin();
  }
});

document.addEventListener('input', (event) => {
  const target = event.target;
  if (target instanceof HTMLInputElement && target.id === 'modal-quantity-input') {
    setQuantity(Number(target.value));
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.matches('.product-card')) return;
  event.preventDefault();
  if (target.dataset.openProduct) openProductDialog(target.dataset.openProduct);
});

document.addEventListener('submit', (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (form.id === 'login-form') {
    event.preventDefault();
    handleLogin(form);
  } else if (form.id === 'register-form') {
    event.preventDefault();
    handleRegister(form);
  } else if (form.id === 'admin-login-form') {
    event.preventDefault();
    handleLogin(form, true);
  }
});

document.addEventListener('change', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;

  if (target instanceof HTMLInputElement && target.dataset.cartQuantity) {
    updateCartQuantity(target.dataset.cartQuantity, Number(target.value));
    return;
  }

  if (target instanceof HTMLSelectElement && target.dataset.orderStatus) {
    const storedOrders = orders();
    const order = storedOrders.find((item) => item.id === target.dataset.orderStatus);
    if (order) {
      order.status = target.value as OrderStatus;
      writeStorage(STORAGE.orders, storedOrders);
      renderAdmin();
    }
    return;
  }

  if (target instanceof HTMLInputElement && target.dataset.partnerToggle) {
    const storedAccounts = accounts();
    const account = storedAccounts.find((item) => item.id === target.dataset.partnerToggle);
    if (account) {
      account.partner = target.checked;
      writeStorage(STORAGE.accounts, storedAccounts);
      renderAdmin();
    }
    return;
  }

  if (target instanceof HTMLInputElement && target.dataset.partnerMarkup) {
    const storedAccounts = accounts();
    const account = storedAccounts.find((item) => item.id === target.dataset.partnerMarkup);
    if (account) {
      account.fixedMarkup = Math.min(0.99, Math.max(0, Number(target.value) || 0));
      writeStorage(STORAGE.accounts, storedAccounts);
      renderAdmin();
    }
  }
});

document.querySelector<HTMLDialogElement>('#product-dialog')?.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    (event.currentTarget as HTMLDialogElement).close();
    activeProductDialogId = null;
  }
});

window.addEventListener('hashchange', syncRoute);

renderCatalog(true);
window.setTimeout(() => renderCatalog(false), 460);
renderCalculator();
renderAccountButton();
syncRoute();
initializeRevealAnimations();
