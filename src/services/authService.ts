import type { LoginCredentials, AuthResponse, ApiError, VerifyOTPRequest, ResetPasswordRequest } from '../types/auth.types';
import { TOKEN_KEY, USER_KEY } from '../constants/storageKeys';
import { MOCK_CREDENTIALS, MOCK_PRODUCER, MOCK_TOKEN } from '../mocks/mockAuth';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api/v1';
const IS_DEV = import.meta.env.DEV || import.meta.env.VITE_USE_MOCK === 'true';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let error: ApiError;
    try {
      error = (await res.json()) as ApiError;
    } catch {
      error = { message: 'An unexpected error occurred', statusCode: res.status };
    }
    throw error;
  }
  return res.json() as Promise<T>;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (IS_DEV) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (
        credentials.email === MOCK_CREDENTIALS.email &&
        credentials.password === MOCK_CREDENTIALS.password
      ) {
        const response: AuthResponse = {
          token: MOCK_TOKEN,
          user: MOCK_PRODUCER,
        };
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        return response;
      }
      throw new Error('Invalid email or password');
    }
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await handleResponse<AuthResponse>(res);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data;
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return handleResponse<{ message: string }>(res);
  },

  async verifyOTP(payload: VerifyOTPRequest): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<{ message: string }>(res);
  },

  async resetPassword(payload: ResetPasswordRequest): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<{ message: string }>(res);
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return localStorage.getItem(TOKEN_KEY) !== null;
  },
};
