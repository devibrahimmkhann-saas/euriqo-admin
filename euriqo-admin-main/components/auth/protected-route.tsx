'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) => {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth check to complete
    if (state.isLoading) return;

    if (requireAuth && !state.isAuthenticated) {
      // User needs to be authenticated but isn't
      router.replace(redirectTo);
    } else if (!requireAuth && state.isAuthenticated) {
      // User shouldn't be authenticated but is (e.g., login page when already logged in)
      router.replace('/dashboard');
    }
  }, [state.isAuthenticated, state.isLoading, requireAuth, redirectTo, router]);

  // Show minimal loading while checking authentication
  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#7444FD] border-r-transparent"></div>
      </div>
    );
  }

  // Show minimal loading while redirecting
  if (requireAuth && !state.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#7444FD] border-r-transparent"></div>
      </div>
    );
  }

  if (!requireAuth && state.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#7444FD] border-r-transparent"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
