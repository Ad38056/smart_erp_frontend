export const API_URL = 'http://localhost:5000/api';

export async function registerUser(name, email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error('API register error', { status: res.status, data });
    }

    return { ok: res.ok, status: res.status, data };
  } catch (error) {
    console.error('Network/API error', error);
    return { ok: false, error: error.message };
  }
}

export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error('API login error', { status: res.status, data });
    }

    return { ok: res.ok, status: res.status, data };
  } catch (error) {
    console.error('Network/API error', error);
    return { ok: false, error: error.message };
  }
}
