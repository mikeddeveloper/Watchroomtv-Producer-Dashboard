import type { AuthUser } from '../types/auth.types';
import type {
  ChangePasswordPayload,
  UpdateProfilePicturePayload,
  UpdateSettingsResponse,
  UpdateUsernamePayload,
} from '../types/settings.types';
import { TOKEN_KEY, USER_KEY } from '../constants/storageKeys';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api/v1';
const IS_DEV = import.meta.env.DEV;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function throwFromResponse(res: Response): Promise<never> {
  let msg = 'An unexpected error occurred';
  try {
    const body = (await res.json()) as { message?: string };
    if (body.message) msg = body.message;
  } catch {
    // ignore parse error
  }
  throw new Error(msg);
}

export const settingsService = {
  async updateUsername(payload: UpdateUsernamePayload): Promise<UpdateSettingsResponse> {
    if (IS_DEV) {
      await delay(800);
      const raw = localStorage.getItem(USER_KEY);
      const existing = raw ? (JSON.parse(raw) as AuthUser) : null;
      if (!existing) throw new Error('User session not found');
      const updated: AuthUser = { ...existing, username: payload.username };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return { message: 'Username updated successfully', user: updated };
    }
    const res = await fetch(`${API_BASE}/producers/username`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(payload),
    });
    if (!res.ok) await throwFromResponse(res);
    return (await res.json()) as UpdateSettingsResponse;
  },

  async updateProfilePicture(payload: UpdateProfilePicturePayload): Promise<UpdateSettingsResponse> {
    if (IS_DEV) {
      await delay(1000);
      const objectUrl = URL.createObjectURL(payload.file);
      const raw = localStorage.getItem(USER_KEY);
      const existing = raw ? (JSON.parse(raw) as AuthUser) : null;
      if (!existing) throw new Error('User session not found');
      const updated: AuthUser = { ...existing, profilePicture: objectUrl };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return { message: 'Profile picture updated successfully', user: updated };
    }
    const formData = new FormData();
    formData.append('profilePicture', payload.file);
    const res = await fetch(`${API_BASE}/producers/profile-picture`, {
      method: 'POST',
      headers: { ...getAuthHeaders() },
      body: formData,
    });
    if (!res.ok) await throwFromResponse(res);
    return (await res.json()) as UpdateSettingsResponse;
  },

  async changePassword(payload: ChangePasswordPayload): Promise<UpdateSettingsResponse> {
    if (IS_DEV) {
      await delay(800);
      if (payload.currentPassword !== 'WatchRoom@2025') {
        throw new Error('Current password is incorrect');
      }
      return { message: 'Password changed successfully' };
    }
    const res = await fetch(`${API_BASE}/producers/password`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(payload),
    });
    if (!res.ok) await throwFromResponse(res);
    return (await res.json()) as UpdateSettingsResponse;
  },
};
