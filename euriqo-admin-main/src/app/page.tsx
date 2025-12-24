'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TokenStorage } from '@/utils/token-storage';

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const isAuthenticated = TokenStorage.isAuthenticated();
      
      if (isAuthenticated) {
        // User is authenticated, redirect to dashboard
        router.replace('/dashboard');
      } else {
        // User is not authenticated, redirect to login
        router.replace('/auth/login');
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, [router]);

  // Show minimal loading state
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#7444FD] border-r-transparent"></div>
        </div>
      </div>
    );
  }

  return null;
}
