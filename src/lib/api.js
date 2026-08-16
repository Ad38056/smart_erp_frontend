export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, { method = 'GET', body = null, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = auth ? localStorage.getItem('token') : null;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { ok: false, status: res.status, error: data.message || 'Request failed', data };
  }

  return { ok: true, status: res.status, data };
}

export async function loginUser(email, password) {
  const trimmedEmail = (email || '').trim();
  const trimmedPassword = (password || '').trim();

  if (!trimmedEmail || !trimmedPassword) {
    return { ok: false, error: 'Please enter your email and password.' };
  }

  return request('/auth/login', {
    method: 'POST',
    body: { email: trimmedEmail, password: trimmedPassword },
  });
}

export async function registerUser(name, email, password) {
  return request('/auth/register', {
    method: 'POST',
    body: { name, email, password },
  });
}

export async function fetchDashboard() {
  return request('/dashboard', { auth: true });
}

export async function fetchProducts() {
  return request('/products', { auth: true });
}

export async function createProduct(payload) {
  return request('/products', { method: 'POST', body: payload, auth: true });
}

export async function updateProduct(id, payload) {
  return request(`/products/${id}`, { method: 'PUT', body: payload, auth: true });
}

export async function deleteProduct(id) {
  return request(`/products/${id}`, { method: 'DELETE', auth: true });
}

export async function fetchCustomers() {
  return request('/customers', { auth: true });
}

export async function createCustomer(payload) {
  return request('/customers', { method: 'POST', body: payload, auth: true });
}

export async function fetchOrders() {
  return request('/orders', { auth: true });
}

export async function fetchSuppliers() {
  return request('/suppliers', { auth: true });
}

export async function createSupplier(payload) {
  return request('/suppliers', { method: 'POST', body: payload, auth: true });
}

export async function fetchProfile() {
  return { ok: true, data: JSON.parse(localStorage.getItem('user') || '{}') };
}
