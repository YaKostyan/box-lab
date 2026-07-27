import './styles.css';
import {
  DEFAULT_PARTNER_MARKUP,
  faqItems,
  fitsWithRotation,
  formatMoney,
  MATERIAL,
  MAX_QUANTITY,
  productVolume,
  products,
  publicUnitPrice,
  RETAIL_MARKUP,
  unitPrice,
  WHOLESALE_FROM,
  WHOLESALE_MARKUP,
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
  productId: string;
  productNumber: string;
  dimensions: Dimensions;
  quantity: number;
  unitPrice: number;
  total: number;
  priceType: string;
  accountId?: string;
  status: OrderStatus;
}

const STORAGE = {
  accounts: 'toffipacks-demo-accounts-v2',
  orders: 'toffipacks-demo-orders-v2',
  session: 'toffipacks-demo-session-v2',
};

const now = new Date().toISOString();
const demoAccounts: Account[] = [
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
    company: 'Demo Coffee',
    password: 'client123',
    role: 'client',
    partner: true,
    fixedMarkup: DEFAULT_PARTNER_MARKUP,
    createdAt: now,
  },
];

const demoOrders: Order[] = [
  {
    id: 'TP-DEMO-001',
    createdAt: now,
    customerName: 'Олена',
    phone: '+380671112233',
    company: 'Demo Coffee',
    comment: 'Потрібно уточнити строк виготовлення.',
    productId: 'box-101',
    productNumber: '101',
    dimensions: { length: 178, width: 115, height: 48 },
    quantity: 1200,
    unitPrice: 4.5,
    total: 5400,
    priceType: 'Фіксована ціна клієнта',
    accountId: 'account-partner',
    status: 'Нова',
  },
];

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

function initializeDemoStorage(): void {
  if (!localStorage.getItem(STORAGE.accounts)) writeStorage(STORAGE.accounts, demoAccounts);
  if (!localStorage.getItem(STORAGE.orders)) writeStorage(STORAGE.orders, demoOrders);
}

initializeDemoStorage();

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
  return readStorage<Account[]>(STORAGE.accounts, demoAccounts);
}

function orders(): Order[] {
  return readStorage<Order[]>(STORAGE.orders, demoOrders);
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
    <div class="demo-strip" role="note">
      <span>Демо-прототип</span>
      <p>Акаунти та заявки зберігаються лише у цьому браузері. Реальної відправки немає.</p>
    </div>

    <header class="site-header" id="top">
      <a class="brand" href="#top" aria-label="ToffiPacks — на головну">
        <span class="brand__mark"><img src="./toffipacks-logo.webp" alt="" /></span>
        <span class="brand__copy"><strong>TOFFIPACKS</strong><small>самозбірні коробки</small></span>
      </a>
      <nav class="site-nav" id="site-nav" aria-label="Основна навігація">
        <a href="#catalog">Розміри</a>
        <a href="#calculator">Калькулятор</a>
        <a href="#business">Для бізнесу</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div class="header-actions">
        <a class="button button--ghost button--small" id="account-button" href="#account">Кабінет</a>
        <a class="button button--primary button--small" href="#request">Залишити заявку</a>
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
            <div><dt>12</dt><dd>розмірів у прайсі</dd></div>
            <div><dt>1–50 000</dt><dd>діапазон калькулятора</dd></div>
            <div><dt>${escapeHtml(MATERIAL)}</dt><dd>один матеріал</dd></div>
          </dl>
        </div>

        <div class="hero__visual reveal">
          <div class="logo-stage">
            <div class="logo-stage__orbit" aria-hidden="true"></div>
            <div class="logo-stage__image">
              <img src="./toffipacks-logo.webp" alt="Логотип ToffiPacks із деревом у відбитку лапи" />
            </div>
            <div class="logo-stage__note">
              <span class="technical-label">TOFFIPACKS / 2026</span>
              <strong>Просто обрати.<br />Легко порахувати.</strong>
            </div>
          </div>
        </div>

        <div class="hero-calculator reveal" aria-label="Швидкий розрахунок">
          <div class="hero-calculator__head">
            <span class="technical-label">Швидкий розрахунок</span>
            <span class="price-rule">1–999: +${RETAIL_MARKUP} грн · ${WHOLESALE_FROM}+: +${WHOLESALE_MARKUP} грн</span>
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
            <p class="eyebrow"><span></span> 12 позицій із прайса</p>
            <h2>Оберіть розмір,<br />не призначення.</h2>
          </div>
          <p>Усі картки побудовані за наданим прайсом ToffiPacks. Базові дані не вигадані.</p>
        </div>
        <div class="catalog-toolbar reveal">
          <label class="search-field">
            <span class="sr-only">Пошук</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"></circle><path d="m16 16 4 4"></path></svg>
            <input id="catalog-search" type="search" placeholder="Номер, артикул або розмір" autocomplete="off" />
          </label>
          <label class="sort-field">
            <span>Сортувати</span>
            <select class="select" id="catalog-sort">
              <option value="size">Від компактних</option>
              <option value="price">За ціною</option>
              <option value="number">За номером</option>
            </select>
          </label>
          <button class="button button--ghost button--small" id="reset-catalog" type="button">Скинути підбір</button>
        </div>
        <div class="catalog-meta">
          <p id="catalog-count" aria-live="polite"></p>
          <p class="source-note">Джерело: Price_List_ToffiPacks-v3.xlsx</p>
        </div>
        <div class="product-grid" id="product-grid" aria-live="polite"></div>
      </section>

      <section class="section calculator-section" id="calculator">
        <div class="calculator-shell reveal">
          <div class="calculator-copy">
            <p class="eyebrow eyebrow--light"><span></span> Калькулятор тиражу</p>
            <h2>Від однієї коробки<br />до 50 тисяч.</h2>
            <p>
              Ціна змінюється рівно один раз — на 1000 штук. Для підтверджених
              постійних клієнтів застосовується фіксована персональна ціна.
            </p>
            <div class="price-logic">
              <div><span>1–999 шт.</span><strong>прайс + 2 грн</strong></div>
              <div><span>1 000–50 000 шт.</span><strong>прайс + 1 грн</strong></div>
              <div><span>Постійний клієнт</span><strong>фіксована ціна</strong></div>
            </div>
          </div>

          <div class="calculator-card">
            <div class="calculator-card__top">
              <span class="technical-label">Розрахунок / live</span>
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
                <span><b>1–999</b><small>прайс + 2 грн</small></span>
                <i aria-hidden="true"></i>
                <span><b>від 1 000</b><small>прайс + 1 грн</small></span>
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
            <a class="button button--gold button--wide" href="#request">Перенести в заявку</a>
          </div>
        </div>
      </section>

      <section class="section business-section" id="business">
        <div class="section-heading reveal">
          <div>
            <p class="eyebrow"><span></span> Постійним клієнтам</p>
            <h2>Ціна, яка не змінюється<br />від замовлення до замовлення.</h2>
          </div>
          <p>Персональні умови прив’язуються до акаунта після підтвердження менеджером.</p>
        </div>
        <div class="business-grid">
          <article class="business-card reveal">
            <span class="business-card__number">01</span>
            <h3>Реєстрація</h3>
            <p>Клієнт створює кабінет із контактами компанії. Новий профіль одразу видно в локальній демо-адмінці.</p>
          </article>
          <article class="business-card reveal">
            <span class="business-card__number">02</span>
            <h3>Підтвердження</h3>
            <p>Менеджер позначає клієнта як постійного та задає фіксовану націнку нижче публічної оптової.</p>
          </article>
          <article class="business-card business-card--accent reveal">
            <span class="business-card__number">03</span>
            <h3>Своя ціна</h3>
            <p>Після входу каталог, калькулятор і заявка автоматично працюють за персональною ціною.</p>
            <a class="text-link text-link--light" id="business-account-button" href="#account">Відкрити кабінет <span>→</span></a>
          </article>
        </div>
      </section>

      <section class="section request-section" id="request">
        <div class="request-copy reveal">
          <p class="eyebrow"><span></span> Заявка на замовлення</p>
          <h2>Залиште номер —<br />менеджер уточнить деталі.</h2>
          <p>
            Тут немає вигаданих телефонів ToffiPacks. Клієнт залишає свої контакти,
            а заявка з’являється в демо-адмінці.
          </p>
          <div class="request-summary" id="request-summary"></div>
          <div class="local-warning">
            <strong>Важливо</strong>
            <p>На GitHub Pages дані не передаються власнику. Вони зберігаються локально для демонстрації сценарію.</p>
          </div>
        </div>
        <form class="request-form reveal" id="request-form" novalidate>
          <div class="request-form__head">
            <span class="technical-label">Нова заявка</span>
            <span id="request-account-hint">Без акаунта</span>
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
            <span>Погоджуюся на локальну обробку введених даних у цьому демо *</span>
          </label>
          <div class="form-status" id="request-status" aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">
            Зберегти демо-заявку
          </button>
        </form>
      </section>

      <section class="section faq-section" id="faq">
        <div class="faq-intro reveal">
          <p class="eyebrow"><span></span> FAQ / 06</p>
          <h2>Коротко про ціни,<br />розміри й акаунти.</h2>
          <p>Тільки те, що вже визначено прайсом і логікою прототипу.</p>
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
        <a href="#request">Заявка</a>
        <a href="#admin">Демо-адмінка</a>
      </div>
      <div class="footer-meta">
        <p>Контакти, умови доставки та строки потрібні від власника.</p>
        <span>© 2026 ToffiPacks · demo</span>
      </div>
    </footer>

    <section class="admin-page" id="admin-page" hidden aria-labelledby="admin-title">
      <header class="admin-header">
        <a class="brand" href="#top">
          <span class="brand__mark"><img src="./toffipacks-logo.webp" alt="" /></span>
          <span class="brand__copy"><strong>TOFFIPACKS</strong><small>локальна демо-адмінка</small></span>
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
        <div>
          <span class="product-card__number">№${product.number}</span>
          <span class="product-card__sku">${escapeHtml(product.sku)}</span>
        </div>
        <span class="material-dot" title="${escapeHtml(MATERIAL)}"></span>
      </div>
      <div class="product-card__visual">${boxDiagram(product, true)}</div>
      <h3>${dimensionText(product.dimensions)}</h3>
      <p>${escapeHtml(MATERIAL)}</p>
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
        ${product.id === selectedProductId ? 'Відкрити обрану коробку' : 'Детальніше й розрахувати'}
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
          <small>${escapeHtml(product.sku)}</small>
        </div>
        <div class="product-modal__drawing">${boxDiagram(product, true)}</div>
        <p>Внутрішній розмір · Д × Ш × В</p>
      </div>
      <div class="product-modal__content">
        <p class="eyebrow"><span></span> Коробка з прайса</p>
        <h2 id="product-dialog-title">${dimensionText(product.dimensions)}</h2>
        <p class="product-modal__material">${escapeHtml(MATERIAL)}</p>

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
          <button class="button button--primary" type="button" data-product-to-request>Перенести в заявку</button>
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
    const searchable = `${product.number} ${product.sku} ${product.name} ${dimensionText(product.dimensions)}`.toLocaleLowerCase('uk-UA');
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

  const summary = document.querySelector<HTMLDivElement>('#request-summary');
  if (summary) {
    summary.innerHTML = `
      <span class="technical-label">Поточний розрахунок</span>
      <strong>Коробка №${product.number}</strong>
      <p>${dimensionText(product.dimensions)} · ${selectedQuantity.toLocaleString('uk-UA')} шт.</p>
      <div><span>${tier}</span><b>${formatMoney(total)}</b></div>
    `;
  }
  document.querySelectorAll<HTMLButtonElement>('[data-quantity]').forEach((button) => {
    button.classList.toggle('is-active', Number(button.dataset.quantity) === selectedQuantity);
  });
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

function renderAccountButton(): void {
  const button = document.querySelector<HTMLAnchorElement>('#account-button');
  const account = currentAccount();
  if (!button) return;
  button.textContent = account ? account.name.split(' ')[0] : 'Кабінет';
  button.classList.toggle('is-signed-in', Boolean(account));

  const hint = document.querySelector<HTMLElement>('#request-account-hint');
  if (hint) hint.textContent = account ? `${account.name}${account.partner ? ' · партнер' : ''}` : 'Без акаунта';

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
            <span>Ваші умови</span>
            <strong>${account.partner ? `Базова ціна + ${account.fixedMarkup.toFixed(2)} грн` : 'Публічний тариф'}</strong>
            <p>${account.partner ? 'Фіксована ціна застосовується автоматично в каталозі та калькуляторі.' : 'Менеджер може активувати персональну ціну для постійного клієнта.'}</p>
          </div>
        </section>

        <div class="account-kpis">
          <article><span>Усі заявки</span><strong>${accountOrders.length}</strong><small>у цьому браузері</small></article>
          <article><span>Активні</span><strong>${activeOrders}</strong><small>потребують уваги</small></article>
          <article><span>Сума заявок</span><strong>${formatMoney(orderTotal)}</strong><small>демонстраційний підсумок</small></article>
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
                      .map(
                        (order) => `
                          <article class="account-order">
                            <div class="account-order__main">
                              <span>${escapeHtml(order.id)}</span>
                              <strong>Коробка №${escapeHtml(order.productNumber)}</strong>
                              <small>${dimensionText(order.dimensions)} · ${order.quantity.toLocaleString('uk-UA')} шт.</small>
                            </div>
                            <div class="account-order__price"><strong>${formatMoney(order.total)}</strong><small>${formatMoney(order.unitPrice)} / шт.</small></div>
                            <div class="account-order__meta"><span>${escapeHtml(order.status)}</span><time datetime="${order.createdAt}">${new Date(order.createdAt).toLocaleDateString('uk-UA')}</time></div>
                          </article>
                        `,
                      )
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
              <a class="button button--gold button--wide" href="#calculator">Змінити розрахунок</a>
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
        <div class="demo-access">
          <strong>Демо-доступ</strong>
          <p>Клієнт: +380671112233 / client123</p>
          <p>Адмін: +380000000001 / admin123</p>
        </div>
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
    setFormStatus(form, adminOnly ? 'Потрібен демо-акаунт адміністратора.' : 'Невірний телефон або пароль.', 'error');
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
  form.classList.add('was-validated');
  if (!form.reportValidity()) {
    if (status) {
      status.className = 'form-status is-error';
      status.textContent = 'Перевірте обов’язкові поля та згоду.';
    }
    return;
  }

  const formData = new FormData(form);
  const product = selectedProduct();
  const account = currentAccount();
  const calculatedUnit = unitPrice(product, selectedQuantity, account);
  const order: Order = {
    id: `TP-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    customerName: String(formData.get('name') ?? '').trim(),
    phone: normalizePhone(String(formData.get('phone') ?? '')),
    company: String(formData.get('company') ?? '').trim(),
    comment: String(formData.get('comment') ?? '').trim(),
    productId: product.id,
    productNumber: product.number,
    dimensions: product.dimensions,
    quantity: selectedQuantity,
    unitPrice: calculatedUnit,
    total: calculatedUnit * selectedQuantity,
    priceType: priceTypeLabel(selectedQuantity, account),
    accountId: account?.id,
    status: 'Нова',
  };
  const storedOrders = orders();
  storedOrders.push(order);
  writeStorage(STORAGE.orders, storedOrders);

  if (status) {
    status.className = 'form-status is-success';
    status.innerHTML = `<strong>Заявку ${order.id} збережено локально.</strong><span>Вона вже доступна у демо-адмінці цього браузера.</span>`;
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
        <p class="eyebrow"><span></span> Захищений демо-розділ</p>
        <h1 id="admin-title">Вхід для менеджера.</h1>
        <p>У реальному продукті тут потрібні серверна авторизація, права доступу та база даних.</p>
        <form id="admin-login-form" class="auth-form" novalidate>
          <label class="field"><span>Телефон</span><input class="input" name="phone" type="tel" value="+380000000001" required /></label>
          <label class="field"><span>Пароль</span><input class="input" name="password" type="password" value="admin123" required /></label>
          <div class="form-status" data-auth-status aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">Увійти в демо-адмінку</button>
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
          <p class="eyebrow"><span></span> Локальна демо-адмінка</p>
          <h1 id="admin-title">Заявки та клієнти.</h1>
        </div>
        <div>
          <span>${escapeHtml(account.phone)}</span>
          <button class="text-link" id="admin-logout" type="button">Вийти</button>
        </div>
      </div>
      <div class="admin-warning">
        Це демонстрація в localStorage. Заявки з інших браузерів і пристроїв сюди не потрапляють.
      </div>
      <div class="admin-stats">
        <article><span>Усі заявки</span><strong>${storedOrders.length}</strong></article>
        <article><span>Активні</span><strong>${openOrders}</strong></article>
        <article><span>Клієнти</span><strong>${clients.length}</strong></article>
        <article><span>Сума демо-заявок</span><strong>${formatMoney(total)}</strong></article>
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
                          <div><span>Коробка</span><strong>№${escapeHtml(order.productNumber)}</strong><small>${dimensionText(order.dimensions)}</small></div>
                          <div><span>Тираж</span><strong>${order.quantity.toLocaleString('uk-UA')} шт.</strong><small>${escapeHtml(order.priceType)}</small></div>
                          <div><span>Сума</span><strong>${formatMoney(order.total)}</strong><small>${formatMoney(order.unitPrice)} / шт.</small></div>
                        </div>
                        ${order.company || order.comment ? `<p class="order-card__comment">${escapeHtml(order.company)}${order.company && order.comment ? ' · ' : ''}${escapeHtml(order.comment)}</p>` : ''}
                        <time datetime="${order.createdAt}">${new Date(order.createdAt).toLocaleString('uk-UA')}</time>
                      </article>
                    `,
                  )
                  .join('')
              : '<div class="empty-state"><h3>Заявок ще немає.</h3><p>Створіть тестову заявку на головній сторінці.</p></div>'
          }
        </div>
      </section>
      <section class="admin-section">
        <div class="admin-section__head"><h2>Клієнти й фіксовані ціни</h2><span>Максимум +0,99 грн до базової</span></div>
        <div class="clients-table">
          <div class="clients-table__head"><span>Клієнт</span><span>Статус</span><span>Фіксована націнка</span></div>
          ${clients
            .map(
              (client) => `
                <div class="client-row">
                  <div><strong>${escapeHtml(client.name)}</strong><span>${escapeHtml(client.company || 'Без компанії')}</span><a href="tel:${escapeHtml(client.phone)}">${escapeHtml(client.phone)}</a></div>
                  <label class="partner-toggle"><input type="checkbox" data-partner-toggle="${client.id}"${client.partner ? ' checked' : ''} /><span>${client.partner ? 'Постійний' : 'Новий'}</span></label>
                  <label class="markup-control"><input class="input" type="number" min="0" max="0.99" step="0.01" value="${client.fixedMarkup.toFixed(2)}" data-partner-markup="${client.id}"${client.partner ? '' : ' disabled'} /><span>грн</span></label>
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

document.querySelector<HTMLSelectElement>('#catalog-sort')?.addEventListener('change', (event) => {
  catalogSort = (event.currentTarget as HTMLSelectElement).value as CatalogSort;
  queueCatalogRender();
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

  if (target.closest('[data-product-to-request]')) {
    document.querySelector<HTMLDialogElement>('#product-dialog')?.close();
    activeProductDialogId = null;
    window.location.hash = 'request';
    document.querySelector('#request')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
