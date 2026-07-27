export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  number: string;
  sku: string;
  name: string;
  dimensions: Dimensions;
  basePrice: number;
  sourceQuantity?: number;
}

export interface PartnerAccount {
  partner: boolean;
  fixedMarkup: number;
}

export const MATERIAL = 'Мікрогофрокартон, крафт';
export const MAX_QUANTITY = 50_000;
export const WHOLESALE_FROM = 1_000;
export const RETAIL_MARKUP = 2;
export const WHOLESALE_MARKUP = 1;
export const DEFAULT_PARTNER_MARKUP = 0.5;

export const products: Product[] = [
  {
    id: 'box-301',
    number: '301',
    sku: 'Арт. 294',
    name: 'Самозбірна коробка №301',
    dimensions: { length: 165, width: 100, height: 30 },
    basePrice: 5,
    sourceQuantity: 1000,
  },
  {
    id: 'box-302',
    number: '302',
    sku: 'Арт. 233',
    name: 'Самозбірна коробка №302',
    dimensions: { length: 130, width: 130, height: 50 },
    basePrice: 7,
    sourceQuantity: 800,
  },
  {
    id: 'box-303',
    number: '303',
    sku: 'Арт. 053',
    name: 'Самозбірна коробка №303',
    dimensions: { length: 190, width: 150, height: 100 },
    basePrice: 17,
    sourceQuantity: 800,
  },
  {
    id: 'box-304',
    number: '304',
    sku: 'Арт. 163',
    name: 'Самозбірна коробка №304',
    dimensions: { length: 230, width: 150, height: 35 },
    basePrice: 11,
    sourceQuantity: 800,
  },
  {
    id: 'box-305',
    number: '305',
    sku: 'Арт. 114',
    name: 'Самозбірна коробка №305',
    dimensions: { length: 160, width: 85, height: 110 },
    basePrice: 6.5,
  },
  {
    id: 'box-306',
    number: '306',
    sku: 'Арт. 269',
    name: 'Самозбірна коробка №306',
    dimensions: { length: 145, width: 145, height: 40 },
    basePrice: 6.5,
    sourceQuantity: 1000,
  },
  {
    id: 'box-307',
    number: '307',
    sku: 'Арт. 277',
    name: 'Самозбірна коробка №307',
    dimensions: { length: 280, width: 180, height: 100 },
    basePrice: 18,
    sourceQuantity: 500,
  },
  {
    id: 'box-308',
    number: '308',
    sku: 'Арт. 066',
    name: 'Самозбірна коробка №308',
    dimensions: { length: 250, width: 180, height: 40 },
    basePrice: 12,
    sourceQuantity: 800,
  },
  {
    id: 'box-309',
    number: '309',
    sku: 'Арт. 136',
    name: 'Самозбірна коробка №309',
    dimensions: { length: 210, width: 150, height: 50 },
    basePrice: 11,
    sourceQuantity: 900,
  },
  {
    id: 'box-310',
    number: '310',
    sku: 'Арт. 067',
    name: 'Самозбірна коробка №310',
    dimensions: { length: 260, width: 260, height: 50 },
    basePrice: 15,
    sourceQuantity: 600,
  },
  {
    id: 'box-311',
    number: '311',
    sku: 'Арт. 253',
    name: 'Самозбірна коробка №311',
    dimensions: { length: 370, width: 170, height: 100 },
    basePrice: 17,
  },
  {
    id: 'box-101',
    number: '101',
    sku: 'Без артикулу',
    name: 'Самозбірна коробка №101',
    dimensions: { length: 178, width: 115, height: 48 },
    basePrice: 4,
    sourceQuantity: 800,
  },
];

export const faqItems = [
  {
    question: 'Як формується ціна на сайті?',
    answer:
      'Для замовлень до 999 штук до базової ціни з прайса додається 2 грн за одиницю. Від 1000 до 50 000 штук — 1 грн. Калькулятор показує ціну за одиницю та весь тираж одразу.',
  },
  {
    question: 'Чи можна повернути коробку іншою стороною?',
    answer:
      'Так. Підбір за розміром враховує поворот предмета: сервіс порівнює три сторони предмета з трьома внутрішніми сторонами коробки.',
  },
  {
    question: 'Який матеріал використовується?',
    answer:
      'У поточному прайсі всі позиції показані в одному матеріалі — крафтовому мікрогофрокартоні. Інші матеріали не додаємо, доки власник не надасть окремі ціни.',
  },
  {
    question: 'Що отримує постійний клієнт?',
    answer:
      'Після підтвердження менеджером у кабінеті з’являється персональна фіксована ціна, нижча за публічну оптову ціну. У прототипі це працює локально в браузері.',
  },
  {
    question: 'Куди потрапляє заявка?',
    answer:
      'У цьому статичному прототипі заявка зберігається тільки у вашому браузері й одразу з’являється на локальній демо-сторінці адміністратора. Для реальної роботи потрібен backend і база даних.',
  },
  {
    question: 'Чи можна замовити більше 50 000 штук?',
    answer:
      'Калькулятор обмежений 50 000 одиниць. Більший тираж можна описати в коментарі до заявки — менеджер розрахує його окремо після запуску справжньої системи.',
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
  if (account?.partner) {
    return product.basePrice + Math.min(Math.max(account.fixedMarkup, 0), 0.99);
  }
  return publicUnitPrice(product, quantity);
}

export function productVolume(product: Product): number {
  const { length, width, height } = product.dimensions;
  return length * width * height;
}

export function fitsWithRotation(item: Dimensions, box: Dimensions): boolean {
  const itemSides = [item.length, item.width, item.height].sort((a, b) => b - a);
  const boxSides = [box.length, box.width, box.height].sort((a, b) => b - a);
  return itemSides.every((side, index) => side <= boxSides[index]);
}
