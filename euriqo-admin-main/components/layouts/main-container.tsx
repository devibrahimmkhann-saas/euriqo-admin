'use client';
import { IRootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';

const MainContainer = ({ children }: { children: React.ReactNode }) => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const sidebarOpen = useSelector((state: IRootState) => state.themeConfig.sidebar);
    
    return (
        <div className={`${themeConfig.navbar} main-container min-h-screen text-black dark:text-white-dark ${
            sidebarOpen ? '' : 'toggle-sidebar'
        }`}>
            {children}
        </div>
    );
};

export default MainContainer;
