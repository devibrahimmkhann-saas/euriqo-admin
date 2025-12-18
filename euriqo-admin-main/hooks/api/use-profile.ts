'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { User } from '@/types/auth.types';

// Profile response type
interface ProfileResponse {
  success: true;
  data: {
    user: User;
  };
}

/**
 * Hook to fetch user profile with TanStack Query
 * Automatically fetches on mount and caches the result
 */
export function useProfile(): UseQueryResult<User, Error> {
  return useQuery<User, Error>({
    queryKey: ['auth', 'profile'],
    queryFn: async () => {
      try {
        const response = await api.auth.profile();
        
        if (!response.success || !response.data) {
          throw new Error('Failed to fetch profile');
        }

        const profileData = response.data as ProfileResponse['data'];
        return profileData.user;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch profile');
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

