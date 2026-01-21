import API_BASE_URL from '@/api/apiConfig';

export async function register(
  email: string,
  password: string,
): Promise<{ accessToken: string; user: never }> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Failed to register');
  return response.json();
}

export async function login(
  email: string,
  password: string,
): Promise<{ accessToken: string; user: never }> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Failed to login');
  return response.json();
}

export function logout() {
  localStorage.removeItem('accessToken');
}
