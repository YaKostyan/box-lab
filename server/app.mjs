import { createServer as createHttpServer } from 'node:http';
import { products as seedProducts } from '../src/data.ts';
import { closeDatabase, createDatabase, transaction } from './database.mjs';
import { createId, createSessionToken, hashPassword, hashToken, verifyPassword } from './security.mjs';

const ORDER_STATUSES = new Set(['Нова', 'У роботі', 'Уточнення', 'Підтверджена', 'Закрита']);
const MAX_BODY_BYTES = 1_000_000;
const MAX_QUANTITY = 50_000;
const WHOLESALE_FROM = 1_000;
const RETAIL_MARKUP = 2;
const WHOLESALE_MARKUP = 1;

class ApiError extends Error {
  constructor(status, message, code = 'request_error') {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function createApp(overrides = {}) {
  const config = resolveConfig(overrides);
  if (config.nodeEnv === 'production' && config.adminPassword === 'admin123') {
    throw new Error('ADMIN_PASSWORD must be changed in production.');
  }
  const db = createDatabase({
    path: config.databasePath,
    adminPhone: config.adminPhone,
    adminPassword: config.adminPassword,
  });
  const limiter = new Map();

  const server = createHttpServer(async (request, response) => {
    applySecurityHeaders(response);
    const origin = request.headers.origin;
    if (origin && config.allowedOrigins.has(origin)) {
      response.setHeader('Access-Control-Allow-Origin', origin);
      response.setHeader('Vary', 'Origin');
      response.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
      response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    }
    if (request.method === 'OPTIONS') {
      if (origin && !config.allowedOrigins.has(origin)) return sendError(response, new ApiError(403, 'Origin is not allowed.', 'origin_denied'));
      response.writeHead(204).end();
      return;
    }

    try {
      const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
      const route = `${request.method ?? 'GET'} ${url.pathname}`;
      if (route === 'GET /health' || route === 'GET /api/health') {
        return sendJson(response, 200, { ok: true, service: 'toffipacks-api', time: new Date().toISOString() });
      }
      if (!url.pathname.startsWith('/api/')) throw new ApiError(404, 'Маршрут не знайдено.', 'not_found');

      const auth = authenticate(request, db);

      if (route === 'GET /api/products') {
        const products = db.prepare('SELECT * FROM products WHERE active = 1 AND deleted_at IS NULL ORDER BY number COLLATE NOCASE').all();
        return sendJson(response, 200, { products: products.map(mapProduct) });
      }

      if (route === 'POST /api/quote') {
        rateLimit(request, limiter, 'quote', 60, 60_000);
        const body = await readJson(request);
        const quote = calculateItems(db, body.items, auth?.account ?? null);
        return sendJson(response, 200, { items: quote, total: money(quote.reduce((sum, item) => sum + item.total, 0)) });
      }

      if (route === 'POST /api/auth/register') {
        rateLimit(request, limiter, 'register', 8, 15 * 60_000);
        const body = await readJson(request);
        const name = requiredText(body.name, 'Ім’я', 2, 100);
        const phone = normalizePhone(body.phone);
        const company = optionalText(body.company, 120);
        const password = validatePassword(body.password);
        const now = new Date().toISOString();
        const account = {
          id: createId('account'),
          name,
          phone,
          company,
          passwordHash: hashPassword(password),
          createdAt: now,
        };
        try {
          db.prepare(`
            INSERT INTO accounts (id, name, phone, company, password_hash, role, partner, fixed_markup, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, 'client', 0, 0.5, ?, ?)
          `).run(account.id, account.name, account.phone, account.company, account.passwordHash, now, now);
        } catch (error) {
          if (String(error).includes('UNIQUE')) throw new ApiError(409, 'Акаунт із таким номером уже існує.', 'phone_exists');
          throw error;
        }
        const row = db.prepare('SELECT * FROM accounts WHERE id = ?').get(account.id);
        const session = issueSession(db, account.id, config.sessionDays);
        audit(db, account.id, 'register', 'account', account.id, { phone });
        return sendJson(response, 201, { account: mapAccount(row), token: session.token, expiresAt: session.expiresAt });
      }

      if (route === 'POST /api/auth/login') {
        rateLimit(request, limiter, 'login', 10, 15 * 60_000);
        const body = await readJson(request);
        const phone = normalizePhone(body.phone);
        const password = String(body.password ?? '');
        const row = db.prepare('SELECT * FROM accounts WHERE phone = ? AND disabled_at IS NULL').get(phone);
        if (!row || !verifyPassword(password, row.password_hash)) {
          throw new ApiError(401, 'Невірний телефон або пароль.', 'invalid_credentials');
        }
        const session = issueSession(db, row.id, config.sessionDays);
        audit(db, row.id, 'login', 'account', row.id, {});
        return sendJson(response, 200, { account: mapAccount(row), token: session.token, expiresAt: session.expiresAt });
      }

      if (route === 'GET /api/auth/me') {
        const account = requireAuth(auth);
        return sendJson(response, 200, { account: mapAccount(account) });
      }

      if (route === 'PATCH /api/auth/me') {
        const account = requireAuth(auth);
        const body = await readJson(request);
        const name = body.name === undefined ? account.name : requiredText(body.name, 'Ім’я', 2, 100);
        const phone = body.phone === undefined ? account.phone : normalizePhone(body.phone);
        const company = body.company === undefined ? account.company : optionalText(body.company, 120);
        const passwordHash = body.password ? hashPassword(validatePassword(body.password)) : account.password_hash;
        const now = new Date().toISOString();
        try {
          db.prepare('UPDATE accounts SET name = ?, phone = ?, company = ?, password_hash = ?, updated_at = ? WHERE id = ?')
            .run(name, phone, company, passwordHash, now, account.id);
        } catch (error) {
          if (String(error).includes('UNIQUE')) throw new ApiError(409, 'Акаунт із таким номером уже існує.', 'phone_exists');
          throw error;
        }
        audit(db, account.id, 'update_profile', 'account', account.id, { phone });
        return sendJson(response, 200, { account: mapAccount(db.prepare('SELECT * FROM accounts WHERE id = ?').get(account.id)) });
      }

      if (route === 'POST /api/auth/logout') {
        requireAuth(auth);
        db.prepare('UPDATE sessions SET revoked_at = ? WHERE id = ?').run(new Date().toISOString(), auth.session.id);
        return sendJson(response, 200, { ok: true });
      }

      if (route === 'POST /api/orders') {
        rateLimit(request, limiter, 'orders', 12, 10 * 60_000);
        const body = await readJson(request);
        const customerName = requiredText(body.customerName, 'Ім’я', 2, 100);
        const phone = normalizePhone(body.phone);
        const company = optionalText(body.company, 120);
        const comment = optionalText(body.comment, 2000);
        const calculatedItems = calculateItems(db, body.items, auth?.account ?? null);
        const order = createOrder(db, {
          customerName,
          phone,
          company,
          comment,
          items: calculatedItems,
          accountId: auth?.account?.id ?? null,
        });
        audit(db, auth?.account?.id ?? null, 'create', 'order', order.id, { total: order.total, itemCount: order.items.length });
        void notifyTelegram(config, order).catch((error) => console.error('Telegram notification failed:', error.message));
        return sendJson(response, 201, { order });
      }

      if (route === 'GET /api/me/orders') {
        const account = requireAuth(auth);
        return sendJson(response, 200, { orders: selectOrders(db, { accountId: account.id }, false) });
      }

      if (route === 'GET /api/admin/overview') {
        requireAdmin(auth);
        const stats = {
          orders: db.prepare('SELECT COUNT(*) AS count FROM orders WHERE deleted_at IS NULL').get().count,
          newOrders: db.prepare("SELECT COUNT(*) AS count FROM orders WHERE status = 'Нова' AND deleted_at IS NULL").get().count,
          clients: db.prepare("SELECT COUNT(*) AS count FROM accounts WHERE role = 'client' AND disabled_at IS NULL").get().count,
          products: db.prepare('SELECT COUNT(*) AS count FROM products WHERE active = 1 AND deleted_at IS NULL').get().count,
          revenue: money(db.prepare('SELECT COALESCE(SUM(total), 0) AS total FROM orders WHERE deleted_at IS NULL').get().total),
        };
        return sendJson(response, 200, { stats });
      }

      if (route === 'GET /api/admin/products') {
        requireAdmin(auth);
        const products = db.prepare('SELECT * FROM products WHERE deleted_at IS NULL ORDER BY number COLLATE NOCASE').all();
        return sendJson(response, 200, { products: products.map(mapProduct) });
      }

      if (route === 'POST /api/admin/products') {
        const admin = requireAdmin(auth);
        const body = await readJson(request);
        const product = validateProduct(body);
        const id = createId('box');
        const now = new Date().toISOString();
        try {
          db.prepare(`
            INSERT INTO products (id, number, name, length_mm, width_mm, height_mm, base_price, source_quantity, active, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).run(id, product.number, product.name, product.length, product.width, product.height, product.basePrice, product.sourceQuantity, product.active ? 1 : 0, now, now);
        } catch (error) {
          if (String(error).includes('UNIQUE')) throw new ApiError(409, 'Товар із таким номером уже існує.', 'product_exists');
          throw error;
        }
        audit(db, admin.id, 'create', 'product', id, product);
        return sendJson(response, 201, { product: mapProduct(db.prepare('SELECT * FROM products WHERE id = ?').get(id)) });
      }

      const productMatch = url.pathname.match(/^\/api\/admin\/products\/([^/]+)$/);
      if (productMatch && request.method === 'PATCH') {
        const admin = requireAdmin(auth);
        const id = decodeURIComponent(productMatch[1]);
        const existing = db.prepare('SELECT * FROM products WHERE id = ? AND deleted_at IS NULL').get(id);
        if (!existing) throw new ApiError(404, 'Товар не знайдено.', 'product_not_found');
        const body = await readJson(request);
        const product = validateProduct({ ...mapProduct(existing), ...body, dimensions: { ...mapProduct(existing).dimensions, ...(body.dimensions ?? {}) } });
        const now = new Date().toISOString();
        try {
          db.prepare(`
            UPDATE products SET number = ?, name = ?, length_mm = ?, width_mm = ?, height_mm = ?, base_price = ?, source_quantity = ?, active = ?, updated_at = ?
            WHERE id = ?
          `).run(product.number, product.name, product.length, product.width, product.height, product.basePrice, product.sourceQuantity, product.active ? 1 : 0, now, id);
        } catch (error) {
          if (String(error).includes('UNIQUE')) throw new ApiError(409, 'Товар із таким номером уже існує.', 'product_exists');
          throw error;
        }
        audit(db, admin.id, 'update', 'product', id, product);
        return sendJson(response, 200, { product: mapProduct(db.prepare('SELECT * FROM products WHERE id = ?').get(id)) });
      }

      if (productMatch && request.method === 'DELETE') {
        const admin = requireAdmin(auth);
        const id = decodeURIComponent(productMatch[1]);
        const existing = db.prepare('SELECT * FROM products WHERE id = ? AND deleted_at IS NULL').get(id);
        if (!existing) throw new ApiError(404, 'Товар не знайдено.', 'product_not_found');
        const activeCount = db.prepare('SELECT COUNT(*) AS count FROM products WHERE active = 1 AND deleted_at IS NULL').get().count;
        if (existing.active && activeCount <= 1) throw new ApiError(409, 'У каталозі має залишитися хоча б один активний товар.', 'last_product');
        const now = new Date().toISOString();
        db.prepare('UPDATE products SET active = 0, deleted_at = ?, updated_at = ? WHERE id = ?').run(now, now, id);
        audit(db, admin.id, 'delete', 'product', id, { number: existing.number });
        return sendJson(response, 200, { ok: true });
      }

      if (route === 'POST /api/admin/products/reset') {
        const admin = requireAdmin(auth);
        resetProducts(db);
        audit(db, admin.id, 'reset', 'product', 'catalog', { count: seedProducts.length });
        const products = db.prepare('SELECT * FROM products WHERE deleted_at IS NULL ORDER BY number COLLATE NOCASE').all();
        return sendJson(response, 200, { products: products.map(mapProduct) });
      }

      if (route === 'GET /api/admin/orders') {
        requireAdmin(auth);
        const filters = {
          status: url.searchParams.get('status') || undefined,
          from: validDate(url.searchParams.get('from')),
          to: validDate(url.searchParams.get('to')),
          search: optionalText(url.searchParams.get('search'), 100) || undefined,
        };
        return sendJson(response, 200, { orders: selectOrders(db, filters, true) });
      }

      const orderMatch = url.pathname.match(/^\/api\/admin\/orders\/([^/]+)$/);
      if (orderMatch && request.method === 'PATCH') {
        const admin = requireAdmin(auth);
        const id = decodeURIComponent(orderMatch[1]);
        const existing = db.prepare('SELECT * FROM orders WHERE id = ? AND deleted_at IS NULL').get(id);
        if (!existing) throw new ApiError(404, 'Заявку не знайдено.', 'order_not_found');
        const body = await readJson(request);
        const nextStatus = body.status === undefined ? existing.status : validateStatus(body.status);
        const note = body.managerNote === undefined ? existing.manager_note : optionalText(body.managerNote, 4000);
        const now = new Date().toISOString();
        transaction(db, () => {
          db.prepare('UPDATE orders SET status = ?, manager_note = ? WHERE id = ?').run(nextStatus, note, id);
          if (nextStatus !== existing.status) {
            db.prepare('INSERT INTO order_status_history (order_id, status, at, actor_id) VALUES (?, ?, ?, ?)').run(id, nextStatus, now, admin.id);
          }
          audit(db, admin.id, 'update', 'order', id, { status: nextStatus, managerNoteChanged: note !== existing.manager_note });
        });
        return sendJson(response, 200, { order: selectOrders(db, { id }, true)[0] });
      }

      if (orderMatch && request.method === 'DELETE') {
        const admin = requireAdmin(auth);
        const id = decodeURIComponent(orderMatch[1]);
        const now = new Date().toISOString();
        const result = db.prepare('UPDATE orders SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL').run(now, id);
        if (!result.changes) throw new ApiError(404, 'Заявку не знайдено.', 'order_not_found');
        audit(db, admin.id, 'delete', 'order', id, {});
        return sendJson(response, 200, { ok: true });
      }

      if (route === 'GET /api/admin/clients') {
        requireAdmin(auth);
        const clients = db.prepare("SELECT * FROM accounts WHERE role = 'client' AND disabled_at IS NULL ORDER BY created_at DESC").all();
        return sendJson(response, 200, { clients: clients.map(mapAccount) });
      }

      const clientMatch = url.pathname.match(/^\/api\/admin\/clients\/([^/]+)$/);
      if (clientMatch && request.method === 'PATCH') {
        const admin = requireAdmin(auth);
        const id = decodeURIComponent(clientMatch[1]);
        const existing = db.prepare("SELECT * FROM accounts WHERE id = ? AND role = 'client' AND disabled_at IS NULL").get(id);
        if (!existing) throw new ApiError(404, 'Клієнта не знайдено.', 'client_not_found');
        const body = await readJson(request);
        const partner = body.partner === undefined ? Boolean(existing.partner) : Boolean(body.partner);
        const fixedMarkup = body.fixedMarkup === undefined ? existing.fixed_markup : numberBetween(body.fixedMarkup, 0, 0.99, 'Персональна націнка');
        db.prepare('UPDATE accounts SET partner = ?, fixed_markup = ?, updated_at = ? WHERE id = ?')
          .run(partner ? 1 : 0, fixedMarkup, new Date().toISOString(), id);
        audit(db, admin.id, 'update_pricing', 'account', id, { partner, fixedMarkup });
        return sendJson(response, 200, { client: mapAccount(db.prepare('SELECT * FROM accounts WHERE id = ?').get(id)) });
      }

      if (route === 'GET /api/admin/audit') {
        requireAdmin(auth);
        const events = db.prepare('SELECT * FROM audit_log ORDER BY created_at DESC LIMIT 500').all().map((row) => ({
          id: row.id,
          actorId: row.actor_id,
          action: row.action,
          entityType: row.entity_type,
          entityId: row.entity_id,
          details: safeJson(row.details_json),
          createdAt: row.created_at,
        }));
        return sendJson(response, 200, { events });
      }

      if (route === 'GET /api/admin/backup') {
        requireAdmin(auth);
        const backup = {
          generatedAt: new Date().toISOString(),
          products: db.prepare('SELECT * FROM products').all(),
          accounts: db.prepare("SELECT id, name, phone, company, role, partner, fixed_markup, created_at, updated_at, disabled_at FROM accounts").all(),
          orders: selectOrders(db, {}, true, true),
          audit: db.prepare('SELECT * FROM audit_log ORDER BY id').all(),
        };
        return sendJson(response, 200, backup);
      }

      throw new ApiError(404, 'Маршрут не знайдено.', 'not_found');
    } catch (error) {
      if (!(error instanceof ApiError)) console.error(error);
      sendError(response, error);
    }
  });

  return {
    server,
    db,
    config,
    close() {
      return new Promise((resolve, reject) => {
        server.close((error) => {
          try {
            closeDatabase(db);
          } catch (closeError) {
            if (!error) error = closeError;
          }
          if (error) reject(error);
          else resolve();
        });
      });
    },
  };
}

function resolveConfig(overrides) {
  const nodeEnv = overrides.nodeEnv ?? process.env.NODE_ENV ?? 'development';
  const origins = overrides.allowedOrigins ?? process.env.ALLOWED_ORIGINS ?? 'https://yakostyan.github.io,http://localhost:5173,http://127.0.0.1:5173';
  return {
    nodeEnv,
    databasePath: overrides.databasePath ?? process.env.DATABASE_PATH ?? './data/toffipacks.sqlite',
    adminPhone: normalizePhone(overrides.adminPhone ?? process.env.ADMIN_PHONE ?? '+380000000001'),
    adminPassword: overrides.adminPassword ?? process.env.ADMIN_PASSWORD ?? 'admin123',
    allowedOrigins: new Set(String(origins).split(',').map((value) => value.trim()).filter(Boolean)),
    sessionDays: Number(overrides.sessionDays ?? process.env.SESSION_DAYS ?? 30),
    telegramBotToken: overrides.telegramBotToken ?? process.env.TELEGRAM_BOT_TOKEN ?? '',
    telegramChatId: overrides.telegramChatId ?? process.env.TELEGRAM_CHAT_ID ?? '',
  };
}

function applySecurityHeaders(response) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
}

function sendJson(response, status, payload) {
  if (response.writableEnded) return;
  const body = JSON.stringify(payload);
  response.writeHead(status, { 'Content-Length': Buffer.byteLength(body) });
  response.end(body);
}

function sendError(response, error) {
  const status = error instanceof ApiError ? error.status : 500;
  const message = error instanceof ApiError ? error.message : 'Внутрішня помилка сервера.';
  const code = error instanceof ApiError ? error.code : 'internal_error';
  sendJson(response, status, { error: { code, message } });
}

async function readJson(request) {
  const contentType = String(request.headers['content-type'] ?? '');
  if (!contentType.toLowerCase().includes('application/json')) throw new ApiError(415, 'Потрібен JSON.', 'content_type');
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new ApiError(413, 'Запит завеликий.', 'body_too_large');
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
  } catch {
    throw new ApiError(400, 'Некоректний JSON.', 'invalid_json');
  }
}

function normalizePhone(value) {
  const digits = String(value ?? '').replace(/\D/g, '');
  const normalized = digits.startsWith('380') ? `+${digits}` : digits.startsWith('0') ? `+38${digits}` : `+${digits}`;
  if (!/^\+380\d{9}$/.test(normalized)) throw new ApiError(400, 'Вкажіть телефон у форматі +380XXXXXXXXX.', 'invalid_phone');
  return normalized;
}

function validatePassword(value) {
  const password = String(value ?? '');
  if (password.length < 8 || password.length > 200) throw new ApiError(400, 'Пароль має містити щонайменше 8 символів.', 'invalid_password');
  return password;
}

function requiredText(value, label, min, max) {
  const text = String(value ?? '').trim();
  if (text.length < min || text.length > max) throw new ApiError(400, `${label}: від ${min} до ${max} символів.`, 'invalid_field');
  return text;
}

function optionalText(value, max) {
  const text = String(value ?? '').trim();
  if (text.length > max) throw new ApiError(400, `Поле не може перевищувати ${max} символів.`, 'invalid_field');
  return text;
}

function numberBetween(value, min, max, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < min || number > max) throw new ApiError(400, `${label}: значення від ${min} до ${max}.`, 'invalid_number');
  return number;
}

function validateStatus(value) {
  const status = String(value ?? '');
  if (!ORDER_STATUSES.has(status)) throw new ApiError(400, 'Невідомий статус заявки.', 'invalid_status');
  return status;
}

function validDate(value) {
  if (!value) return undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new ApiError(400, 'Дата має бути у форматі YYYY-MM-DD.', 'invalid_date');
  return value;
}

function validateProduct(body) {
  const dimensions = body.dimensions ?? {};
  const number = requiredText(body.number, 'Номер', 1, 20);
  if (!/^[\p{L}\p{N}._-]+$/u.test(number)) throw new ApiError(400, 'Некоректний номер товару.', 'invalid_product_number');
  return {
    number,
    name: optionalText(body.name, 160) || `Самозбірна коробка №${number}`,
    length: Math.round(numberBetween(dimensions.length, 1, 2000, 'Довжина')),
    width: Math.round(numberBetween(dimensions.width, 1, 2000, 'Ширина')),
    height: Math.round(numberBetween(dimensions.height, 1, 2000, 'Висота')),
    basePrice: money(numberBetween(body.basePrice, 0.01, 10000, 'Базова ціна')),
    sourceQuantity: body.sourceQuantity == null ? null : Math.round(numberBetween(body.sourceQuantity, 1, MAX_QUANTITY, 'Базовий тираж')),
    active: body.active !== false,
  };
}

function mapProduct(row) {
  return {
    id: row.id,
    number: row.number,
    name: row.name,
    dimensions: { length: row.length_mm, width: row.width_mm, height: row.height_mm },
    basePrice: row.base_price,
    sourceQuantity: row.source_quantity ?? undefined,
    active: Boolean(row.active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapAccount(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    company: row.company,
    role: row.role,
    partner: Boolean(row.partner),
    fixedMarkup: row.fixed_markup,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function authenticate(request, db) {
  const header = String(request.headers.authorization ?? '');
  if (!header.startsWith('Bearer ')) return null;
  const token = header.slice(7).trim();
  if (!token) return null;
  const now = new Date().toISOString();
  const row = db.prepare(`
    SELECT s.id AS session_id, s.expires_at, a.*
    FROM sessions s JOIN accounts a ON a.id = s.account_id
    WHERE s.token_hash = ? AND s.revoked_at IS NULL AND s.expires_at > ? AND a.disabled_at IS NULL
  `).get(hashToken(token), now);
  if (!row) return null;
  db.prepare('UPDATE sessions SET last_seen_at = ? WHERE id = ?').run(now, row.session_id);
  return { session: { id: row.session_id, expiresAt: row.expires_at }, account: row };
}

function requireAuth(auth) {
  if (!auth?.account) throw new ApiError(401, 'Потрібно увійти.', 'unauthorized');
  return auth.account;
}

function requireAdmin(auth) {
  const account = requireAuth(auth);
  if (account.role !== 'admin') throw new ApiError(403, 'Потрібні права менеджера.', 'forbidden');
  return account;
}

function issueSession(db, accountId, days) {
  const token = createSessionToken();
  const now = new Date();
  const expires = new Date(now.getTime() + Math.max(1, days) * 86_400_000);
  const id = createId('session');
  db.prepare(`
    INSERT INTO sessions (id, account_id, token_hash, created_at, expires_at, last_seen_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, accountId, hashToken(token), now.toISOString(), expires.toISOString(), now.toISOString());
  db.prepare('DELETE FROM sessions WHERE expires_at <= ? OR revoked_at IS NOT NULL').run(now.toISOString());
  return { token, expiresAt: expires.toISOString() };
}

function rateLimit(request, store, bucket, max, windowMs) {
  const ip = request.socket.remoteAddress ?? 'unknown';
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  entry.count += 1;
  if (entry.count > max) throw new ApiError(429, 'Забагато спроб. Спробуйте пізніше.', 'rate_limited');
}

function calculateItems(db, rawItems, account) {
  if (!Array.isArray(rawItems) || rawItems.length < 1 || rawItems.length > 50) throw new ApiError(400, 'Додайте від 1 до 50 позицій.', 'invalid_items');
  const getProduct = db.prepare('SELECT * FROM products WHERE id = ? AND active = 1 AND deleted_at IS NULL');
  return rawItems.map((raw) => {
    const product = getProduct.get(String(raw.productId ?? ''));
    if (!product) throw new ApiError(400, 'Один із товарів недоступний.', 'product_unavailable');
    const quantity = Math.round(numberBetween(raw.quantity, 1, MAX_QUANTITY, 'Кількість'));
    const markup = account?.partner ? Math.min(Math.max(account.fixed_markup, 0), 0.99) : quantity >= WHOLESALE_FROM ? WHOLESALE_MARKUP : RETAIL_MARKUP;
    const unitPrice = money(product.base_price + markup);
    return {
      productId: product.id,
      productNumber: product.number,
      dimensions: { length: product.length_mm, width: product.width_mm, height: product.height_mm },
      quantity,
      unitPrice,
      total: money(unitPrice * quantity),
      priceType: account?.partner ? 'Персональна ціна' : quantity >= WHOLESALE_FROM ? 'Оптова ціна' : 'Роздрібна ціна',
    };
  });
}

function createOrder(db, input) {
  const createdAt = new Date().toISOString();
  const id = `TP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const total = money(input.items.reduce((sum, item) => sum + item.total, 0));
  transaction(db, () => {
    db.prepare(`
      INSERT INTO orders (id, created_at, customer_name, phone, company, comment, account_id, total, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Нова')
    `).run(id, createdAt, input.customerName, input.phone, input.company, input.comment, input.accountId, total);
    const insertItem = db.prepare(`
      INSERT INTO order_items
        (order_id, product_id, product_number, length_mm, width_mm, height_mm, quantity, unit_price, total, price_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const item of input.items) {
      insertItem.run(id, item.productId, item.productNumber, item.dimensions.length, item.dimensions.width, item.dimensions.height, item.quantity, item.unitPrice, item.total, item.priceType);
    }
    db.prepare("INSERT INTO order_status_history (order_id, status, at, actor_id) VALUES (?, 'Нова', ?, ?)").run(id, createdAt, input.accountId);
  });
  return selectOrders(db, { id }, true)[0];
}

function selectOrders(db, filters = {}, includeManager = false, includeDeleted = false) {
  const conditions = [];
  const params = [];
  if (!includeDeleted) conditions.push('deleted_at IS NULL');
  if (filters.id) { conditions.push('id = ?'); params.push(filters.id); }
  if (filters.accountId) { conditions.push('account_id = ?'); params.push(filters.accountId); }
  if (filters.status) { conditions.push('status = ?'); params.push(validateStatus(filters.status)); }
  if (filters.from) { conditions.push("substr(created_at, 1, 10) >= ?"); params.push(filters.from); }
  if (filters.to) { conditions.push("substr(created_at, 1, 10) <= ?"); params.push(filters.to); }
  if (filters.search) {
    conditions.push("(lower(id) LIKE ? OR lower(customer_name) LIKE ? OR phone LIKE ? OR lower(company) LIKE ?)");
    const term = `%${filters.search.toLowerCase()}%`;
    params.push(term, term, term, term);
  }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const rows = db.prepare(`SELECT * FROM orders ${where} ORDER BY created_at DESC LIMIT 1000`).all(...params);
  const getItems = db.prepare('SELECT * FROM order_items WHERE order_id = ? ORDER BY id');
  const getHistory = db.prepare('SELECT status, at FROM order_status_history WHERE order_id = ? ORDER BY id');
  return rows.map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    customerName: row.customer_name,
    phone: row.phone,
    company: row.company,
    comment: row.comment,
    accountId: row.account_id ?? undefined,
    items: getItems.all(row.id).map((item) => ({
      productId: item.product_id,
      productNumber: item.product_number,
      dimensions: { length: item.length_mm, width: item.width_mm, height: item.height_mm },
      quantity: item.quantity,
      unitPrice: item.unit_price,
      total: item.total,
      priceType: item.price_type,
    })),
    total: row.total,
    status: row.status,
    ...(includeManager ? { managerNote: row.manager_note } : {}),
    statusHistory: getHistory.all(row.id).map((entry) => ({ status: entry.status, at: entry.at })),
    ...(includeDeleted ? { deletedAt: row.deleted_at } : {}),
  }));
}

function resetProducts(db) {
  const now = new Date().toISOString();
  transaction(db, () => {
    const seedIds = new Set(seedProducts.map((product) => product.id));
    for (const row of db.prepare('SELECT id FROM products').all()) {
      if (!seedIds.has(row.id)) db.prepare('UPDATE products SET active = 0, deleted_at = ?, updated_at = ? WHERE id = ?').run(now, now, row.id);
    }
    const upsert = db.prepare(`
      INSERT INTO products (id, number, name, length_mm, width_mm, height_mm, base_price, source_quantity, active, created_at, updated_at, deleted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, NULL)
      ON CONFLICT(id) DO UPDATE SET number = excluded.number, name = excluded.name, length_mm = excluded.length_mm,
        width_mm = excluded.width_mm, height_mm = excluded.height_mm, base_price = excluded.base_price,
        source_quantity = excluded.source_quantity, active = 1, updated_at = excluded.updated_at, deleted_at = NULL
    `);
    for (const product of seedProducts) {
      upsert.run(product.id, product.number, product.name, product.dimensions.length, product.dimensions.width, product.dimensions.height, product.basePrice, product.sourceQuantity ?? null, now, now);
    }
  });
}

function audit(db, actorId, action, entityType, entityId, details) {
  db.prepare('INSERT INTO audit_log (actor_id, action, entity_type, entity_id, details_json, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    .run(actorId, action, entityType, entityId, JSON.stringify(details ?? {}), new Date().toISOString());
}

function safeJson(value) {
  try { return JSON.parse(value); } catch { return {}; }
}

function money(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

async function notifyTelegram(config, order) {
  if (!config.telegramBotToken || !config.telegramChatId) return;
  const lines = [
    `Нова заявка ${order.id}`,
    `${order.customerName} · ${order.phone}`,
    `${order.items.length} поз. · ${order.total.toLocaleString('uk-UA')} грн`,
  ];
  const response = await fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: config.telegramChatId, text: lines.join('\n') }),
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`Telegram returned ${response.status}`);
}

