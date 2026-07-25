export type Purpose =
  | 'Одяг'
  | 'Взуття'
  | 'Косметика'
  | 'Їжа'
  | 'Подарунки'
  | 'Електроніка'
  | 'Пошта'
  | 'Інше';

export type BoxType = 'Самозбірна' | 'Кришка-дно' | 'Шухляда' | 'Поштова';
export type Material = 'Мікрогофрокартон' | 'Картон 350 г/м²' | 'Крафт-картон';

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  shortName: string;
  purposes: Purpose[];
  type: BoxType;
  inner: Dimensions;
  outer: Dimensions;
  material: Material;
  colors: string[];
  colorTone: 'sand' | 'white' | 'graphite' | 'lime';
  basePrice: number;
  minOrder: number;
  inStock: boolean;
  shippingDays: string;
  brandable: boolean;
  postal: boolean;
  description: string;
}

export const purposes: Array<{ name: Purpose; icon: string; note: string }> = [
  { name: 'Одяг', icon: '◫', note: 'футболки, білизна, аксесуари' },
  { name: 'Взуття', icon: '⌁', note: 'пари до 33 см' },
  { name: 'Косметика', icon: '◒', note: 'баночки, набори, свічки' },
  { name: 'Їжа', icon: '△', note: 'торти й сухі продукти' },
  { name: 'Подарунки', icon: '✦', note: 'набори та сувеніри' },
  { name: 'Електроніка', icon: '▣', note: 'невеликі пристрої' },
  { name: 'Пошта', icon: '→', note: 'відправлення перевізником' },
  { name: 'Інше', icon: '+', note: 'підберемо за розміром' },
];

export const products: Product[] = [
  {
    id: 'fit-mini',
    sku: 'BL–101',
    name: 'Fit Mini 160 × 110 × 40',
    shortName: 'Fit Mini',
    purposes: ['Косметика', 'Подарунки', 'Пошта'],
    type: 'Поштова',
    inner: { length: 160, width: 110, height: 40 },
    outer: { length: 168, width: 116, height: 44 },
    material: 'Мікрогофрокартон',
    colors: ['Білий', 'Крафт'],
    colorTone: 'white',
    basePrice: 14.8,
    minOrder: 10,
    inStock: true,
    shippingDays: '1–2 дні',
    brandable: true,
    postal: true,
    description: 'Компактна коробка для невеликих наборів, аксесуарів і косметики.',
  },
  {
    id: 'mailer-m',
    sku: 'BL–122',
    name: 'Mailer M 220 × 160 × 70',
    shortName: 'Mailer M',
    purposes: ['Одяг', 'Електроніка', 'Подарунки', 'Пошта'],
    type: 'Поштова',
    inner: { length: 220, width: 160, height: 70 },
    outer: { length: 230, width: 168, height: 76 },
    material: 'Мікрогофрокартон',
    colors: ['Крафт', 'Білий', 'Графіт'],
    colorTone: 'sand',
    basePrice: 20.9,
    minOrder: 10,
    inStock: true,
    shippingDays: '1–2 дні',
    brandable: true,
    postal: true,
    description: 'Універсальний формат для одягу, подарунків та безпечної доставки.',
  },
  {
    id: 'slide-100',
    sku: 'BL–205',
    name: 'Slide 100 × 75 × 35',
    shortName: 'Slide 100',
    purposes: ['Косметика', 'Подарунки'],
    type: 'Шухляда',
    inner: { length: 100, width: 75, height: 35 },
    outer: { length: 106, width: 81, height: 39 },
    material: 'Картон 350 г/м²',
    colors: ['Білий', 'Графіт'],
    colorTone: 'graphite',
    basePrice: 18.4,
    minOrder: 25,
    inStock: true,
    shippingDays: '2–3 дні',
    brandable: true,
    postal: false,
    description: 'Коробка-шухляда для свічок, прикрас і невеликих преміальних наборів.',
  },
  {
    id: 'shoe-330',
    sku: 'BL–330',
    name: 'Shoe 330 × 220 × 120',
    shortName: 'Shoe 330',
    purposes: ['Взуття', 'Пошта'],
    type: 'Кришка-дно',
    inner: { length: 330, width: 220, height: 120 },
    outer: { length: 342, width: 232, height: 128 },
    material: 'Мікрогофрокартон',
    colors: ['Крафт', 'Білий'],
    colorTone: 'sand',
    basePrice: 31.6,
    minOrder: 10,
    inStock: true,
    shippingDays: '1–3 дні',
    brandable: true,
    postal: true,
    description: 'Міцна коробка з окремою кришкою для взуття та об’ємних наборів.',
  },
  {
    id: 'cake-260',
    sku: 'BL–426',
    name: 'Cake 260 × 260 × 180',
    shortName: 'Cake 260',
    purposes: ['Їжа', 'Подарунки'],
    type: 'Самозбірна',
    inner: { length: 260, width: 260, height: 180 },
    outer: { length: 268, width: 268, height: 188 },
    material: 'Картон 350 г/м²',
    colors: ['Білий'],
    colorTone: 'white',
    basePrice: 36.5,
    minOrder: 10,
    inStock: false,
    shippingDays: '5–7 днів',
    brandable: true,
    postal: false,
    description: 'Висока коробка з харчового картону для тортів і кондитерських наборів.',
  },
  {
    id: 'gift-180',
    sku: 'BL–518',
    name: 'Gift 180 × 180 × 90',
    shortName: 'Gift 180',
    purposes: ['Косметика', 'Подарунки'],
    type: 'Кришка-дно',
    inner: { length: 180, width: 180, height: 90 },
    outer: { length: 190, width: 190, height: 98 },
    material: 'Крафт-картон',
    colors: ['Крафт', 'Графіт'],
    colorTone: 'lime',
    basePrice: 27.2,
    minOrder: 25,
    inStock: true,
    shippingDays: '2–3 дні',
    brandable: true,
    postal: false,
    description: 'Квадратний формат для подарункових, косметичних і гастронаборів.',
  },
  {
    id: 'safe-300',
    sku: 'BL–630',
    name: 'Safe 300 × 200 × 100',
    shortName: 'Safe 300',
    purposes: ['Одяг', 'Електроніка', 'Пошта'],
    type: 'Поштова',
    inner: { length: 300, width: 200, height: 100 },
    outer: { length: 312, width: 210, height: 108 },
    material: 'Мікрогофрокартон',
    colors: ['Крафт'],
    colorTone: 'sand',
    basePrice: 28.9,
    minOrder: 10,
    inStock: true,
    shippingDays: '1–2 дні',
    brandable: false,
    postal: true,
    description: 'Посилений поштовий формат для техніки, одягу й наборів середнього розміру.',
  },
  {
    id: 'long-360',
    sku: 'BL–709',
    name: 'Long 360 × 90 × 90',
    shortName: 'Long 360',
    purposes: ['Подарунки', 'Пошта', 'Інше'],
    type: 'Самозбірна',
    inner: { length: 360, width: 90, height: 90 },
    outer: { length: 370, width: 98, height: 98 },
    material: 'Крафт-картон',
    colors: ['Крафт', 'Білий'],
    colorTone: 'white',
    basePrice: 23.6,
    minOrder: 25,
    inStock: false,
    shippingDays: '4–6 днів',
    brandable: true,
    postal: true,
    description: 'Витягнута коробка для пляшок, текстилю, постерів і нестандартних подарунків.',
  },
];

export const faqItems = [
  {
    q: 'Який мінімальний тираж?',
    a: 'Для демо-товарів — від 10 або 25 штук. Реальний мінімум залежить від конструкції, матеріалу та друку й має бути підтверджений власником.',
  },
  {
    q: 'Як правильно виміряти предмет?',
    a: 'Виміряйте найдовшу, найширшу й найвищу сторону самого предмета. Сервіс автоматично врахує технологічний запас; не вводьте розмір старої коробки.',
  },
  {
    q: 'Чи можна додати логотип?',
    a: 'У прототипі доступні демо-варіанти: наклейка або одноколірний друк. Точна ціна з’являється після перевірки макета й матеріалу.',
  },
  {
    q: 'Скільки триває виготовлення?',
    a: 'На картках вказані демонстраційні строки. Готові коробки зазвичай відправляються швидше, а власний розмір і брендоване пакування потребують узгодження.',
  },
  {
    q: 'Як відбувається доставка й оплата?',
    a: 'Цей прототип не приймає оплату. Перед запуском потрібно додати реальні способи доставки, реквізити, умови передоплати та повернення.',
  },
  {
    q: 'Можна спочатку отримати зразок?',
    a: 'Таку опцію передбачено для майбутнього сервісу. У демо можна залишити заявку, але доступність і вартість набору зразків треба підтвердити.',
  },
];

export const priceTiers = [
  { min: 500, discount: 0.28, label: '500+' },
  { min: 100, discount: 0.18, label: '100+' },
  { min: 50, discount: 0.1, label: '50+' },
  { min: 1, discount: 0, label: '10+' },
];

export function unitPrice(base: number, quantity: number): number {
  const tier = priceTiers.find((item) => quantity >= item.min) ?? priceTiers[priceTiers.length - 1];
  return Number((base * (1 - tier.discount)).toFixed(2));
}

export function formatMoney(value: number): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(value);
}

export const demoDisclaimer =
  'Усі назви, ціни, наявність і строки на цій сторінці — демонстраційні. Вони не є публічною офертою.';
