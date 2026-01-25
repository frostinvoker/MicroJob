import { Platform } from 'react-native';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE
  || (Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000');

console.log('API Base URL:', API_BASE, 'Platform:', Platform.OS);

export type AuthUser = { id: string; username: string; email: string };
export type AuthResponse = { token: string; user: AuthUser; message?: string };

type RequestInitInput = Omit<RequestInit, 'body' | 'method'>;

async function request<T>(path: string, options: RequestInitInput & { body?: unknown; method?: string } = {}): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    console.log('Fetching:', `${API_BASE}${path}`);
    const res = await fetch(`${API_BASE}${path}`, {
      method: options.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = (await res.json().catch(() => ({}))) as any;
    if (!res.ok) {
      const message = data?.message || 'Request failed';
      throw new Error(message);
    }
    return data as T;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - could not connect to server');
    }
    throw error;
  }
}

export function registerUser(payload: { username: string; email: string; password: string }) {
  return request<AuthResponse>('/api/auth/register', { body: payload });
}

export function loginUser(payload: { emailOrUsername: string; password: string }) {
  return request<AuthResponse>('/api/auth/login', { body: payload });
}
