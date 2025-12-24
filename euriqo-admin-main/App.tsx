'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { toggleRTL, toggleTheme, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from '@/store/themeConfigSlice';

function App({ children }: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load theme config from localStorage synchronously
        const loadThemeConfig = () => {
            if (typeof window !== 'undefined') {
                const theme = localStorage.getItem('theme') || themeConfig.theme;
                const menu = localStorage.getItem('menu') || themeConfig.menu;
                const layout = localStorage.getItem('layout') || themeConfig.layout;
                const rtlClass = localStorage.getItem('rtlClass') || themeConfig.rtlClass;
                const animation = localStorage.getItem('animation') || themeConfig.animation;
                const navbar = localStorage.getItem('navbar') || themeConfig.navbar;
                const semidark = localStorage.getItem('semidark') || themeConfig.semidark;

                dispatch(toggleTheme(theme));
                dispatch(toggleMenu(menu));
                dispatch(toggleLayout(layout));
                dispatch(toggleRTL(rtlClass));
                dispatch(toggleAnimation(animation));
                dispatch(toggleNavbar(navbar));
                dispatch(toggleSemidark(semidark));
            }
            
            setIsLoading(false);
        };

        loadThemeConfig();
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.semidark]);

    return (
        <div
            className={`${(themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section relative font-nunito text-sm font-normal antialiased`}
        >
            {isLoading ? (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#7444FD] border-r-transparent"></div>
                </div>
            ) : (
                children
            )}
        </div>
    );
}

export default App;
