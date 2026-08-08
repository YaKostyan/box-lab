import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createApp } from './app.mjs';

let app;
let baseUrl;
let clientToken;
let adminToken;
let orderId;

before(async () => {
  app = createApp({
    databasePath: ':memory:',
    adminPhone: '+380000000001',
    adminPassword: 'admin123',
    allowedOrigins: 'https://yakostyan.github.io,http://localhost:5173',
  });
  await new Promise((resolve) => app.server.listen(0, '127.0.0.1', resolve));
  const address = app.server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await app.close();
});

async function request(path, { method = 'GET', token, body, origin } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(origin ? { Origin: origin } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const payload = await response.json();
  return { response, payload };
}

test('health, CORS and public catalog work', async () => {
  const health = await request('/api/health');
  assert.equal(health.response.status, 200);
  assert.equal(health.payload.ok, true);

  const catalog = await request('/api/products', { origin: 'https://yakostyan.github.io' });
  assert.equal(catalog.response.status, 200);
  assert.equal(catalog.response.headers.get('access-control-allow-origin'), 'https://yakostyan.github.io');
  assert.equal(catalog.payload.products.length, 12);
  assert.equal(catalog.payload.products.find((item) => item.id === 'box-101').basePrice, 4);
});

test('server recalculates retail and wholesale prices', async () => {
  const retail = await request('/api/quote', { method: 'POST', body: { items: [{ productId: 'box-101', quantity: 100, unitPrice: 0.01 }] } });
  assert.equal(retail.response.status, 200);
  assert.equal(retail.payload.items[0].unitPrice, 6);
  assert.equal(retail.payload.total, 600);

  const wholesale = await request('/api/quote', { method: 'POST', body: { items: [{ productId: 'box-101', quantity: 1000, unitPrice: 999 }] } });
  assert.equal(wholesale.payload.items[0].unitPrice, 5);
  assert.equal(wholesale.payload.total, 5000);
});

test('client registration, sessions and profile are persisted securely', async () => {
  const registration = await request('/api/auth/register', {
    method: 'POST',
    body: { name: 'Тестовий клієнт', phone: '+380671112233', company: 'QA', password: 'client123' },
  });
  assert.equal(registration.response.status, 201);
  assert.equal(registration.payload.account.phone, '+380671112233');
  assert.equal('password' in registration.payload.account, false);
  clientToken = registration.payload.token;

  const stored = app.db.prepare('SELECT password_hash FROM accounts WHERE phone = ?').get('+380671112233');
  assert.notEqual(stored.password_hash, 'client123');
  assert.match(stored.password_hash, /^scrypt:/);

  const duplicate = await request('/api/auth/register', {
    method: 'POST',
    body: { name: 'Дублікат', phone: '+380671112233', password: 'client123' },
  });
  assert.equal(duplicate.response.status, 409);

  const me = await request('/api/auth/me', { token: clientToken });
  assert.equal(me.response.status, 200);
  assert.equal(me.payload.account.name, 'Тестовий клієнт');

  const updated = await request('/api/auth/me', {
    method: 'PATCH',
    token: clientToken,
    body: { name: 'Оновлений клієнт', company: 'Toffi QA' },
  });
  assert.equal(updated.payload.account.name, 'Оновлений клієнт');
});

test('order is transactional and uses server price', async () => {
  const created = await request('/api/orders', {
    method: 'POST',
    token: clientToken,
    body: {
      customerName: 'Оновлений клієнт',
      phone: '+380671112233',
      company: 'Toffi QA',
      comment: 'Доставка після дзвінка',
      items: [
        { productId: 'box-101', quantity: 100, unitPrice: 0.01 },
        { productId: 'box-301', quantity: 1000, unitPrice: 0.01 },
      ],
    },
  });
  assert.equal(created.response.status, 201);
  assert.equal(created.payload.order.items.length, 2);
  assert.equal(created.payload.order.items[0].unitPrice, 6);
  assert.equal(created.payload.order.items[1].unitPrice, 6);
  assert.equal(created.payload.order.total, 6600);
  orderId = created.payload.order.id;

  const mine = await request('/api/me/orders', { token: clientToken });
  assert.equal(mine.payload.orders.length, 1);
  assert.equal(mine.payload.orders[0].id, orderId);
  assert.equal('managerNote' in mine.payload.orders[0], false);
});

test('client cannot access admin API', async () => {
  const forbidden = await request('/api/admin/orders', { token: clientToken });
  assert.equal(forbidden.response.status, 403);
});

test('admin controls clients, products and orders with audit log', async () => {
  const login = await request('/api/auth/login', {
    method: 'POST',
    body: { phone: '+380000000001', password: 'admin123' },
  });
  assert.equal(login.response.status, 200);
  assert.equal(login.payload.account.role, 'admin');
  adminToken = login.payload.token;

  const clients = await request('/api/admin/clients', { token: adminToken });
  assert.equal(clients.payload.clients.length, 1);
  const clientId = clients.payload.clients[0].id;
  const partner = await request(`/api/admin/clients/${clientId}`, {
    method: 'PATCH',
    token: adminToken,
    body: { partner: true, productPrices: { 'box-101': 4.35, 'box-301': 5.2 } },
  });
  assert.equal(partner.payload.client.partner, true);
  assert.equal(partner.payload.client.productPrices['box-101'], 4.35);

  const personalized = await request('/api/quote', {
    method: 'POST',
    token: clientToken,
    body: { items: [{ productId: 'box-101', quantity: 1 }] },
  });
  assert.equal(personalized.payload.items[0].unitPrice, 4.35);

  const fallback = await request('/api/quote', {
    method: 'POST',
    token: clientToken,
    body: { items: [{ productId: 'box-302', quantity: 1000 }] },
  });
  assert.equal(fallback.payload.items[0].unitPrice, 8);
  assert.equal(fallback.payload.items[0].priceType, 'Оптова ціна');

  const product = await request('/api/admin/products', {
    method: 'POST',
    token: adminToken,
    body: { number: 'QA900', name: 'QA коробка', dimensions: { length: 100, width: 90, height: 40 }, basePrice: 8, active: true },
  });
  assert.equal(product.response.status, 201);
  const productId = product.payload.product.id;
  const changed = await request(`/api/admin/products/${productId}`, {
    method: 'PATCH',
    token: adminToken,
    body: { basePrice: 9.25 },
  });
  assert.equal(changed.payload.product.basePrice, 9.25);
  const removed = await request(`/api/admin/products/${productId}`, { method: 'DELETE', token: adminToken });
  assert.equal(removed.payload.ok, true);

  const updatedOrder = await request(`/api/admin/orders/${orderId}`, {
    method: 'PATCH',
    token: adminToken,
    body: { status: 'У роботі', managerNote: 'Передзвонити клієнту' },
  });
  assert.equal(updatedOrder.payload.order.status, 'У роботі');
  assert.equal(updatedOrder.payload.order.managerNote, 'Передзвонити клієнту');
  assert.equal(updatedOrder.payload.order.statusHistory.length, 2);

  const date = updatedOrder.payload.order.createdAt.slice(0, 10);
  const filtered = await request(`/api/admin/orders?from=${date}&to=${date}&status=${encodeURIComponent('У роботі')}`, { token: adminToken });
  assert.equal(filtered.payload.orders.length, 1);

  const audit = await request('/api/admin/audit', { token: adminToken });
  assert.ok(audit.payload.events.length >= 6);
  assert.ok(audit.payload.events.some((event) => event.entityId === orderId));

  const deleted = await request(`/api/admin/orders/${orderId}`, { method: 'DELETE', token: adminToken });
  assert.equal(deleted.payload.ok, true);
  const orders = await request('/api/admin/orders', { token: adminToken });
  assert.equal(orders.payload.orders.length, 0);
});

test('logout revokes the bearer session', async () => {
  const logout = await request('/api/auth/logout', { method: 'POST', token: clientToken });
  assert.equal(logout.response.status, 200);
  const me = await request('/api/auth/me', { token: clientToken });
  assert.equal(me.response.status, 401);
});
