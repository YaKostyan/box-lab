# ToffiPacks backend

У репозиторії є готовий сервер у `server/`. Він працює на Node.js 24 та вбудованій SQLite, не потребує окремого сервісу бази даних і підходить для одного екземпляра невеликого виробничого сайту.

## Що реалізовано

- реєстрація і вхід за телефоном та паролем;
- `scrypt`-хешування паролів і випадкові bearer-сесії, у базі зберігається тільки хеш токена;
- ролі `client` та `admin`, перевірка прав на кожному admin-маршруті;
- спільний каталог, клієнти, заявки з кількома позиціями, історія статусів та журнал аудиту;
- серверний перерахунок цін — значення з браузера не приймається як довірене;
- транзакційне створення заявки разом із позиціями;
- м’яке видалення товарів і заявок;
- фільтрація заявок за статусом, пошуком та двома датами;
- серверна резервна копія без хешів паролів і токенів;
- CORS allowlist, ліміт розміру JSON, rate limit входу/реєстрації/заявок;
- необов’язкове Telegram-повідомлення про нову заявку.

## Локальний запуск

Потрібен Node.js 24+.

```bash
copy server\.env.example server\.env
node --env-file=server/.env server/index.mjs
```

API відкриється на `http://localhost:8787`. Перевірка:

```bash
pnpm server:test
```

В іншому терміналі запустіть frontend із адресою API з кореневого `.env`:

```bash
pnpm dev
```

## Підключення GitHub Pages

GitHub Pages залишається frontend-хостингом. Сам сервер треба запустити на VPS або контейнерному хостингу з постійним диском. Після отримання HTTPS-адреси API задайте під час збірки:

```text
VITE_API_BASE_URL=https://api.example.com
```

Також додайте точний origin сайта в `ALLOWED_ORIGINS`, наприклад `https://yakostyan.github.io`. Поки `VITE_API_BASE_URL` порожній, сайт продовжує працювати в автономному демо-режимі через `localStorage`.

## Docker

```bash
docker build -t toffipacks-api .
docker run -d --name toffipacks-api \
  -p 8787:8787 \
  -v toffipacks-data:/app/data \
  -e ADMIN_PASSWORD="надійний-пароль" \
  -e ALLOWED_ORIGINS="https://yakostyan.github.io" \
  toffipacks-api
```

У production сервер не запуститься зі стандартним паролем `admin123`.

## Основні маршрути

| Метод | Маршрут | Доступ |
|---|---|---|
| `GET` | `/api/health` | публічний |
| `GET` | `/api/products` | публічний |
| `POST` | `/api/quote` | публічний/клієнт |
| `POST` | `/api/auth/register` | публічний |
| `POST` | `/api/auth/login` | публічний |
| `GET/PATCH` | `/api/auth/me` | авторизований |
| `POST` | `/api/auth/logout` | авторизований |
| `POST` | `/api/orders` | публічний/клієнт |
| `GET` | `/api/me/orders` | клієнт |
| `GET/POST/PATCH/DELETE` | `/api/admin/products` | адміністратор |
| `GET/PATCH/DELETE` | `/api/admin/orders` | адміністратор |
| `GET/PATCH` | `/api/admin/clients` | адміністратор |
| `GET` | `/api/admin/audit` | адміністратор |
| `GET` | `/api/admin/backup` | адміністратор |

## Дані та резервування

База за замовчуванням: `data/toffipacks.sqlite`. У Docker вона має лежати на постійному volume. Для резервування зупиніть контейнер і копіюйте файл бази/volume або завантажуйте JSON-копію з адмінки. Не публікуйте `.sqlite`, `server/.env`, паролі, Telegram-токен чи bearer-токени в Git.

SQLite-варіант розрахований на один серверний екземпляр. Якщо в майбутньому знадобляться кілька серверів або дуже велике навантаження, схему можна перенести на PostgreSQL без зміни frontend API.
