const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

export type AuthUser = { id: string; username: string; email: string };
export type AuthResponse = { token: string; user: AuthUser; message?: string };

type RequestInitInput = Omit<RequestInit, 'body' | 'method'>;

async function request<T>(path: string, options: RequestInitInput & { body?: unknown; method?: string } = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method || 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = (await res.json().catch(() => ({}))) as any;
  if (!res.ok) {
    const message = data?.message || 'Request failed';
    throw new Error(message);
  }
  return data as T;
}

export function registerUser(payload: { username: string; email: string; password: string }) {
  return request<AuthResponse>('/api/auth/register', { body: payload });
}

export function loginUser(payload: { emailOrUsername: string; password: string }) {
  return request<AuthResponse>('/api/auth/login', { body: payload });
}
