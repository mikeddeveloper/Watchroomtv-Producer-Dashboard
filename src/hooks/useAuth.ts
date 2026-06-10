import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthUser } from '../types/auth.types';
import { TOKEN_KEY, USER_KEY } from '../constants/storageKeys';
import { authService } from '../services/authService';

export function useAuth() {
  const navigate = useNavigate();

  const token = localStorage.getItem(TOKEN_KEY);

  let user: AuthUser | null = null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      user = JSON.parse(raw) as AuthUser;
    }
  } catch {
    user = null;
  }

  const logout = useCallback(() => {
    authService.logout();
    navigate('/login');
  }, [navigate]);

  return {
    user,
    isAuthenticated: token !== null,
    logout,
  };
}
