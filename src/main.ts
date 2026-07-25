import './styles.css';
import './redesign.css';
import {
  demoDisclaimer,
  faqItems,
  formatMoney,
  products,
  purposes,
  unitPrice,
  type BoxType,
  type Dimensions,
  type Material,
  type Product,
  type Purpose,
} from './data';

interface CatalogState {
  search: string;
  purpose: Purpose | '';
  type: BoxType | '';
  material: Material | '';
  inStock: boolean;
  brandable: boolean;
  postal: boolean;
  dimensions: Dimensions | null;
  sort: 'recommended' | 'price-asc' | 'price-desc' | 'size';
  loading: boolean;
}

interface WizardState {
  step: number;
  purpose: Purpose | '';
  dimensions: Dimensions;
  weight: number;
  structure: BoxType | '';
  material: Material | '';
  color: string;
  branding: 'none' | 'sticker' | 'print' | '';
  quantity: number;
  urgency: string;
}

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Root element #app was not found.');
}

const catalogState: CatalogState = {
  search: '',
  purpose: '',
  type: '',
  material: '',
  inStock: false,
  brandable: false,
  postal: false,
  dimensions: null,
  sort: 'recommended',
  loading: true,
};

const wizardState: WizardState = {
  step: 0,
  purpose: '',
  dimensions: { length: 180, width: 120, height: 60 },
  weight: 0.4,
  structure: '',
  material: '',
  color: 'Крафт',
  branding: '',
  quantity: 50,
  urgency: 'Стандартний',
};

let catalogTimer = 0;
let productView: 'assembled' | 'net' = 'assembled';
let productQuantity = 10;
let productHasLogo = false;
let brandingMode: 'plain' | 'logo' = 'plain';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function dimensionsText(dimensions: Dimensions): string {
  return `${dimensions.length} × ${dimensions.width} × ${dimensions.height} мм`;
}

function createBoxDiagram(
  dimensions: Dimensions,
  options: { logo?: boolean; objectLabel?: string; id?: string } = {},
): string {
  const longest = Math.max(dimensions.length, dimensions.width, dimensions.height, 1);
  const length = clamp(150 + (dimensions.length / longest) * 100, 165, 270);
  const depth = clamp(48 + (dimensions.width / longest) * 72, 54, 120);
  const height = clamp(58 + (dimensions.height / longest) * 70, 62, 128);
  const x = 82;
  const y = 120;
  const ox = depth * 0.62;
  const oy = depth * 0.38;
  const logoClass = options.logo ? ' has-logo' : '';
  const label = options.objectLabel ?? 'предмет';

  return `
    <svg class="box-diagram${logoClass}" data-diagram-id="${options.id ?? ''}" viewBox="0 0 540 350" role="img" aria-label="Схема коробки з внутрішніми розмірами ${dimensionsText(dimensions)}">
      <title>Коробка ${dimensionsText(dimensions)}</title>
      <desc>Технічна схема коробки з підписами довжини, ширини та висоти.</desc>
      <polygon class="box-face box-top" points="${x},${y} ${x + ox},${y - oy} ${x + length + ox},${y - oy} ${x + length},${y}" />
      <polygon class="box-face" points="${x + length},${y} ${x + length + ox},${y - oy} ${x + length + ox},${y + height - oy} ${x + length},${y + height}" />
      <rect class="box-face" x="${x}" y="${y}" width="${length}" height="${height}" />
      <rect class="object" x="${x + length * 0.18}" y="${y + height * 0.28}" width="${length * 0.64}" height="${height * 0.5}" rx="2" />
      <text x="${x + length / 2}" y="${y + height * 0.59}" text-anchor="middle">${label}</text>
      <g class="logo-print" transform="translate(${x + length / 2 - 28} ${y + height * 0.58 - 12})">
        <rect width="56" height="24" fill="#1c1e1b" />
        <text x="28" y="16" fill="#f3f3ed" text-anchor="middle" style="fill:#f3f3ed;font-size:10px">ВАШ ЛОГО</text>
      </g>
      <path class="measure" d="M ${x} ${y + height + 36} V ${y + height + 24} M ${x} ${y + height + 30} H ${x + length} M ${x + length} ${y + height + 36} V ${y + height + 24}" />
      <g class="dimension-badge" transform="translate(${x + length / 2} ${y + height + 55})">
        <rect x="-34" y="-12" width="68" height="24" rx="12" />
        <text y="4" text-anchor="middle">${dimensions.length} мм</text>
      </g>
      <path class="measure" d="M ${x - 26} ${y} H ${x - 14} M ${x - 20} ${y} V ${y + height} M ${x - 26} ${y + height} H ${x - 14}" />
      <g class="dimension-badge" transform="translate(${x - 54} ${y + height / 2})">
        <rect x="-26" y="-12" width="52" height="24" rx="12" />
        <text y="4" text-anchor="middle">${dimensions.height} мм</text>
      </g>
      <path class="measure measure--width" d="M ${x + length + ox} ${y - oy - 4} V ${y - oy - 28}" />
      <g class="dimension-badge dimension-badge--width" transform="translate(${x + length + ox} ${y - oy - 42})">
        <rect x="-34" y="-12" width="68" height="24" rx="12" />
        <text y="4" text-anchor="middle">${dimensions.width} мм</text>
      </g>
    </svg>`;
}

function createProductVisual(product: Product, view: 'assembled' | 'net' = 'assembled', logo = false): string {
  const tone = `tone-${product.colorTone}`;
  if (view === 'net') {
    return `
      <svg class="product-svg" viewBox="0 0 420 300" role="img" aria-label="Розгортка коробки ${product.shortName}">
        <title>Технічна розгортка ${product.shortName}</title>
        <g transform="translate(42 35)">
          <rect class="face ${tone}" x="94" y="57" width="145" height="96" />
          <rect class="face ${tone}" x="94" y="8" width="145" height="49" />
          <rect class="face ${tone}" x="94" y="153" width="145" height="49" />
          <rect class="face ${tone}" x="34" y="57" width="60" height="96" />
          <rect class="face ${tone}" x="239" y="57" width="60" height="96" />
          <path class="measure" stroke-dasharray="5 4" d="M94 57H239M94 153H239M94 57V153M239 57V153" />
          <text x="166" y="110" text-anchor="middle">${product.sku}</text>
          ${logo ? '<rect x="141" y="119" width="52" height="18" fill="#1c1e1b"/><text x="167" y="132" text-anchor="middle" style="fill:#f3f3ed;font-size:8px">ВАШ ЛОГО</text>' : ''}
        </g>
      </svg>`;
  }

  return `
    <svg class="product-svg" viewBox="0 0 420 300" role="img" aria-label="Зібрана коробка ${product.shortName}">
      <title>Коробка ${product.shortName}</title>
      <g transform="translate(38 30)">
        <polygon class="face fold-flap ${tone}" points="58,82 132,39 329,39 255,82" />
        <polygon class="face ${tone}" points="255,82 329,39 329,155 255,201" />
        <polygon class="face ${tone}" points="58,82 255,82 255,201 58,201" />
        ${logo ? '<rect x="128" y="126" width="62" height="25" fill="#1c1e1b"/><text x="159" y="142" text-anchor="middle" style="fill:#f3f3ed;font-size:8px">ВАШ ЛОГО</text>' : `<text x="157" y="146" text-anchor="middle">${product.sku}</text>`}
        <path class="measure" d="M58 224V211M58 218H255M255 224V211" />
        <text x="156" y="244" text-anchor="middle">${product.inner.length} мм</text>
      </g>
    </svg>`;
}

function renderHeader(): string {
  return `
    <div class="demo-strip" role="note">Демо-прототип · ціни, наявність і строки не є офертою</div>
    <header class="site-header">
      <div class="shell header-row">
        <a class="brand" href="#top" aria-label="Box Lab, на головну">
          <span class="brand-mark" aria-hidden="true">□</span>
          <span>Box Lab</span>
        </a>
        <nav class="main-nav" id="main-nav" aria-label="Головна навігація">
          <a href="#catalog">Каталог</a>
          <a href="#constructor">Конструктор</a>
          <a href="#branding">Брендування</a>
          <a href="#business">Для бізнесу</a>
          <a href="#delivery">Доставка</a>
          <a href="#faq">FAQ</a>
          <a class="button button--accent header-cta" href="#request">Запросити розрахунок</a>
        </nav>
        <button class="icon-button menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Відкрити меню">
          <span aria-hidden="true">☰</span>
        </button>
      </div>
    </header>`;
}

function renderHero(): string {
  const dimensions = { length: 180, width: 120, height: 60 };
  return `
    <main id="main">
      <section class="hero" id="top">
        <div class="shell">
          <div class="hero-intro">
            <div>
              <p class="eyebrow">Лабораторія пакування / 01</p>
              <h1>Коробка точно під ваш продукт.</h1>
            </div>
            <div class="hero-copy">
              <p>Введіть розміри предмета — сервіс покаже готові варіанти й чесно порахує демо-ціну.</p>
              <div class="hero-actions">
                <a class="button button--accent" href="#fit-form">Підібрати за розміром <span aria-hidden="true">↓</span></a>
                <a class="button" href="#constructor">Створити свою</a>
              </div>
            </div>
          </div>
          <div class="fit-lab">
            <form class="fit-controls" id="fit-form">
              <span class="technical-label">Fit check / внутрішній розмір</span>
              <h2>Підберімо розмір</h2>
              <p class="microcopy">Розміри предмета, а не старої коробки. Для підбору можна повертати предмет усередині.</p>
              <div class="field">
                <label for="hero-purpose">Предмет</label>
                <select class="select" id="hero-purpose" name="purpose">
                  ${purposes.map((item) => `<option value="${item.name}">${item.name} — ${item.note}</option>`).join('')}
                </select>
              </div>
              <div class="dimensions-grid" aria-label="Розміри предмета у міліметрах">
                <div class="field dimension-field">
                  <label for="hero-length">Довжина</label>
                  <input class="input" id="hero-length" name="length" type="number" min="10" max="1200" value="${dimensions.length}" required inputmode="numeric" />
                </div>
                <div class="field dimension-field">
                  <label for="hero-width">Ширина</label>
                  <input class="input" id="hero-width" name="width" type="number" min="10" max="1200" value="${dimensions.width}" required inputmode="numeric" />
                </div>
                <div class="field dimension-field">
                  <label for="hero-height">Висота</label>
                  <input class="input" id="hero-height" name="height" type="number" min="10" max="1200" value="${dimensions.height}" required inputmode="numeric" />
                </div>
              </div>
              <p class="microcopy">Внутрішній розмір — стільки місця буде у товару. Додамо технологічний запас у конструкторі.</p>
              <button class="button button--accent fit-submit" type="submit">Знайти коробку <span aria-hidden="true">→</span></button>
            </form>
            <div class="fit-visual" id="hero-visual">
              ${createBoxDiagram(dimensions, { objectLabel: 'ваш предмет', id: 'hero' })}
              <div class="air-note" id="air-note">Рекомендуємо запас 5 мм з кожного боку.</div>
            </div>
          </div>
        </div>
      </section>`;
}

function renderPurposes(): string {
  const scenarios = [
    { structure: 'Самозбірна', dimensions: { length: 320, width: 240, height: 80 }, result: 'Плаский одяг, комплекти та аксесуари.' },
    { structure: 'Кришка-дно', dimensions: { length: 340, width: 220, height: 120 }, result: 'Пара взуття з місцем для паперу.' },
    { structure: 'Шухляда', dimensions: { length: 180, width: 120, height: 70 }, result: 'Набори, баночки та невеликі флакони.' },
    { structure: 'Кришка-дно', dimensions: { length: 260, width: 260, height: 140 }, result: 'Сухі продукти, випічка та набори.' },
    { structure: 'Кришка-дно', dimensions: { length: 240, width: 170, height: 80 }, result: 'Подарунковий набір із презентаційною подачею.' },
    { structure: 'Самозбірна', dimensions: { length: 220, width: 160, height: 80 }, result: 'Невеликі пристрої з місцем для захисту.' },
    { structure: 'Поштова', dimensions: { length: 300, width: 210, height: 100 }, result: 'Відправлення перевізником без зайвої обгортки.' },
    { structure: 'Підбір за розміром', dimensions: { length: 240, width: 170, height: 80 }, result: 'Введіть габарити — підберемо найближчий формат.' },
  ];

  return `
    <section class="section section--purpose" aria-labelledby="purpose-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">За предметом / 02</p>
            <h2 id="purpose-title">Оберіть, що пакуєте.</h2>
          </div>
          <p>Спочатку оберіть сценарій. Праворуч з’явиться орієнтовна конструкція, а каталог уже буде відфільтровано.</p>
        </div>
        <div class="purpose-lab">
          <div class="purpose-grid" role="group" aria-label="Сценарії пакування">
            ${purposes
              .map((item, index) => {
                const scenario = scenarios[index];
                return `
                  <button
                    class="purpose-card"
                    type="button"
                    data-purpose="${item.name}"
                    data-index="${String(index + 1).padStart(2, '0')}"
                    data-length="${scenario.dimensions.length}"
                    data-width="${scenario.dimensions.width}"
                    data-height="${scenario.dimensions.height}"
                    data-structure="${scenario.structure}"
                    data-result="${scenario.result}"
                    aria-pressed="false"
                  >
                    <span class="purpose-card__number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
                    <span class="purpose-card__copy">
                      <strong>${item.name}</strong>
                      <small>${item.note}</small>
                    </span>
                    <span class="purpose-card__action" aria-hidden="true">Обрати</span>
                  </button>`;
              })
              .join('')}
          </div>
          <aside class="purpose-preview" id="purpose-preview" aria-live="polite">
            <div class="purpose-preview__top">
              <span>LIVE / СЦЕНАРІЙ</span>
              <span id="purpose-preview-counter">— / 08</span>
            </div>
            <div class="purpose-preview__canvas" id="purpose-preview-canvas">
              ${createBoxDiagram({ length: 240, width: 170, height: 80 }, { objectLabel: 'ваш предмет', id: 'purpose' })}
            </div>
            <div class="purpose-preview__info">
              <span class="technical-label" id="purpose-preview-structure">Орієнтовна конструкція</span>
              <h3 id="purpose-preview-title">Оберіть предмет</h3>
              <p id="purpose-preview-note">Покажемо демо-формат коробки та підготуємо каталог до перегляду.</p>
              <button class="button purpose-preview__cta" id="purpose-preview-cta" type="button" disabled>
                Спочатку оберіть сценарій
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>`;
}

function renderCatalogSection(): string {
  const types: BoxType[] = ['Самозбірна', 'Кришка-дно', 'Шухляда', 'Поштова'];
  const materials: Material[] = ['Мікрогофрокартон', 'Картон 350 г/м²', 'Крафт-картон'];
  return `
    <section class="section" id="catalog" aria-labelledby="catalog-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">Демо-каталог / 03</p>
            <h2 id="catalog-title">Готові розміри, які легко порівняти.</h2>
          </div>
          <p>Асортимент, ціни й строки — демонстраційні дані. Підбір і ступенева ціна працюють як у майбутньому сервісі.</p>
        </div>
        <div class="catalog-layout">
          <aside class="catalog-filters" aria-label="Фільтри каталогу">
            <h3>Фільтри</h3>
            <div class="field filter-full">
              <label for="filter-purpose">Що пакуємо</label>
              <select class="select" id="filter-purpose">
                <option value="">Усі задачі</option>
                ${purposes.map((item) => `<option value="${item.name}">${item.name}</option>`).join('')}
              </select>
            </div>
            <div class="field filter-full">
              <label for="filter-type">Тип коробки</label>
              <select class="select" id="filter-type">
                <option value="">Усі типи</option>
                ${types.map((item) => `<option value="${item}">${item}</option>`).join('')}
              </select>
            </div>
            <div class="field filter-full">
              <label for="filter-material">Матеріал</label>
              <select class="select" id="filter-material">
                <option value="">Усі матеріали</option>
                ${materials.map((item) => `<option value="${item}">${item}</option>`).join('')}
              </select>
            </div>
            <label class="check"><input id="filter-stock" type="checkbox" /> <span>Є в наявності</span></label>
            <label class="check"><input id="filter-brandable" type="checkbox" /> <span>Можна брендувати</span></label>
            <label class="check"><input id="filter-postal" type="checkbox" /> <span>Для поштової відправки</span></label>
            <div id="active-size-filter"></div>
            <button class="button button--ghost" id="reset-filters" type="button">Скинути фільтри</button>
          </aside>
          <div class="catalog-main">
            <div class="catalog-toolbar">
              <div class="search-wrap">
                <span class="search-icon" aria-hidden="true">⌕</span>
                <label class="sr-only" for="catalog-search">Пошук у каталозі</label>
                <input class="input" id="catalog-search" type="search" placeholder="Назва, артикул або призначення" autocomplete="off" />
              </div>
              <div class="field">
                <label class="sr-only" for="catalog-sort">Сортування</label>
                <select class="select" id="catalog-sort">
                  <option value="recommended">Рекомендовані</option>
                  <option value="price-asc">Спочатку дешевші</option>
                  <option value="price-desc">Спочатку дорожчі</option>
                  <option value="size">За об’ємом</option>
                </select>
              </div>
            </div>
            <div class="results-meta"><span id="results-count" aria-live="polite">Завантажуємо демо-товари…</span><span class="tag tag--accent">demo data</span></div>
            <div id="catalog-results" aria-busy="true"></div>
          </div>
        </div>
      </div>
    </section>`;
}

function renderWizardSection(): string {
  return `
    <section class="section section--ink" id="constructor" aria-labelledby="constructor-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">Box builder / 04</p>
            <h2 id="constructor-title">Власна коробка — крок за кроком.</h2>
          </div>
          <p>Шість коротких кроків. Можна повертатися назад — введені дані залишаться на місці.</p>
        </div>
        <div class="wizard-shell">
          <div class="wizard-main" id="wizard-main"></div>
          <div class="wizard-visual" id="wizard-visual">
            ${createBoxDiagram(wizardState.dimensions, { objectLabel: 'ваш продукт', id: 'wizard' })}
          </div>
        </div>
      </div>
    </section>`;
}

function renderBranding(): string {
  return `
    <section class="section" id="branding" aria-labelledby="branding-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">Брендування / 05</p>
            <h2 id="branding-title">Пакування, яке працює на бренд.</h2>
          </div>
          <p>Перемикач показує функціональну різницю: друк з’являється на коробці, а демо-ціна змінюється прозоро.</p>
        </div>
        <div class="branding-lab">
          <div class="branding-copy">
            <span class="technical-label">Demo branding options</span>
            <h3>Додайте бренд тоді, коли готові.</h3>
            <p class="muted">Не обіцяємо технологію до перевірки макета. У прототипі показані три типові сценарії.</p>
            <ul>
              <li>Без брендування — базова коробка</li>
              <li>Наклейка — від +3 грн / шт. у демо</li>
              <li>Одноколірний друк — від +5 грн / шт. у демо</li>
            </ul>
            <a class="button" href="#request">Надіслати макет</a>
          </div>
          <div class="branding-stage" id="branding-stage">
            <div class="segmented" role="group" aria-label="Показати коробку без або з логотипом">
              <button class="segment" type="button" data-brand-mode="plain" aria-pressed="true">Без логотипа</button>
              <button class="segment" type="button" data-brand-mode="logo" aria-pressed="false">З логотипом</button>
            </div>
            <div id="branding-visual">${createBoxDiagram({ length: 240, width: 170, height: 80 }, { id: 'branding' })}</div>
            <div class="branding-price"><span id="branding-caption">Чиста коробка</span><strong id="branding-cost">Базова ціна</strong></div>
          </div>
        </div>
      </div>
    </section>`;
}

function renderBusiness(): string {
  return `
    <section class="section section--accent" id="business" aria-labelledby="business-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">Для бізнесу / 06</p>
            <h2 id="business-title">Почніть із малого тиражу.</h2>
          </div>
          <p>Сервіс запам’ятовує параметри локально в браузері. Реальний кабінет і повтор замовлення — наступний етап після підтвердження процесів.</p>
        </div>
        <div class="business-grid">
          <article class="business-item">
            <span class="business-item__num">01 / Зразки</span>
            <h3>Спочатку перевірте.</h3>
            <p>Запросіть демо-набір популярних розмірів і матеріалів перед великим тиражем.</p>
          </article>
          <article class="business-item">
            <span class="business-item__num">02 / Свій розмір</span>
            <h3>Менше повітря.</h3>
            <p>Підженемо внутрішній розмір під продукт і покажемо орієнтир ціни до заявки.</p>
          </article>
          <article class="business-item">
            <span class="business-item__num">03 / Повтор</span>
            <h3>Ті самі параметри.</h3>
            <p>Збережіть розрахунок локально. Після запуску його можна перетворити на шаблон повторного замовлення.</p>
          </article>
        </div>
        <div class="process-line" aria-label="Етапи роботи">
          <div class="process-step"><strong>Задача</strong><small>Предмет, розмір, тираж</small></div>
          <div class="process-step"><strong>Зразок</strong><small>Матеріал і тест посадки</small></div>
          <div class="process-step"><strong>Виробництво</strong><small>Після підтвердження макета</small></div>
          <div class="process-step"><strong>Доставка</strong><small>За реальними умовами власника</small></div>
        </div>
      </div>
    </section>`;
}

function renderDelivery(): string {
  return `
    <section class="section" id="delivery" aria-labelledby="delivery-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">Логістика / 07</p>
            <h2 id="delivery-title">Зрозумілі умови без прихованих кроків.</h2>
          </div>
          <p>Прототип не приймає гроші та не надсилає замовлення. Нижче — структура, яку треба заповнити реальними умовами.</p>
        </div>
        <div class="delivery-grid">
          <article class="delivery-item">
            <span class="delivery-item__num">01 / Доставка</span>
            <h3>Україна</h3>
            <p>Перевізники, міста відправки, строки й тариф потребують підтвердження власника.</p>
          </article>
          <article class="delivery-item">
            <span class="delivery-item__num">02 / Оплата</span>
            <h3>Після узгодження</h3>
            <p>У демо є лише запит розрахунку. Рахунок, передоплата та документи не імітуються.</p>
          </article>
          <article class="delivery-item">
            <span class="delivery-item__num">03 / Повернення</span>
            <h3>Різні правила</h3>
            <p>Для готових і персоналізованих коробок мають діяти окремі реальні умови повернення.</p>
          </article>
        </div>
      </div>
    </section>`;
}

function renderFaq(): string {
  return `
    <section class="section" id="faq" aria-labelledby="faq-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">FAQ / 08</p>
            <h2 id="faq-title">Все важливе перед замовленням.</h2>
          </div>
          <p>Технічні слова пояснюємо поруч із вибором. Невідомі бізнес-умови не маскуємо вигаданими обіцянками.</p>
          <div class="faq-meta" aria-label="Коротко про розділ">
            <span>06 відповідей</span>
            <span>≈ 2 хв читання</span>
          </div>
        </div>
        <div class="faq-list">
          ${faqItems
            .map(
              (item, index) => `
                <details class="faq-item" ${index === 0 ? 'open' : ''}>
                  <summary>${item.q}</summary>
                  <p>${item.a}</p>
                </details>`,
            )
            .join('')}
        </div>
      </div>
    </section>`;
}

function renderContact(): string {
  return `
    <section class="section section--ink" id="request" aria-labelledby="request-title">
      <div class="shell contact-layout">
        <div class="contact-copy">
          <p class="eyebrow">Запит / 09</p>
          <h2 id="request-title">Покажіть продукт — ми підберемо коробку.</h2>
          <p>Опишіть продукт і тираж. Форма перевіряє дані, але нічого не відправляє на сервер — це безпечна локальна демонстрація.</p>
          <div class="contact-points" aria-label="Контактні дані">
            <span><strong>Email:</strong> потрібен від власника</span>
            <span><strong>Телефон:</strong> потрібен від власника</span>
            <span><strong>Місто виробництва:</strong> потрібне від власника</span>
          </div>
        </div>
        <form class="quote-form" id="quote-form" novalidate>
          <h3>Запросити розрахунок</h3>
          <p class="muted">Відповідь не надсилається. Успіх форми показує лише стан прототипу.</p>
          <div class="form-grid">
            <div class="field">
              <label for="quote-name">Ім’я *</label>
              <input class="input" id="quote-name" name="name" autocomplete="name" aria-describedby="quote-name-error" />
              <p class="field-error" id="quote-name-error"></p>
            </div>
            <div class="field">
              <label for="quote-contact">Телефон або email *</label>
              <input class="input" id="quote-contact" name="contact" autocomplete="email" aria-describedby="quote-contact-error" />
              <p class="field-error" id="quote-contact-error"></p>
            </div>
            <div class="field field--full">
              <label for="quote-company">Компанія</label>
              <input class="input" id="quote-company" name="company" autocomplete="organization" />
              <p class="field-error"></p>
            </div>
            <div class="field field--full">
              <label for="quote-message">Що пакуємо, розмір і тираж *</label>
              <textarea class="textarea" id="quote-message" name="message" aria-describedby="quote-message-error" placeholder="Наприклад: свічка 90 × 90 × 110 мм, 100 штук, потрібна наклейка"></textarea>
              <p class="field-error" id="quote-message-error"></p>
            </div>
            <div class="field field--full">
              <label for="quote-logo">Макет логотипа, якщо є</label>
              <input class="input" id="quote-logo" name="logo" type="file" accept=".svg,.pdf,.png,.jpg,.jpeg" aria-describedby="file-note" />
              <span class="file-note" id="file-note">SVG, PDF, PNG або JPG. Файл залишається у вашому браузері.</span>
            </div>
            <div class="field field--full">
              <label class="check"><input id="quote-consent" name="consent" type="checkbox" aria-describedby="quote-consent-error" /> <span>Погоджуюся на локальну обробку введених даних у цьому демо *</span></label>
              <p class="field-error" id="quote-consent-error"></p>
            </div>
          </div>
          <div class="form-status" id="form-status" role="status" aria-live="polite"></div>
          <button class="button button--accent" id="quote-submit" type="submit">Перевірити запит</button>
        </form>
      </div>
    </section>
    </main>`;
}

function renderFooter(): string {
  return `
    <footer class="site-footer">
      <div class="shell footer-row">
        <a class="brand" href="#top"><span class="brand-mark" aria-hidden="true">□</span><span>Box Lab</span></a>
        <p>${demoDisclaimer} © 2026 Box Lab prototype.</p>
      </div>
    </footer>
    <dialog class="product-dialog" id="product-dialog" aria-labelledby="product-dialog-title"></dialog>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}

app.innerHTML = [
  renderHeader(),
  renderHero(),
  renderPurposes(),
  renderCatalogSection(),
  renderWizardSection(),
  renderBranding(),
  renderBusiness(),
  renderDelivery(),
  renderFaq(),
  renderContact(),
  renderFooter(),
].join('');

function closeCustomSelect(wrapper: HTMLElement, returnFocus = false): void {
  const trigger = wrapper.querySelector<HTMLButtonElement>('.select-trigger');
  const menu = wrapper.querySelector<HTMLElement>('.select-menu');
  wrapper.classList.remove('is-open');
  trigger?.setAttribute('aria-expanded', 'false');
  if (menu) {
    if (menu.matches(':popover-open')) menu.hidePopover();
    menu.hidden = true;
  }
  if (returnFocus) trigger?.focus();
}

function positionCustomSelectMenu(trigger: HTMLButtonElement, menu: HTMLElement): void {
  if (!menu.matches(':popover-open')) return;
  const rect = trigger.getBoundingClientRect();
  const gap = 8;
  const availableBelow = window.innerHeight - rect.bottom - gap;
  const availableAbove = rect.top - gap;
  const desiredHeight = Math.min(menu.scrollHeight, 288);
  const openAbove = availableBelow < Math.min(desiredHeight, 190) && availableAbove > availableBelow;
  const available = Math.max(120, openAbove ? availableAbove : availableBelow);

  const menuWidth = Math.min(rect.width, window.innerWidth - 16);
  const menuLeft = Math.min(Math.max(8, rect.left), Math.max(8, window.innerWidth - menuWidth - 8));
  menu.style.left = `${menuLeft}px`;
  menu.style.width = `${menuWidth}px`;
  menu.style.maxHeight = `${Math.min(288, available)}px`;
  menu.style.top = openAbove ? 'auto' : `${rect.bottom + gap}px`;
  menu.style.bottom = openAbove ? `${window.innerHeight - rect.top + gap}px` : 'auto';
}

function syncCustomSelect(select: HTMLSelectElement): void {
  const wrapper = select.closest<HTMLElement>('.custom-select');
  if (!wrapper) return;
  const selectedOption = select.options[select.selectedIndex];
  const value = selectedOption?.textContent?.trim() || 'Оберіть варіант';
  const valueNode = wrapper.querySelector<HTMLElement>('.select-trigger__value');
  if (valueNode) valueNode.textContent = value;
  wrapper.querySelectorAll<HTMLElement>('.select-option').forEach((option) => {
    const selected = option.dataset.value === select.value;
    option.classList.toggle('is-selected', selected);
    option.setAttribute('aria-selected', String(selected));
  });
}

function enhanceSelects(root: ParentNode = document): void {
  root.querySelectorAll<HTMLSelectElement>('select.select:not([data-enhanced])').forEach((select) => {
    select.dataset.enhanced = 'true';
    select.classList.add('select-native');
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');

    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select';
    select.parentNode?.insertBefore(wrapper, select);
    wrapper.append(select);

    const trigger = document.createElement('button');
    trigger.className = 'select-trigger';
    trigger.type = 'button';
    trigger.id = `${select.id || `select-${Math.random().toString(36).slice(2)}`}-trigger`;
    trigger.setAttribute('role', 'combobox');
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = '<span class="select-trigger__value"></span><span class="select-trigger__chevron" aria-hidden="true"></span>';

    const label = select.id ? document.querySelector<HTMLLabelElement>(`label[for="${select.id}"]`) : null;
    if (label) {
      label.htmlFor = trigger.id;
      if (!label.id) label.id = `${trigger.id}-label`;
      trigger.setAttribute('aria-labelledby', label.id);
    } else {
      trigger.setAttribute('aria-label', select.getAttribute('aria-label') || 'Оберіть варіант');
    }

    const menu = document.createElement('div');
    menu.className = 'select-menu';
    menu.id = `${trigger.id}-listbox`;
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('popover', 'manual');
    menu.hidden = true;
    trigger.setAttribute('aria-controls', menu.id);

    Array.from(select.options).forEach((nativeOption) => {
      const option = document.createElement('button');
      option.className = 'select-option';
      option.type = 'button';
      option.tabIndex = -1;
      option.dataset.value = nativeOption.value;
      option.setAttribute('role', 'option');
      option.textContent = nativeOption.textContent;
      option.addEventListener('click', () => {
        select.value = nativeOption.value;
        syncCustomSelect(select);
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
        closeCustomSelect(wrapper, true);
      });
      option.addEventListener('keydown', (event) => {
        const options = Array.from(menu.querySelectorAll<HTMLButtonElement>('.select-option'));
        const current = options.indexOf(option);
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          const direction = event.key === 'ArrowDown' ? 1 : -1;
          options[(current + direction + options.length) % options.length]?.focus();
        }
        if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          options[event.key === 'Home' ? 0 : options.length - 1]?.focus();
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          closeCustomSelect(wrapper, true);
        }
        if (event.key === 'Tab') closeCustomSelect(wrapper);
      });
      menu.append(option);
    });

    wrapper.append(trigger, menu);
    syncCustomSelect(select);
    select.addEventListener('change', () => syncCustomSelect(select));

    trigger.addEventListener('click', () => {
      const shouldOpen = !wrapper.classList.contains('is-open');
      document.querySelectorAll<HTMLElement>('.custom-select.is-open').forEach((item) => closeCustomSelect(item));
      if (!shouldOpen) return;
      wrapper.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      menu.hidden = false;
      menu.showPopover();
      positionCustomSelectMenu(trigger, menu);
    });
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && wrapper.classList.contains('is-open')) {
        event.preventDefault();
        closeCustomSelect(wrapper, true);
        return;
      }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      if (!wrapper.classList.contains('is-open')) trigger.click();
      const options = Array.from(menu.querySelectorAll<HTMLButtonElement>('.select-option'));
      const selectedIndex = Math.max(0, select.selectedIndex);
      const targetIndex = event.key === 'End' ? options.length - 1 : event.key === 'Home' ? 0 : selectedIndex;
      options[targetIndex]?.focus();
    });
  });
}

function enhanceRanges(root: ParentNode = document): void {
  root.querySelectorAll<HTMLInputElement>('input.range').forEach((range) => {
    const update = () => {
      const min = Number(range.min) || 0;
      const max = Number(range.max) || 100;
      const value = Number(range.value);
      const progress = ((value - min) / Math.max(1, max - min)) * 100;
      range.style.setProperty('--range-progress', `${progress}%`);
    };
    update();
    if (range.dataset.rangeEnhanced === 'true') return;
    range.dataset.rangeEnhanced = 'true';
    range.addEventListener('input', update);
  });
}

document.addEventListener('pointerdown', (event) => {
  const target = event.target as Node;
  document.querySelectorAll<HTMLElement>('.custom-select.is-open').forEach((wrapper) => {
    if (!wrapper.contains(target)) closeCustomSelect(wrapper);
  });
});

window.addEventListener('resize', () => {
  document.querySelectorAll<HTMLElement>('.custom-select.is-open').forEach((wrapper) => closeCustomSelect(wrapper));
});

window.addEventListener('scroll', (event) => {
  if (event.target instanceof Element && event.target.closest('.select-menu')) return;
  document.querySelectorAll<HTMLElement>('.custom-select.is-open').forEach((wrapper) => closeCustomSelect(wrapper));
}, true);

function getHeroDimensions(): Dimensions {
  return {
    length: Number(document.querySelector<HTMLInputElement>('#hero-length')?.value) || 0,
    width: Number(document.querySelector<HTMLInputElement>('#hero-width')?.value) || 0,
    height: Number(document.querySelector<HTMLInputElement>('#hero-height')?.value) || 0,
  };
}

function updateHeroDiagram(): void {
  const dimensions = getHeroDimensions();
  const visual = document.querySelector<HTMLDivElement>('#hero-visual');
  if (!visual || Object.values(dimensions).some((value) => value <= 0)) return;
  const purpose = document.querySelector<HTMLSelectElement>('#hero-purpose')?.value.toLowerCase() ?? 'предмет';
  const oldDiagram = visual.querySelector('.box-diagram');
  oldDiagram?.remove();
  visual.insertAdjacentHTML('afterbegin', createBoxDiagram(dimensions, { objectLabel: purpose, id: 'hero' }));
  const volumeLiters = (dimensions.length * dimensions.width * dimensions.height) / 1_000_000;
  const note = document.querySelector<HTMLDivElement>('#air-note');
  if (note) {
    note.textContent = `Об’єм: ${volumeLiters.toFixed(1)} л · рекомендуємо запас 5 мм.`;
  }
}

function productVolume(product: Product): number {
  return product.inner.length * product.inner.width * product.inner.height;
}

function fitsDimensions(product: Product, target: Dimensions): boolean {
  const productSides = [product.inner.length, product.inner.width, product.inner.height].sort((a, b) => a - b);
  const targetSides = [target.length, target.width, target.height].sort((a, b) => a - b);
  return targetSides.every((side, index) => side <= productSides[index]);
}

function filteredProducts(): Product[] {
  const query = catalogState.search.trim().toLocaleLowerCase('uk-UA');
  const result = products.filter((product) => {
    const haystack = [product.name, product.sku, product.description, product.type, product.material, ...product.purposes]
      .join(' ')
      .toLocaleLowerCase('uk-UA');
    return (
      (!query || haystack.includes(query)) &&
      (!catalogState.purpose || product.purposes.includes(catalogState.purpose)) &&
      (!catalogState.type || product.type === catalogState.type) &&
      (!catalogState.material || product.material === catalogState.material) &&
      (!catalogState.inStock || product.inStock) &&
      (!catalogState.brandable || product.brandable) &&
      (!catalogState.postal || product.postal) &&
      (!catalogState.dimensions || fitsDimensions(product, catalogState.dimensions))
    );
  });

  if (catalogState.sort === 'price-asc') return result.sort((a, b) => a.basePrice - b.basePrice);
  if (catalogState.sort === 'price-desc') return result.sort((a, b) => b.basePrice - a.basePrice);
  if (catalogState.sort === 'size') return result.sort((a, b) => productVolume(a) - productVolume(b));
  if (catalogState.dimensions) return result.sort((a, b) => productVolume(a) - productVolume(b));
  return result;
}

function renderSkeletons(): string {
  return `<div class="skeleton-grid" aria-label="Завантаження товарів">
    ${Array.from({ length: 6 }, () => `
      <div class="skeleton-card" aria-hidden="true">
        <div class="skeleton skeleton--visual"></div>
        <div class="skeleton skeleton--line"></div>
        <div class="skeleton skeleton--line short"></div>
      </div>`).join('')}
  </div>`;
}

function renderProductCard(product: Product): string {
  return `
    <button class="product-card" type="button" data-product-id="${product.id}" aria-label="Відкрити картку ${product.name}">
      <span class="product-card__visual">
        ${createProductVisual(product)}
      </span>
      <span class="product-card__body">
        <span class="product-card__topline">
          <span class="technical-label">${product.sku}</span>
          <span class="tag tag--accent">demo</span>
        </span>
        <h3>${product.shortName}</h3>
        <span class="mono">Внутрішній: ${dimensionsText(product.inner)}</span>
        <span class="product-card__use">${product.purposes.slice(0, 3).join(' · ')}</span>
        <span class="product-card__foot">
          <span><span class="price">від ${formatMoney(unitPrice(product.basePrice, 500))}</span><br /><small>/ шт. при 500</small></span>
          <span><strong>мін. ${product.minOrder}</strong><br /><small>${product.inStock ? 'є в наявності' : 'під замовлення'}</small></span>
        </span>
      </span>
    </button>`;
}

function updateActiveSizeFilter(): void {
  const container = document.querySelector<HTMLDivElement>('#active-size-filter');
  if (!container) return;
  container.innerHTML = catalogState.dimensions
    ? `<div class="active-size"><strong>Розмір предмета</strong><br />${dimensionsText(catalogState.dimensions)}<br /><button type="button" id="clear-size-filter">Прибрати розмір</button></div>`
    : '';
  document.querySelector<HTMLButtonElement>('#clear-size-filter')?.addEventListener('click', () => {
    catalogState.dimensions = null;
    scheduleCatalogRender();
  });
}

function renderCatalog(): void {
  const results = document.querySelector<HTMLDivElement>('#catalog-results');
  const count = document.querySelector<HTMLSpanElement>('#results-count');
  if (!results || !count) return;
  updateActiveSizeFilter();

  if (catalogState.loading) {
    results.setAttribute('aria-busy', 'true');
    results.innerHTML = renderSkeletons();
    count.textContent = 'Завантажуємо демо-товари…';
    return;
  }

  results.setAttribute('aria-busy', 'false');
  if (catalogState.search.trim().toLocaleLowerCase('uk-UA') === 'помилка') {
    count.textContent = 'Каталог тимчасово недоступний';
    results.innerHTML = `
      <div class="error-state" role="alert">
        <div><div class="empty-box" aria-hidden="true"></div><h3>Не вдалося завантажити каталог.</h3><p class="muted">Це демонстраційний стан помилки. Дані не втрачено.</p><button class="button" id="catalog-retry" type="button">Спробувати ще раз</button></div>
      </div>`;
    document.querySelector<HTMLButtonElement>('#catalog-retry')?.addEventListener('click', () => {
      catalogState.search = '';
      const search = document.querySelector<HTMLInputElement>('#catalog-search');
      if (search) search.value = '';
      scheduleCatalogRender();
    });
    return;
  }

  const items = filteredProducts();
  count.textContent = `${items.length} ${items.length === 1 ? 'коробка' : items.length < 5 ? 'коробки' : 'коробок'} знайдено`;
  if (!items.length) {
    results.innerHTML = `
      <div class="empty-state">
        <div><div class="empty-box" aria-hidden="true"></div><h3>Готового розміру немає.</h3><p class="muted">Змініть фільтри або створіть коробку під ваш продукт.</p><a class="button button--accent" href="#constructor">Створити свій розмір</a></div>
      </div>`;
    return;
  }
  results.innerHTML = `<div class="product-grid">${items.map(renderProductCard).join('')}</div>`;
  results.querySelectorAll<HTMLButtonElement>('[data-product-id]').forEach((button) => {
    button.addEventListener('click', () => openProduct(button.dataset.productId ?? ''));
  });
}

function scheduleCatalogRender(delay = 320): void {
  window.clearTimeout(catalogTimer);
  catalogState.loading = true;
  renderCatalog();
  catalogTimer = window.setTimeout(() => {
    catalogState.loading = false;
    renderCatalog();
  }, delay);
}

function openProduct(productId: string): void {
  const product = products.find((item) => item.id === productId);
  const dialog = document.querySelector<HTMLDialogElement>('#product-dialog');
  if (!product || !dialog) return;
  productView = 'assembled';
  productQuantity = product.minOrder;
  productHasLogo = false;
  renderProductDialog(product);
  dialog.showModal();
  document.body.classList.add('dialog-open');
}

function renderProductDialog(product: Product): void {
  const dialog = document.querySelector<HTMLDialogElement>('#product-dialog');
  if (!dialog) return;
  const currentUnit = unitPrice(product.basePrice + (productHasLogo ? 3 : 0), productQuantity);
  dialog.innerHTML = `
    <button class="icon-button dialog-close" id="dialog-close" type="button" aria-label="Закрити картку">×</button>
    <article class="product-detail">
      <div class="product-detail__visual" id="detail-visual">
        ${createProductVisual(product, productView, productHasLogo)}
        <div class="detail-tabs" role="group" aria-label="Вигляд коробки">
          <button class="detail-tab" type="button" data-detail-view="assembled" aria-pressed="${productView === 'assembled'}">Зібрана</button>
          <button class="detail-tab" type="button" data-detail-view="net" aria-pressed="${productView === 'net'}">Розгортка</button>
        </div>
      </div>
      <div class="product-detail__content">
        <span class="tag tag--accent">demo data</span>
        <h2 id="product-dialog-title">${product.shortName}</h2>
        <p>${product.description}</p>
        <div class="detail-measures">
          <div><span class="technical-label">Внутрішній</span><strong>${dimensionsText(product.inner)}</strong></div>
          <div><span class="technical-label">Зовнішній</span><strong>${dimensionsText(product.outer)}</strong></div>
          <div><span class="technical-label">Матеріал</span><strong>${product.material}</strong></div>
          <div><span class="technical-label">Відправка</span><strong>${product.shippingDays}</strong></div>
        </div>
        <div class="field">
          <label for="detail-color">Колір</label>
          <select class="select" id="detail-color">${product.colors.map((color) => `<option>${color}</option>`).join('')}</select>
        </div>
        ${product.brandable ? `<label class="check" style="margin-top:1rem"><input id="detail-logo" type="checkbox" ${productHasLogo ? 'checked' : ''} /> <span>Додати демо-наклейку (+3 грн / шт. до знижки)</span></label>` : '<p class="muted" style="margin-top:1rem">Брендування цієї демо-моделі недоступне.</p>'}
        <div class="detail-price">
          <div><span class="technical-label">Разом, орієнтовно</span><strong class="detail-price__total" id="detail-total">${formatMoney(currentUnit * productQuantity)}</strong></div>
          <div><strong id="detail-unit">${formatMoney(currentUnit)} / шт.</strong><br /><small class="muted">мін. ${product.minOrder} шт.</small></div>
        </div>
        <div class="field">
          <label for="detail-quantity">Кількість: <strong id="detail-quantity-value">${productQuantity} шт.</strong></label>
          <input class="range" id="detail-quantity" type="range" min="${product.minOrder}" max="500" step="${product.minOrder >= 25 ? 25 : 10}" value="${productQuantity}" />
        </div>
        <div class="tier-row" aria-label="Демо-ціна за тиражами">
          ${[10, 50, 100, 500].map((quantity) => `<div><strong>${quantity}+</strong><small>${formatMoney(unitPrice(product.basePrice, quantity))}/шт.</small></div>`).join('')}
        </div>
        <p class="muted"><small>Демо-правило: 50+ −10%, 100+ −18%, 500+ −28%. Ціна стане точною після перевірки матеріалу й макета.</small></p>
        <a class="button button--accent" href="#request" id="detail-request">Запросити цей розрахунок</a>
      </div>
    </article>`;

  enhanceSelects(dialog);
  enhanceRanges(dialog);
  document.querySelector<HTMLButtonElement>('#dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.querySelectorAll<HTMLButtonElement>('[data-detail-view]').forEach((button) => {
    button.addEventListener('click', () => {
      productView = button.dataset.detailView === 'net' ? 'net' : 'assembled';
      renderProductDialog(product);
    });
  });
  document.querySelector<HTMLInputElement>('#detail-logo')?.addEventListener('change', (event) => {
    productHasLogo = (event.currentTarget as HTMLInputElement).checked;
    renderProductDialog(product);
  });
  document.querySelector<HTMLInputElement>('#detail-quantity')?.addEventListener('input', (event) => {
    productQuantity = Number((event.currentTarget as HTMLInputElement).value);
    updateProductPrice(product);
  });
  document.querySelector<HTMLAnchorElement>('#detail-request')?.addEventListener('click', () => {
    const message = document.querySelector<HTMLTextAreaElement>('#quote-message');
    if (message) message.value = `${product.name}, ${productQuantity} шт.${productHasLogo ? ', з логотипом' : ''}.`;
    dialog.close();
  });
}

function updateProductPrice(product: Product): void {
  const withLogo = product.basePrice + (productHasLogo ? 3 : 0);
  const currentUnit = unitPrice(withLogo, productQuantity);
  const quantityValue = document.querySelector<HTMLElement>('#detail-quantity-value');
  const total = document.querySelector<HTMLElement>('#detail-total');
  const unit = document.querySelector<HTMLElement>('#detail-unit');
  if (quantityValue) quantityValue.textContent = `${productQuantity} шт.`;
  if (total) total.textContent = formatMoney(currentUnit * productQuantity);
  if (unit) unit.textContent = `${formatMoney(currentUnit)} / шт.`;
}

function wizardProgress(): string {
  const labels = ['Предмет', 'Розмір', 'Тип', 'Матеріал', 'Бренд', 'Тираж'];
  return `<ol class="wizard-progress" aria-label="Прогрес конструктора">
    ${labels.map((label, index) => `<li class="${index === wizardState.step ? 'is-active' : index < wizardState.step ? 'is-complete' : ''}"><span>0${index + 1} ${label}</span></li>`).join('')}
  </ol>`;
}

function choiceButton(field: string, value: string, selected: boolean, note = '', label = value): string {
  return `<button class="choice" type="button" data-wizard-field="${field}" data-wizard-value="${value}" aria-pressed="${selected}"><strong>${label}</strong>${note ? `<small>${note}</small>` : ''}</button>`;
}

function wizardStepMarkup(): string {
  if (wizardState.step === 0) {
    return `<div class="wizard-step"><span class="technical-label">Крок 01 / 06</span><h3>Що буде всередині?</h3><p>Ми використаємо відповідь для рекомендації конструкції.</p><div class="choice-grid">${purposes.map((item) => choiceButton('purpose', item.name, wizardState.purpose === item.name, item.note)).join('')}</div></div>`;
  }
  if (wizardState.step === 1) {
    return `<div class="wizard-step"><span class="technical-label">Крок 02 / 06</span><h3>Внутрішній розмір.</h3><p>Додайте розміри самого предмета. На схемі вони змінюються одразу.</p><div class="wizard-form-grid">
      <div class="field"><label for="wizard-length">Довжина, мм</label><input class="input" id="wizard-length" data-wizard-input="length" type="number" min="10" max="1200" value="${wizardState.dimensions.length}" /></div>
      <div class="field"><label for="wizard-width">Ширина, мм</label><input class="input" id="wizard-width" data-wizard-input="width" type="number" min="10" max="1200" value="${wizardState.dimensions.width}" /></div>
      <div class="field"><label for="wizard-height">Висота, мм</label><input class="input" id="wizard-height" data-wizard-input="height" type="number" min="10" max="1200" value="${wizardState.dimensions.height}" /></div>
      <div class="field"><label for="wizard-weight">Вага предмета, кг</label><input class="input" id="wizard-weight" data-wizard-input="weight" type="number" min="0.05" max="30" step="0.05" value="${wizardState.weight}" /></div>
    </div></div>`;
  }
  if (wizardState.step === 2) {
    return `<div class="wizard-step"><span class="technical-label">Крок 03 / 06</span><h3>Як коробка відкривається?</h3><p>Замість технічних кодів — три зрозумілі сценарії.</p><div class="choice-grid">
      ${choiceButton('structure', 'Поштова', wizardState.structure === 'Поштова', 'Закривається клапаном, зручна для доставки')}
      ${choiceButton('structure', 'Кришка-дно', wizardState.structure === 'Кришка-дно', 'Презентаційна коробка з окремою кришкою')}
      ${choiceButton('structure', 'Шухляда', wizardState.structure === 'Шухляда', 'Висувний лоток для невеликих продуктів')}
      ${choiceButton('structure', 'Самозбірна', wizardState.structure === 'Самозбірна', 'Пласка при зберіганні, збирається без клею')}
    </div></div>`;
  }
  if (wizardState.step === 3) {
    return `<div class="wizard-step"><span class="technical-label">Крок 04 / 06</span><h3>Матеріал і колір.</h3><p>Пояснюємо матеріал через задачу, а не лише щільність.</p><div class="choice-grid">
      ${choiceButton('material', 'Мікрогофрокартон', wizardState.material === 'Мікрогофрокартон', 'Міцний для доставки та ваги')}
      ${choiceButton('material', 'Картон 350 г/м²', wizardState.material === 'Картон 350 г/м²', 'Гладкий для чистої поліграфії')}
      ${choiceButton('material', 'Крафт-картон', wizardState.material === 'Крафт-картон', 'Теплий природний колір, без еко-кліше')}
    </div><div class="wizard-form-grid"><div class="field field--full"><label for="wizard-color">Колір</label><select class="select" id="wizard-color" data-wizard-input="color"><option ${wizardState.color === 'Крафт' ? 'selected' : ''}>Крафт</option><option ${wizardState.color === 'Білий' ? 'selected' : ''}>Білий</option><option ${wizardState.color === 'Графіт' ? 'selected' : ''}>Графіт</option></select></div></div></div>`;
  }
  if (wizardState.step === 4) {
    return `<div class="wizard-step"><span class="technical-label">Крок 05 / 06</span><h3>Брендувати коробку?</h3><p>Ціна стане точною після перевірки макета. Поки показуємо зрозумілу демо-надбавку.</p><div class="choice-grid">
      ${choiceButton('branding', 'none', wizardState.branding === 'none', '+0 грн / шт.', 'Без брендування')}
      ${choiceButton('branding', 'sticker', wizardState.branding === 'sticker', '+3 грн / шт. у демо', 'Наклейка')}
      ${choiceButton('branding', 'print', wizardState.branding === 'print', '+5 грн / шт. у демо', 'Одноколірний друк')}
    </div></div>`;
  }
  if (wizardState.step === 5) {
    return `<div class="wizard-step"><span class="technical-label">Крок 06 / 06</span><h3>Кількість і строк.</h3><p>Більший тираж знижує демо-ціну однієї коробки за тим самим правилом, що й у каталозі.</p><div class="wizard-form-grid">
      <div class="field field--full"><label for="wizard-quantity">Кількість: <strong id="wizard-quantity-value">${wizardState.quantity} шт.</strong></label><input class="range" id="wizard-quantity" data-wizard-input="quantity" type="range" min="10" max="500" step="10" value="${wizardState.quantity}" /></div>
      <div class="field field--full"><label for="wizard-urgency">Бажаний строк</label><select class="select" id="wizard-urgency" data-wizard-input="urgency"><option ${wizardState.urgency === 'Стандартний' ? 'selected' : ''}>Стандартний</option><option ${wizardState.urgency === 'Потрібно швидко' ? 'selected' : ''}>Потрібно швидко</option><option ${wizardState.urgency === 'Гнучкий' ? 'selected' : ''}>Гнучкий</option></select></div>
    </div><p class="muted" style="margin-top:1rem"><small>Демо-знижки: 50+ −10%, 100+ −18%, 500+ −28%.</small></p></div>`;
  }
  const quote = calculateWizardQuote();
  const brandingLabel = wizardState.branding === 'none' ? 'Без брендування' : wizardState.branding === 'sticker' ? 'Наклейка' : 'Одноколірний друк';
  return `<div class="wizard-step"><span class="technical-label">Результат / орієнтовно</span><h3>Коробка зібрана.</h3><div class="summary-list">
    <div><span>Призначення</span><strong>${wizardState.purpose}</strong></div>
    <div><span>Внутрішній розмір</span><strong>${dimensionsText(wizardState.dimensions)}</strong></div>
    <div><span>Конструкція</span><strong>${wizardState.structure}</strong></div>
    <div><span>Матеріал / колір</span><strong>${wizardState.material} / ${wizardState.color}</strong></div>
    <div><span>Брендування</span><strong>${brandingLabel}</strong></div>
    <div><span>Тираж</span><strong>${wizardState.quantity} шт.</strong></div>
  </div><div class="summary-total">≈ ${formatMoney(quote.total)}</div><p>${formatMoney(quote.unit)} / шт. · демо-розрахунок, не оферта.</p><div class="hero-actions"><button class="button button--light" id="save-calculation" type="button">Зберегти локально</button><button class="button button--accent" id="wizard-request" type="button">Надіслати заявку</button></div></div>`;
}

function calculateWizardQuote(): { unit: number; total: number } {
  const volume = wizardState.dimensions.length * wizardState.dimensions.width * wizardState.dimensions.height;
  const volumePrice = 12 + volume / 130_000;
  const materialMultiplier = wizardState.material === 'Мікрогофрокартон' ? 1.08 : wizardState.material === 'Картон 350 г/м²' ? 1 : 1.04;
  const structureMultiplier = wizardState.structure === 'Кришка-дно' || wizardState.structure === 'Шухляда' ? 1.18 : 1;
  const brandAdd = wizardState.branding === 'sticker' ? 3 : wizardState.branding === 'print' ? 5 : 0;
  const unit = unitPrice((volumePrice * materialMultiplier * structureMultiplier) + brandAdd, wizardState.quantity);
  return { unit, total: Math.round(unit * wizardState.quantity) };
}

function updateWizardDiagram(): void {
  const visual = document.querySelector<HTMLDivElement>('#wizard-visual');
  if (!visual) return;
  const savedNote = visual.querySelector('.saved-note')?.outerHTML ?? '';
  visual.innerHTML = `${createBoxDiagram(wizardState.dimensions, { logo: wizardState.branding === 'sticker' || wizardState.branding === 'print', objectLabel: wizardState.purpose ? wizardState.purpose.toLowerCase() : 'ваш продукт', id: 'wizard' })}${savedNote}`;
}

function validateWizardStep(): string {
  if (wizardState.step === 0 && !wizardState.purpose) return 'Оберіть, що буде всередині.';
  if (wizardState.step === 1) {
    if (Object.values(wizardState.dimensions).some((value) => value < 10 || value > 1200)) return 'Вкажіть усі розміри від 10 до 1200 мм.';
    if (wizardState.weight <= 0 || wizardState.weight > 30) return 'Вкажіть вагу від 0,05 до 30 кг.';
  }
  if (wizardState.step === 2 && !wizardState.structure) return 'Оберіть конструкцію коробки.';
  if (wizardState.step === 3 && !wizardState.material) return 'Оберіть матеріал.';
  if (wizardState.step === 4 && !wizardState.branding) return 'Оберіть варіант брендування.';
  if (wizardState.step === 5 && wizardState.quantity < 10) return 'Мінімальний демо-тираж — 10 штук.';
  return '';
}

function renderWizard(): void {
  const main = document.querySelector<HTMLDivElement>('#wizard-main');
  if (!main) return;
  const isSummary = wizardState.step === 6;
  main.innerHTML = `${wizardProgress()}${wizardStepMarkup()}<p class="wizard-error" id="wizard-error" role="alert"></p>${isSummary ? '' : `<div class="wizard-actions">${wizardState.step > 0 ? '<button class="button button--light" data-wizard-back type="button">← Назад</button>' : '<span></span>'}<button class="button button--accent" data-wizard-next type="button">${wizardState.step === 5 ? 'Показати розрахунок' : 'Далі →'}</button></div>`}`;
  updateWizardDiagram();
  enhanceSelects(main);
  enhanceRanges(main);

  main.querySelectorAll<HTMLButtonElement>('[data-wizard-field]').forEach((button) => {
    button.addEventListener('click', () => {
      const field = button.dataset.wizardField;
      const value = button.dataset.wizardValue ?? '';
      if (field === 'purpose') wizardState.purpose = value as Purpose;
      if (field === 'structure') wizardState.structure = value as BoxType;
      if (field === 'material') wizardState.material = value as Material;
      if (field === 'branding') wizardState.branding = value as WizardState['branding'];
      renderWizard();
    });
  });
  main.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-wizard-input]').forEach((input) => {
    input.addEventListener('input', () => {
      const field = input.dataset.wizardInput;
      if (field === 'length' || field === 'width' || field === 'height') {
        wizardState.dimensions[field] = Number(input.value);
        updateWizardDiagram();
      }
      if (field === 'weight') wizardState.weight = Number(input.value);
      if (field === 'quantity') {
        wizardState.quantity = Number(input.value);
        const output = document.querySelector<HTMLElement>('#wizard-quantity-value');
        if (output) output.textContent = `${wizardState.quantity} шт.`;
      }
      if (field === 'color') wizardState.color = input.value;
      if (field === 'urgency') wizardState.urgency = input.value;
    });
  });
  main.querySelector<HTMLButtonElement>('[data-wizard-next]')?.addEventListener('click', () => {
    const error = validateWizardStep();
    const errorNode = document.querySelector<HTMLParagraphElement>('#wizard-error');
    if (error) {
      if (errorNode) errorNode.textContent = error;
      return;
    }
    wizardState.step = Math.min(wizardState.step + 1, 6);
    renderWizard();
  });
  main.querySelector<HTMLButtonElement>('[data-wizard-back]')?.addEventListener('click', () => {
    wizardState.step = Math.max(wizardState.step - 1, 0);
    renderWizard();
  });
  document.querySelector<HTMLButtonElement>('#save-calculation')?.addEventListener('click', saveCalculation);
  document.querySelector<HTMLButtonElement>('#wizard-request')?.addEventListener('click', sendWizardToForm);
}

function saveCalculation(): void {
  try {
    localStorage.setItem('box-lab-calculation', JSON.stringify({ ...wizardState, savedAt: new Date().toISOString() }));
    const visual = document.querySelector<HTMLDivElement>('#wizard-visual');
    if (visual) visual.insertAdjacentHTML('beforeend', '<div class="saved-note">Розрахунок збережено локально на цьому пристрої ✓</div>');
    showToast('Розрахунок збережено в localStorage. Сервер не використовується.');
  } catch {
    showToast('Браузер заблокував локальне збереження. Дані конструктора залишились на сторінці.');
  }
}

function sendWizardToForm(): void {
  const message = document.querySelector<HTMLTextAreaElement>('#quote-message');
  if (message) {
    const branding = wizardState.branding === 'none' ? 'без брендування' : wizardState.branding === 'sticker' ? 'наклейка' : 'одноколірний друк';
    message.value = `${wizardState.purpose}: ${dimensionsText(wizardState.dimensions)}, ${wizardState.structure}, ${wizardState.material}, ${branding}, ${wizardState.quantity} шт.`;
  }
  document.querySelector('#request')?.scrollIntoView({ behavior: 'smooth' });
  window.setTimeout(() => document.querySelector<HTMLInputElement>('#quote-name')?.focus(), 450);
}

function updateBranding(): void {
  const stage = document.querySelector<HTMLDivElement>('#branding-stage');
  const visual = document.querySelector<HTMLDivElement>('#branding-visual');
  const caption = document.querySelector<HTMLElement>('#branding-caption');
  const cost = document.querySelector<HTMLElement>('#branding-cost');
  if (!stage || !visual || !caption || !cost) return;
  stage.classList.toggle('is-branded', brandingMode === 'logo');
  visual.innerHTML = createBoxDiagram({ length: 240, width: 170, height: 80 }, { logo: brandingMode === 'logo', id: 'branding' });
  caption.textContent = brandingMode === 'logo' ? 'Одноколірний демо-друк' : 'Чиста коробка';
  cost.textContent = brandingMode === 'logo' ? '+5 грн / шт. у демо' : 'Базова ціна';
  document.querySelectorAll<HTMLButtonElement>('[data-brand-mode]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.brandMode === brandingMode));
  });
}

function fieldError(input: HTMLInputElement | HTMLTextAreaElement, message: string): void {
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  const error = document.querySelector<HTMLElement>(`#${input.id}-error`);
  if (error) error.textContent = message;
}

function validateQuoteForm(form: HTMLFormElement): boolean {
  const name = form.elements.namedItem('name') as HTMLInputElement;
  const contact = form.elements.namedItem('contact') as HTMLInputElement;
  const message = form.elements.namedItem('message') as HTMLTextAreaElement;
  const consent = form.elements.namedItem('consent') as HTMLInputElement;
  const contactLooksValid = /@/.test(contact.value) || /\d[\d\s()+-]{7,}/.test(contact.value);
  fieldError(name, name.value.trim().length >= 2 ? '' : 'Вкажіть ім’я — щонайменше 2 символи.');
  fieldError(contact, contactLooksValid ? '' : 'Вкажіть коректний email або телефон.');
  fieldError(message, message.value.trim().length >= 10 ? '' : 'Опишіть продукт, розмір або бажаний тираж.');
  consent.setAttribute('aria-invalid', consent.checked ? 'false' : 'true');
  const consentError = document.querySelector<HTMLElement>('#quote-consent-error');
  if (consentError) consentError.textContent = consent.checked ? '' : 'Потрібна згода для демонстрації форми.';
  const firstInvalid = form.querySelector<HTMLInputElement | HTMLTextAreaElement>('[aria-invalid="true"]');
  firstInvalid?.focus();
  return !firstInvalid;
}

function setFormStatus(type: 'success' | 'error' | '', message: string): void {
  const status = document.querySelector<HTMLDivElement>('#form-status');
  if (!status) return;
  status.className = `form-status${type ? ` is-visible form-status--${type}` : ''}`;
  status.textContent = message;
}

function showToast(message: string): void {
  const toast = document.querySelector<HTMLDivElement>('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

function bindGlobalEvents(): void {
  const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const nav = document.querySelector<HTMLElement>('#main-nav');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Відкрити меню' : 'Закрити меню');
    nav?.classList.toggle('is-open', !open);
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll<HTMLInputElement>('#hero-length, #hero-width, #hero-height').forEach((input) => input.addEventListener('input', updateHeroDiagram));
  document.querySelector<HTMLSelectElement>('#hero-purpose')?.addEventListener('change', updateHeroDiagram);
  document.querySelector<HTMLFormElement>('#fit-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) return;
    catalogState.dimensions = getHeroDimensions();
    catalogState.purpose = (document.querySelector<HTMLSelectElement>('#hero-purpose')?.value ?? '') as Purpose;
    const filterPurpose = document.querySelector<HTMLSelectElement>('#filter-purpose');
    if (filterPurpose) {
      filterPurpose.value = catalogState.purpose;
      syncCustomSelect(filterPurpose);
    }
    scheduleCatalogRender(520);
    document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-purpose]').forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.purpose as Purpose;
      catalogState.purpose = selected;
      document.querySelectorAll<HTMLButtonElement>('[data-purpose]').forEach((item) => item.setAttribute('aria-pressed', String(item.dataset.purpose === catalogState.purpose)));
      const select = document.querySelector<HTMLSelectElement>('#filter-purpose');
      if (select) {
        select.value = catalogState.purpose;
        syncCustomSelect(select);
      }
      const dimensions = {
        length: Number(button.dataset.length),
        width: Number(button.dataset.width),
        height: Number(button.dataset.height),
      };
      const preview = document.querySelector<HTMLElement>('#purpose-preview');
      const canvas = document.querySelector<HTMLElement>('#purpose-preview-canvas');
      const counter = document.querySelector<HTMLElement>('#purpose-preview-counter');
      const structure = document.querySelector<HTMLElement>('#purpose-preview-structure');
      const title = document.querySelector<HTMLElement>('#purpose-preview-title');
      const note = document.querySelector<HTMLElement>('#purpose-preview-note');
      const cta = document.querySelector<HTMLButtonElement>('#purpose-preview-cta');
      if (preview) {
        preview.classList.remove('is-changing');
        void preview.offsetWidth;
        preview.classList.add('is-selected', 'is-changing');
      }
      if (canvas) canvas.innerHTML = createBoxDiagram(dimensions, { objectLabel: selected.toLowerCase(), id: 'purpose' });
      if (counter) counter.textContent = `${button.dataset.index} / 08`;
      if (structure) structure.textContent = button.dataset.structure ?? 'Орієнтовна конструкція';
      if (title) title.textContent = selected;
      if (note) note.textContent = button.dataset.result ?? '';
      if (cta) {
        cta.disabled = false;
        cta.textContent = `Показати коробки для «${selected.toLowerCase()}»`;
      }
      scheduleCatalogRender();
    });
  });

  document.querySelector<HTMLButtonElement>('#purpose-preview-cta')?.addEventListener('click', () => {
    document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' });
  });

  const purposeSection = document.querySelector<HTMLElement>('.section--purpose');
  if (purposeSection) {
    purposeSection.classList.add('has-purpose-motion');
    if ('IntersectionObserver' in window) {
      const purposeObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            purposeSection.classList.add('is-visible');
            observer.disconnect();
          });
        },
        { threshold: 0.16 },
      );
      purposeObserver.observe(purposeSection);
    } else {
      purposeSection.classList.add('is-visible');
    }
  }

  const search = document.querySelector<HTMLInputElement>('#catalog-search');
  search?.addEventListener('input', () => {
    catalogState.search = search.value;
    scheduleCatalogRender();
  });
  document.querySelector<HTMLSelectElement>('#filter-purpose')?.addEventListener('change', (event) => {
    catalogState.purpose = (event.currentTarget as HTMLSelectElement).value as Purpose | '';
    scheduleCatalogRender();
  });
  document.querySelector<HTMLSelectElement>('#filter-type')?.addEventListener('change', (event) => {
    catalogState.type = (event.currentTarget as HTMLSelectElement).value as BoxType | '';
    scheduleCatalogRender();
  });
  document.querySelector<HTMLSelectElement>('#filter-material')?.addEventListener('change', (event) => {
    catalogState.material = (event.currentTarget as HTMLSelectElement).value as Material | '';
    scheduleCatalogRender();
  });
  document.querySelector<HTMLInputElement>('#filter-stock')?.addEventListener('change', (event) => {
    catalogState.inStock = (event.currentTarget as HTMLInputElement).checked;
    scheduleCatalogRender();
  });
  document.querySelector<HTMLInputElement>('#filter-brandable')?.addEventListener('change', (event) => {
    catalogState.brandable = (event.currentTarget as HTMLInputElement).checked;
    scheduleCatalogRender();
  });
  document.querySelector<HTMLInputElement>('#filter-postal')?.addEventListener('change', (event) => {
    catalogState.postal = (event.currentTarget as HTMLInputElement).checked;
    scheduleCatalogRender();
  });
  document.querySelector<HTMLSelectElement>('#catalog-sort')?.addEventListener('change', (event) => {
    catalogState.sort = (event.currentTarget as HTMLSelectElement).value as CatalogState['sort'];
    scheduleCatalogRender();
  });
  document.querySelector<HTMLButtonElement>('#reset-filters')?.addEventListener('click', () => {
    Object.assign(catalogState, { search: '', purpose: '', type: '', material: '', inStock: false, brandable: false, postal: false, dimensions: null, sort: 'recommended' });
    const ids = ['catalog-search', 'filter-purpose', 'filter-type', 'filter-material', 'catalog-sort'];
    ids.forEach((id) => {
      const element = document.querySelector<HTMLInputElement | HTMLSelectElement>(`#${id}`);
      if (element) {
        element.value = id === 'catalog-sort' ? 'recommended' : '';
        if (element instanceof HTMLSelectElement) syncCustomSelect(element);
      }
    });
    ['filter-stock', 'filter-brandable', 'filter-postal'].forEach((id) => {
      const checkbox = document.querySelector<HTMLInputElement>(`#${id}`);
      if (checkbox) checkbox.checked = false;
    });
    document.querySelectorAll<HTMLButtonElement>('[data-purpose]').forEach((button) => button.setAttribute('aria-pressed', 'false'));
    scheduleCatalogRender();
  });

  document.querySelectorAll<HTMLButtonElement>('[data-brand-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      brandingMode = button.dataset.brandMode === 'logo' ? 'logo' : 'plain';
      updateBranding();
    });
  });

  const dialog = document.querySelector<HTMLDialogElement>('#product-dialog');
  dialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.querySelectorAll<HTMLDetailsElement>('.faq-item').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll<HTMLDetailsElement>('.faq-item[open]').forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  const quoteForm = document.querySelector<HTMLFormElement>('#quote-form');
  quoteForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateQuoteForm(quoteForm)) {
      setFormStatus('error', 'Перевірте виділені поля. Дані не відправлено.');
      return;
    }
    const submit = document.querySelector<HTMLButtonElement>('#quote-submit');
    if (submit) {
      submit.disabled = true;
      submit.innerHTML = '<span class="spinner" aria-hidden="true"></span> Перевіряємо локально…';
    }
    setFormStatus('', '');
    window.setTimeout(() => {
      const contact = quoteForm.elements.namedItem('contact') as HTMLInputElement;
      if (contact.value.toLowerCase().includes('error')) {
        setFormStatus('error', 'Демо-помилка: не вдалося підготувати локальну заявку. Змініть контакт і повторіть.');
      } else {
        setFormStatus('success', 'Запит перевірено. Дані залишилися у вашому браузері й нікуди не надсилалися.');
        quoteForm.querySelectorAll('[aria-invalid]').forEach((element) => element.setAttribute('aria-invalid', 'false'));
      }
      if (submit) {
        submit.disabled = false;
        submit.textContent = 'Перевірити запит';
      }
    }, 850);
  });
  quoteForm?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea').forEach((input) => {
    input.addEventListener('input', () => {
      if (document.querySelector('#form-status.form-status--success')) setFormStatus('', '');
      if (input.getAttribute('aria-invalid') === 'true') {
        input.setAttribute('aria-invalid', 'false');
        const error = document.querySelector<HTMLElement>(`#${input.id}-error`);
        if (error) error.textContent = '';
      }
    });
  });
}

bindGlobalEvents();
enhanceSelects();
enhanceRanges();
renderCatalog();
renderWizard();
updateBranding();
window.setTimeout(() => {
  catalogState.loading = false;
  renderCatalog();
}, 520);
