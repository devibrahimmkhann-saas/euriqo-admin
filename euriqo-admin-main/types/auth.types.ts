// Authentication Types
export interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  plan?: 'free' | 'pro' | 'enterprise';
  role?: 'USER' | 'ADMIN' | 'MODERATOR';
  avatar?: string | null;
  provider?: 'local' | 'google';
  emailVerified?: boolean;
  isVerified?: boolean;
  projects?: any[];
  createdAt: string;
  updatedAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

// Hook return types
export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<T>;
}
