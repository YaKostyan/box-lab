const TOKEN_KEY = 'toffipacks-api-session-v1';

const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
const configuredBaseUrl = String(viteEnv?.VITE_API_BASE_URL ?? '').trim().replace(/\/$/, '');

export const backendEnabled = Boolean(configuredBaseUrl);

export class ApiRequestError extends Error {
  status: number;
  code: string;

  constructor(status: number, message: string, code = 'request_error') {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function clearApiSession(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function hasApiSession(): boolean {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export interface ApiAccount {
  id: string;
  name: string;
  phone: string;
  company: string;
  role: 'client' | 'admin';
  partner: boolean;
  fixedMarkup: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ApiProduct {
  id: string;
  number: string;
  name: string;
  dimensions: { length: number; width: number; height: number };
  basePrice: number;
  sourceQuantity?: number;
  active: boolean;
  createdAt?: string;
  updatedAt: string;
}

export interface ApiOrderItem {
  productId: string;
  productNumber: string;
  dimensions: { length: number; width: number; height: number };
  quantity: number;
  unitPrice: number;
  total: number;
  priceType: string;
}

export interface ApiOrder {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  company: string;
  comment: string;
  items: ApiOrderItem[];
  total: number;
  accountId?: string;
  status: 'Нова' | 'У роботі' | 'Уточнення' | 'Підтверджена' | 'Закрита';
  managerNote?: string;
  statusHistory: Array<{ status: ApiOrder['status']; at: string }>;
}

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!backendEnabled) throw new ApiRequestError(0, 'Backend API is not configured.', 'api_disabled');
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${configuredBaseUrl}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
  const payload = (await response.json().catch(() => ({}))) as {
    error?: { message?: string; code?: string };
  } & T;
  if (!response.ok) {
    if (response.status === 401) clearApiSession();
    throw new ApiRequestError(
      response.status,
      payload.error?.message ?? 'Сервер не зміг виконати запит.',
      payload.error?.code,
    );
  }
  return payload;
}

async function authRequest(path: string, body: Record<string, unknown>): Promise<ApiAccount> {
  const result = await apiRequest<{ account: ApiAccount; token: string }>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  localStorage.setItem(TOKEN_KEY, result.token);
  return result.account;
}

export const backendApi = {
  products: async () => (await apiRequest<{ products: ApiProduct[] }>('/api/products')).products,
  login: (phone: string, password: string) => authRequest('/api/auth/login', { phone, password }),
  register: (body: { name: string; phone: string; company: string; password: string }) =>
    authRequest('/api/auth/register', body),
  me: async () => (await apiRequest<{ account: ApiAccount }>('/api/auth/me')).account,
  updateMe: async (body: { name: string; phone: string; company: string; password?: string }) =>
    (await apiRequest<{ account: ApiAccount }>('/api/auth/me', { method: 'PATCH', body: JSON.stringify(body) })).account,
  logout: async () => {
    try {
      await apiRequest('/api/auth/logout', { method: 'POST' });
    } finally {
      clearApiSession();
    }
  },
  createOrder: async (body: {
    customerName: string;
    phone: string;
    company: string;
    comment: string;
    items: Array<{ productId: string; quantity: number }>;
  }) => (await apiRequest<{ order: ApiOrder }>('/api/orders', { method: 'POST', body: JSON.stringify(body) })).order,
  myOrders: async () => (await apiRequest<{ orders: ApiOrder[] }>('/api/me/orders')).orders,
  adminProducts: async () => (await apiRequest<{ products: ApiProduct[] }>('/api/admin/products')).products,
  createProduct: async (body: Omit<ApiProduct, 'id' | 'updatedAt'>) =>
    (await apiRequest<{ product: ApiProduct }>('/api/admin/products', { method: 'POST', body: JSON.stringify(body) })).product,
  updateProduct: async (id: string, body: Partial<ApiProduct>) =>
    (await apiRequest<{ product: ApiProduct }>(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(body) })).product,
  deleteProduct: (id: string) => apiRequest<{ ok: true }>(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  resetProducts: async () => (await apiRequest<{ products: ApiProduct[] }>('/api/admin/products/reset', { method: 'POST' })).products,
  adminOrders: async () => (await apiRequest<{ orders: ApiOrder[] }>('/api/admin/orders')).orders,
  updateOrder: async (id: string, body: { status?: ApiOrder['status']; managerNote?: string }) =>
    (await apiRequest<{ order: ApiOrder }>(`/api/admin/orders/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(body) })).order,
  deleteOrder: (id: string) => apiRequest<{ ok: true }>(`/api/admin/orders/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  adminClients: async () => (await apiRequest<{ clients: ApiAccount[] }>('/api/admin/clients')).clients,
  updateClient: async (id: string, body: { partner?: boolean; fixedMarkup?: number }) =>
    (await apiRequest<{ client: ApiAccount }>(`/api/admin/clients/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(body) })).client,
  backup: () => apiRequest<Record<string, unknown>>('/api/admin/backup'),
};

