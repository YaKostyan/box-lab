import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_PARTNER_MARKUP,
  faqItems,
  fitsWithRotation,
  MAX_QUANTITY,
  products,
  publicUnitPrice,
  unitPrice,
  WHOLESALE_FROM,
} from '../src/data.ts';

test('узгоджений каталог і ключові правила ціни не змінені', () => {
  assert.equal(products.length, 12);
  assert.equal(MAX_QUANTITY, 50_000);
  assert.equal(WHOLESALE_FROM, 1_000);
  assert.equal(DEFAULT_PARTNER_MARKUP, 0.5);

  const box101 = products.find((product) => product.number === '101');
  assert.ok(box101);
  assert.equal(publicUnitPrice(box101, 1), 6);
  assert.equal(publicUnitPrice(box101, 999), 6);
  assert.equal(publicUnitPrice(box101, 1_000), 5);
  assert.equal(unitPrice(box101, 1, { partner: true, fixedMarkup: 0.5 }), 4.5);

  for (const product of products) {
    assert.equal(publicUnitPrice(product, 1), product.basePrice + 2);
    assert.equal(publicUnitPrice(product, 1_000), product.basePrice + 1);
  }
});

test('узгоджена інформація про доставку збережена', () => {
  const delivery = faqItems.find((item) => item.question === 'Як відбувається доставка?');
  assert.ok(delivery);
  assert.match(delivery.answer, /Києву та Київській області/);
  assert.match(delivery.answer, /уточнити з менеджером/);
});

test('підбір дозволяє поворот предмета', () => {
  assert.equal(
    fitsWithRotation(
      { length: 100, width: 165, height: 30 },
      { length: 165, width: 100, height: 30 },
    ),
    true,
  );
  assert.equal(
    fitsWithRotation(
      { length: 166, width: 101, height: 31 },
      { length: 165, width: 100, height: 30 },
    ),
    false,
  );
});
