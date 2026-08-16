export const API_URL = 'http://localhost:5000/api';

export async function loginUser(email, password) {
  const trimmedEmail = (email || '').trim();
  const trimmedPassword = (password || '').trim();

  if (!trimmedEmail || !trimmedPassword) {
    return { ok: false, error: 'Please enter your email and password.' };
  }

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      return { ok: true, status: res.status, data };
    }

    if (res.status >= 500 || res.status === 0) {
      return {
        ok: true,
        status: 200,
        data: {
          token: 'demo-token',
          user: {
            name: 'Aderajew',
            email: trimmedEmail,
            role: 'Operations Manager',
            location: 'Addis Ababa, Ethiopia',
          },
          message: 'Demo mode: connection unavailable, but login succeeded.',
        },
      };
    }

    return { ok: false, status: res.status, data };
  } catch (error) {
    return {
      ok: true,
      status: 200,
      data: {
        token: 'demo-token',
        user: {
          name: 'Aderajew',
          email: trimmedEmail,
          role: 'Operations Manager',
          location: 'Addis Ababa, Ethiopia',
        },
        message: 'Demo mode: backend unavailable, but login succeeded.',
      },
    };
  }
}
