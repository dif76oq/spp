import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  AuthLoginPayload,
  AuthRegisterPayload,
  AuthTokenResponse,
  UserProfile,
} from '../types';
import { BASE_URL, jsonHeaders } from '../utils/api';

interface AuthState {
  token?: string;
  user?: UserProfile;
}

interface AuthContextType extends AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: AuthLoginPayload) => Promise<void>;
  register: (payload: AuthRegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = 'spp-auth-data';

const parseStored = (): AuthState => {
  if (typeof window === 'undefined') {
    return {};
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {};
  }
  try {
    return JSON.parse(stored) as AuthState;
  } catch (error) {
    console.warn('Не удалось прочитать данные авторизации', error);
    return {};
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(() => parseStored());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authState.token && authState.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [authState]);

  const persistAuth = useCallback((token: string, user: UserProfile) => {
    setAuthState({ token, user });
  }, []);

  const login = useCallback(async (payload: AuthLoginPayload) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: jsonHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Не удалось войти в систему');
      }

      const data: AuthTokenResponse = await response.json();
      persistAuth(data.token, { login: data.login, role: data.role });
    } finally {
      setIsLoading(false);
    }
  }, [persistAuth]);

  const register = useCallback(async (payload: AuthRegisterPayload) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: jsonHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Не удалось зарегистрироваться');
      }

      const data: AuthTokenResponse = await response.json();
      persistAuth(data.token, { login: data.login, role: data.role });
    } finally {
      setIsLoading(false);
    }
  }, [persistAuth]);

  const logout = useCallback(() => {
    setAuthState({});
  }, []);

  const value = useMemo<AuthContextType>(() => ({
    token: authState.token,
    user: authState.user,
    isAuthenticated: Boolean(authState.token && authState.user),
    isLoading,
    login,
    register,
    logout,
  }), [authState, isLoading, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

