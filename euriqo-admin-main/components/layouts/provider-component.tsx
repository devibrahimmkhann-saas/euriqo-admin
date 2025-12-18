'use client';
import App from '@/App';
import store from '@/store';
import { Provider } from 'react-redux';
import React, { ReactNode, Suspense } from 'react';
import Loading from '@/components/layouts/loading';
import { AuthProvider } from '@/contexts/auth-context';
import { QueryProvider } from '@/components/providers/query-provider';

interface IProps {
    children?: ReactNode;
}

const ProviderComponent = ({ children }: IProps) => {
    return (
        <Provider store={store}>
            <QueryProvider>
                <AuthProvider>
                    <Suspense fallback={<Loading />}>
                        <App>{children}</App>
                    </Suspense>
                </AuthProvider>
            </QueryProvider>
        </Provider>
    );
};

export default ProviderComponent;
