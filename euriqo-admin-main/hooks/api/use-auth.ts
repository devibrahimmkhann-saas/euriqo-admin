'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api, ApiError } from '@/lib/api-client';
import { LoginRequest, RegisterRequest, ApiResponse, User, AuthTokens } from '@/types/auth.types';
import { TokenStorage } from '@/utils/token-storage';
import { useAuth } from '@/contexts/auth-context';

// Response types matching the API
interface AuthSuccessResponse {
  success: true;
  message: string;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

interface AuthErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

type AuthApiResponse = AuthSuccessResponse | AuthErrorResponse;

/**
 * Hook for user signup with TanStack Query
 * Automatically stores tokens and redirects to dashboard on success
 */
export function useSignup(): UseMutationResult<AuthSuccessResponse, Error, RegisterRequest> {
  const router = useRouter();
  const { updateAuthState } = useAuth();

  return useMutation<AuthSuccessResponse, Error, RegisterRequest>({
    mutationKey: ['auth', 'signup'],
    mutationFn: async (userData: RegisterRequest) => {
      try {
        const response = await api.auth.signup(userData);

        // Type guard to check if response is successful
        if (!response.success) {
          throw new Error(response.message || 'Signup failed');
        }

        return response as AuthSuccessResponse;
      } catch (error) {
        if (error instanceof ApiError) {
          throw new Error(error.message);
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      const { user, tokens } = data.data;

      // Store tokens and user data
      TokenStorage.setTokens(tokens);
      TokenStorage.setUser(user);

      // Update auth context
      updateAuthState(user, tokens);

      // Redirect to dashboard
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Signup failed:', error);
    },
  });
}

/**
 * Hook for user login with TanStack Query
 * Automatically stores tokens and redirects to dashboard on success
 */
export function useLogin(): UseMutationResult<AuthSuccessResponse, Error, LoginRequest> {
  const router = useRouter();
  const { updateAuthState } = useAuth();

  return useMutation<AuthSuccessResponse, Error, LoginRequest>({
    mutationKey: ['auth', 'login'],
    mutationFn: async (credentials: LoginRequest) => {
      try {
        const response = await api.auth.login(credentials);

        if (!response.success) {
          throw new Error(response.message || 'Login failed');
        }

        return response as AuthSuccessResponse;
      } catch (error) {
        if (error instanceof ApiError) {
          throw new Error(error.message);
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      const { user, tokens } = data.data;

      // Store tokens and user data
      TokenStorage.setTokens(tokens);
      TokenStorage.setUser(user);

      // Update auth context
      updateAuthState(user, tokens);

      // Redirect to dashboard
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
}

/**
 * Hook for user logout
 * Clears tokens and redirects to login page
 */
export function useLogout(): UseMutationResult<void, Error, void> {
  const router = useRouter();
  const { clearAuthState } = useAuth();

  return useMutation<void, Error, void>({
    mutationKey: ['auth', 'logout'],
    mutationFn: async () => {
      try {
        // Call logout endpoint (optional - for server-side cleanup)
        await api.auth.logout();
      } catch (error) {
        // Even if the API call fails, we still want to clear local state
        console.error('Logout API call failed:', error);
      }
    },
    onSuccess: () => {
      // Clear tokens and user data
      TokenStorage.clearAll();

      // Clear auth context
      clearAuthState();

      // Redirect to login
      router.push('/auth/login');
    },
  });
}

