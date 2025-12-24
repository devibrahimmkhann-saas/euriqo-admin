'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthTokens, AuthState, LoginRequest, RegisterRequest } from '@/types/auth.types';
import { TokenStorage } from '@/utils/token-storage';
import { api, ApiError } from '@/lib/api-client';

// Action types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; tokens: AuthTokens } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial state
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true to check existing auth
  error: null,
};

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

// Context interface
interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
  updateAuthState: (user: User, tokens: AuthTokens) => void;
  clearAuthState: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      // Check if tokens exist in storage
      const tokens = TokenStorage.getTokens();
      const user = TokenStorage.getUser();

      if (!tokens || !user) {
        dispatch({ type: 'AUTH_LOGOUT' });
        return;
      }

      // Check if access token is expired
      if (TokenStorage.isAccessTokenExpired()) {
        // Try to refresh token
        try {
          const response = await api.auth.refreshToken(tokens.refreshToken);
          
          if (response.success && response.data) {
            const { user: refreshedUser, tokens: newTokens } = response.data;
            
            // Store new tokens
            TokenStorage.setTokens(newTokens);
            TokenStorage.setUser(refreshedUser);
            
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: { user: refreshedUser, tokens: newTokens },
            });
          } else {
            throw new Error('Token refresh failed');
          }
        } catch (error) {
          // Refresh failed, logout user
          TokenStorage.clearAll();
          dispatch({ type: 'AUTH_LOGOUT' });
          return;
        }
      } else {
        // Token is still valid - set auth immediately without loading
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, tokens },
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      TokenStorage.clearAll();
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  // Login function
  const login = async (credentials: LoginRequest) => {
    try {
      dispatch({ type: 'AUTH_START' });

      const response = await api.auth.login(credentials);

      if (response.success && response.data) {
        const { user, tokens } = response.data;

        // Store tokens and user data
        TokenStorage.setTokens(tokens);
        TokenStorage.setUser(user);

        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, tokens },
        });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';

      dispatch({
        type: 'AUTH_ERROR',
        payload: errorMessage,
      });
      throw error; // Re-throw for component handling
    }
  };

  // Register function
  const register = async (userData: RegisterRequest) => {
    try {
      dispatch({ type: 'AUTH_START' });

      const response = await api.auth.register(userData);

      if (response.success && response.data) {
        const { user, tokens } = response.data;

        // Store tokens and user data
        TokenStorage.setTokens(tokens);
        TokenStorage.setUser(user);

        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, tokens },
        });
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';

      dispatch({
        type: 'AUTH_ERROR',
        payload: errorMessage,
      });
      throw error; // Re-throw for component handling
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Call logout API (optional, for server-side cleanup)
      api.auth.logout().catch(console.error);
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local storage and update state
      TokenStorage.clearAll();
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Update auth state (for TanStack Query hooks)
  const updateAuthState = (user: User, tokens: AuthTokens) => {
    dispatch({
      type: 'AUTH_SUCCESS',
      payload: { user, tokens },
    });
  };

  // Clear auth state (for TanStack Query hooks)
  const clearAuthState = () => {
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const contextValue: AuthContextType = {
    state,
    login,
    register,
    logout,
    clearError,
    checkAuth,
    updateAuthState,
    clearAuthState,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Export context for advanced usage
export { AuthContext };
