'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import Loading from '@/components/layouts/loading';

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
      router.push(redirectTo);
    } else if (!requireAuth && state.isAuthenticated) {
      // User shouldn't be authenticated but is (e.g., login page when already logged in)
      router.push('/dashboard');
    }
  }, [state.isAuthenticated, state.isLoading, requireAuth, redirectTo, router]);

  // Show loading while checking authentication
  if (state.isLoading) {
    return <Loading />;
  }

  // Show loading while redirecting
  if (requireAuth && !state.isAuthenticated) {
    return <Loading />;
  }

  if (!requireAuth && state.isAuthenticated) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
