import API_BASE_URL from '@/api/apiConfig';

export async function register(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Failed to register');
  const data = await response.json();
  // Normalize backend { access_token } -> { accessToken }
  return {
    accessToken: data.access_token ?? data.accessToken,
    user: data.user ?? null,
  };
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Failed to login');
  const data = await response.json();
  return {
    accessToken: data.access_token ?? data.accessToken,
    user: data.user ?? null,
  };
}

export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
}
