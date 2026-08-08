export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  number: string;
  name: string;
  dimensions: Dimensions;
  basePrice: number;
  sourceQuantity?: number;
}

export interface PartnerAccount {
  partner: boolean;
  productPrices?: Record<string, number>;
}

export interface FitAnalysis {
  fits: boolean;
  clearancesPerSide: [number, number, number];
  deficitsPerSide: [number, number, number];
}

export const MAX_QUANTITY = 50_000;
export const WHOLESALE_FROM = 1_000;
export const RETAIL_MARKUP = 2;
export const WHOLESALE_MARKUP = 1;
export const DEFAULT_PARTNER_MARKUP = 0.5;

export const products: Product[] = [
  {
    id: 'box-301',
    number: '301',
    name: 'Самозбірна коробка №301',
    dimensions: { length: 165, width: 100, height: 30 },
    basePrice: 5,
    sourceQuantity: 1000,
  },
  {
    id: 'box-302',
    number: '302',
    name: 'Самозбірна коробка №302',
    dimensions: { length: 130, width: 130, height: 50 },
    basePrice: 7,
    sourceQuantity: 800,
  },
  {
    id: 'box-303',
    number: '303',
    name: 'Самозбірна коробка №303',
    dimensions: { length: 190, width: 150, height: 100 },
    basePrice: 17,
    sourceQuantity: 800,
  },
  {
    id: 'box-304',
    number: '304',
    name: 'Самозбірна коробка №304',
    dimensions: { length: 230, width: 150, height: 35 },
    basePrice: 11,
    sourceQuantity: 800,
  },
  {
    id: 'box-305',
    number: '305',
    name: 'Самозбірна коробка №305',
    dimensions: { length: 160, width: 85, height: 110 },
    basePrice: 6.5,
  },
  {
    id: 'box-306',
    number: '306',
    name: 'Самозбірна коробка №306',
    dimensions: { length: 145, width: 145, height: 40 },
    basePrice: 6.5,
    sourceQuantity: 1000,
  },
  {
    id: 'box-307',
    number: '307',
    name: 'Самозбірна коробка №307',
    dimensions: { length: 280, width: 180, height: 100 },
    basePrice: 18,
    sourceQuantity: 500,
  },
  {
    id: 'box-308',
    number: '308',
    name: 'Самозбірна коробка №308',
    dimensions: { length: 250, width: 180, height: 40 },
    basePrice: 12,
    sourceQuantity: 800,
  },
  {
    id: 'box-309',
    number: '309',
    name: 'Самозбірна коробка №309',
    dimensions: { length: 210, width: 150, height: 50 },
    basePrice: 11,
    sourceQuantity: 900,
  },
  {
    id: 'box-310',
    number: '310',
    name: 'Самозбірна коробка №310',
    dimensions: { length: 260, width: 260, height: 50 },
    basePrice: 15,
    sourceQuantity: 600,
  },
  {
    id: 'box-311',
    number: '311',
    name: 'Самозбірна коробка №311',
    dimensions: { length: 370, width: 170, height: 100 },
    basePrice: 17,
  },
  {
    id: 'box-101',
    number: '101',
    name: 'Самозбірна коробка №101',
    dimensions: { length: 178, width: 115, height: 48 },
    basePrice: 4,
    sourceQuantity: 800,
  },
];

export const faqItems = [
  {
    question: 'Як відбувається доставка?',
    answer:
      'Доставляємо по Києву та Київській області. Формат, точну адресу й вартість потрібно уточнити з менеджером під час підтвердження заявки.',
  },
  {
    question: 'Які строки виготовлення?',
    answer:
      'Строк залежить від розміру коробки, тиражу та завантаження виробництва. Менеджер називає точну дату до запуску замовлення.',
  },
  {
    question: 'Що отримує постійний клієнт?',
    answer:
      'Після підтвердження менеджером у кабінеті активується персональна ціна. Вона автоматично відображається в каталозі, калькуляторі та кошику.',
  },
  {
    question: 'Як проходить оплата?',
    answer:
      'Форму оплати, рахунок і підсумкову суму менеджер погоджує з вами до початку виготовлення.',
  },
  {
    question: 'Чи працюєте ви з малим і великим бізнесом?',
    answer:
      'Так. Можна почати з невеликої партії або замовити регулярний великий тираж. Калькулятор рахує до 50 000 коробок, більший обсяг прораховує менеджер.',
  },
  {
    question: 'Чи робите коробки під індивідуальний запит?',
    answer:
      'Так. Якщо серед готових розмірів немає потрібного, вкажіть габарити й особливості замовлення в коментарі. Менеджер уточнить деталі та підготує розрахунок.',
  },
];

export interface SupportTopic {
  id: string;
  question: string;
  answer: string;
  actionLabel: string;
  actionHref: string;
}

export const supportTopics: SupportTopic[] = [
  {
    id: 'find-size',
    question: 'Як підібрати розмір?',
    answer:
      'Введіть довжину, ширину та висоту предмета. Сайт порівняє всі три сторони й покаже найкомпактніші коробки, у які він поміститься.',
    actionLabel: 'Підібрати коробку',
    actionHref: '#fit',
  },
  {
    id: 'calculate-price',
    question: 'Як дізнатися ціну?',
    answer:
      'Оберіть коробку та вкажіть кількість від 1 до 50 000 штук. Калькулятор одразу покаже ціну за одиницю та за весь тираж.',
    actionLabel: 'Розрахувати ціну',
    actionHref: '#calculator',
  },
  {
    id: 'delivery',
    question: 'Як працює доставка?',
    answer:
      'Доставляємо по Києву та Київській області. Формат, адресу й вартість менеджер погоджує під час підтвердження заявки.',
    actionLabel: 'Умови доставки',
    actionHref: '#delivery',
  },
  {
    id: 'lead-time',
    question: 'Які строки виготовлення?',
    answer:
      'Строк залежить від розміру, тиражу та завантаження виробництва. Точну дату менеджер назве до запуску замовлення.',
    actionLabel: 'Залишити заявку',
    actionHref: '#request',
  },
  {
    id: 'personal-price',
    question: 'Де побачити мої ціни?',
    answer:
      'Увійдіть до кабінету за номером телефону. Якщо менеджер призначив персональні ціни, вони автоматично з’являться в кабінеті, каталозі, калькуляторі та кошику.',
    actionLabel: 'Відкрити кабінет',
    actionHref: '#account',
  },
  {
    id: 'custom-size',
    question: 'Немає потрібного розміру?',
    answer:
      'Опишіть потрібні габарити, кількість та особливості у коментарі до заявки. Менеджер уточнить деталі й підготує окремий розрахунок.',
    actionLabel: 'Описати запит',
    actionHref: '#request',
  },
];

export function formatMoney(value: number): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function publicUnitPrice(product: Product, quantity: number): number {
  return product.basePrice + (quantity >= WHOLESALE_FROM ? WHOLESALE_MARKUP : RETAIL_MARKUP);
}

export function unitPrice(
  product: Product,
  quantity: number,
  account?: PartnerAccount | null,
): number {
  const personalPrice = personalUnitPrice(product, account);
  if (personalPrice !== null) return personalPrice;
  return publicUnitPrice(product, quantity);
}

export function personalUnitPrice(
  product: Product,
  account?: PartnerAccount | null,
): number | null {
  if (!account?.partner) return null;
  const price = Number(account.productPrices?.[product.id]);
  return Number.isFinite(price) && price > 0 ? price : null;
}

export function productVolume(product: Product): number {
  const { length, width, height } = product.dimensions;
  return length * width * height;
}

export function fitsWithRotation(item: Dimensions, box: Dimensions): boolean {
  return analyzeFit(item, box).fits;
}

export function analyzeFit(item: Dimensions, box: Dimensions, marginPerSide = 0): FitAnalysis {
  const itemSides = [item.length, item.width, item.height].sort((a, b) => b - a);
  const boxSides = [box.length, box.width, box.height].sort((a, b) => b - a);
  const clearancesPerSide = itemSides.map((side, index) => (boxSides[index] - side) / 2) as [number, number, number];
  const deficitsPerSide = clearancesPerSide.map((clearance) => Math.max(0, marginPerSide - clearance)) as [number, number, number];
  return {
    fits: deficitsPerSide.every((deficit) => deficit === 0),
    clearancesPerSide,
    deficitsPerSide,
  };
}
