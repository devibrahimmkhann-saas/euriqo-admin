import ComponentsAuthLoginForm from '@/components/auth/components-auth-login-form';

import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: 'Euriqo Admin - Login',
};

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Euriqo Admin</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
                    </div>
                    
                    <ComponentsAuthLoginForm />
                    
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Don&apos;t have an account?{' '}
                            <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
