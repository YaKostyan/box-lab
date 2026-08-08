import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { products as seedProducts } from '../src/data.ts';
import { createId, hashPassword } from './security.mjs';

const SCHEMA = `
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA busy_timeout = 5000;

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  number TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL,
  length_mm INTEGER NOT NULL CHECK (length_mm > 0),
  width_mm INTEGER NOT NULL CHECK (width_mm > 0),
  height_mm INTEGER NOT NULL CHECK (height_mm > 0),
  base_price REAL NOT NULL CHECK (base_price > 0),
  source_quantity INTEGER,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  company TEXT NOT NULL DEFAULT '',
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('client', 'admin')),
  partner INTEGER NOT NULL DEFAULT 0,
  fixed_markup REAL NOT NULL DEFAULT 0.5 CHECK (fixed_markup >= 0 AND fixed_markup < 1),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  disabled_at TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  revoked_at TEXT
);

CREATE INDEX IF NOT EXISTS sessions_account_idx ON sessions(account_id);
CREATE INDEX IF NOT EXISTS sessions_expiry_idx ON sessions(expires_at);

CREATE TABLE IF NOT EXISTS account_product_prices (
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  unit_price REAL NOT NULL CHECK (unit_price > 0 AND unit_price <= 10000),
  updated_at TEXT NOT NULL,
  PRIMARY KEY (account_id, product_id)
);

CREATE INDEX IF NOT EXISTS account_product_prices_product_idx ON account_product_prices(product_id);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  comment TEXT NOT NULL DEFAULT '',
  account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL,
  total REAL NOT NULL CHECK (total >= 0),
  status TEXT NOT NULL CHECK (status IN ('Нова', 'У роботі', 'Уточнення', 'Підтверджена', 'Закрита')),
  manager_note TEXT NOT NULL DEFAULT '',
  deleted_at TEXT
);

CREATE INDEX IF NOT EXISTS orders_created_idx ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS orders_account_idx ON orders(account_id, created_at DESC);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status, created_at DESC);

CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE SET NULL,
  product_number TEXT NOT NULL,
  length_mm INTEGER NOT NULL,
  width_mm INTEGER NOT NULL,
  height_mm INTEGER NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity BETWEEN 1 AND 50000),
  unit_price REAL NOT NULL CHECK (unit_price >= 0),
  total REAL NOT NULL CHECK (total >= 0),
  price_type TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS order_items_order_idx ON order_items(order_id);

CREATE TABLE IF NOT EXISTS order_status_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  at TEXT NOT NULL,
  actor_id TEXT REFERENCES accounts(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor_id TEXT REFERENCES accounts(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS audit_created_idx ON audit_log(created_at DESC);
`;

export function createDatabase({ path, adminPhone, adminPassword }) {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(SCHEMA);
  seedCatalog(db);
  seedAdmin(db, adminPhone, adminPassword);
  migrateLegacyPartnerPrices(db);
  return db;
}

function migrateLegacyPartnerPrices(db) {
  const now = new Date().toISOString();
  db.prepare(`
    INSERT OR IGNORE INTO account_product_prices (account_id, product_id, unit_price, updated_at)
    SELECT accounts.id, products.id, ROUND(products.base_price + accounts.fixed_markup, 2), ?
    FROM accounts
    CROSS JOIN products
    WHERE accounts.partner = 1
      AND accounts.disabled_at IS NULL
      AND products.deleted_at IS NULL
      AND NOT EXISTS (
        SELECT 1 FROM account_product_prices existing
        WHERE existing.account_id = accounts.id
      )
  `).run(now);
}

function seedCatalog(db) {
  const count = db.prepare('SELECT COUNT(*) AS count FROM products WHERE deleted_at IS NULL').get().count;
  if (count > 0) return;
  const now = new Date().toISOString();
  const insert = db.prepare(`
    INSERT INTO products
      (id, number, name, length_mm, width_mm, height_mm, base_price, source_quantity, active, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
  `);
  transaction(db, () => {
    for (const product of seedProducts) {
      insert.run(
        product.id,
        product.number,
        product.name,
        product.dimensions.length,
        product.dimensions.width,
        product.dimensions.height,
        product.basePrice,
        product.sourceQuantity ?? null,
        now,
        now,
      );
    }
  });
}

function seedAdmin(db, phone, password) {
  const existing = db.prepare("SELECT id FROM accounts WHERE role = 'admin' LIMIT 1").get();
  if (existing) return;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO accounts
      (id, name, phone, company, password_hash, role, partner, fixed_markup, created_at, updated_at)
    VALUES (?, ?, ?, 'ToffiPacks', ?, 'admin', 0, 0.5, ?, ?)
  `).run(createId('account'), 'Адміністратор ToffiPacks', phone, hashPassword(password), now, now);
}

export function transaction(db, action) {
  db.exec('BEGIN IMMEDIATE');
  try {
    const result = action();
    db.exec('COMMIT');
    return result;
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

export function closeDatabase(db) {
  try {
    db.exec('PRAGMA optimize');
  } finally {
    db.close();
  }
}
