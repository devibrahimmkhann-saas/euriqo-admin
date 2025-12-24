import ComponentsAuthRegisterForm from '@/components/auth/components-auth-register-form';
import ProtectedRoute from '@/components/auth/protected-route';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: 'Euriqo Admin - Sign Up',
};

const SignupPage = () => {
    return (
        <ProtectedRoute requireAuth={false}>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Euriqo Admin</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Create your account</p>
                        </div>
                        
                        <ComponentsAuthRegisterForm />
                        
                        <div className="mt-6 text-center">
                            <p className="text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default SignupPage;


// TARGETS PERDAY 