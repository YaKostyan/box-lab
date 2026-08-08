import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeFit,
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
  assert.equal(unitPrice(box101, 1, { partner: true, productPrices: { [box101.id]: 4.35 } }), 4.35);
  assert.equal(unitPrice(box101, 1_000, { partner: true, productPrices: {} }), 5);

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

test('запас у підборі рахується з кожного боку й не видає замалу коробку як придатну', () => {
  const item = { length: 170, width: 110, height: 45 };
  const box = { length: 178, width: 115, height: 48 };
  const exact = analyzeFit(item, box, 0);
  const withMargin = analyzeFit(item, box, 5);
  assert.equal(exact.fits, true);
  assert.deepEqual(exact.clearancesPerSide, [4, 2.5, 1.5]);
  assert.equal(withMargin.fits, false);
  assert.deepEqual(withMargin.deficitsPerSide, [1, 2.5, 3.5]);
});
