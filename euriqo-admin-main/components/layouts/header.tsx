'use client';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { useAuth } from '@/contexts/auth-context';
import { useProfile } from '@/hooks/api';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { logout, state } = useAuth();
    const { data: profileData, isLoading: isProfileLoading } = useProfile();

    // Get user info - prioritize profile API data, fallback to auth context
    const user = profileData || state.user;
    const userName = user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'John Doe';
    const userEmail = user?.email || 'user@example.com';
    const userPlan = user?.plan || 'free';

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/auth/login');
    };

    const handleProfileClick = () => {
        setShowProfileDropdown(false);
        router.push('/dashboard/profile');
    };

    return (
        <header className="z-40 shadow">
            <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
                {/* Mobile Toggle Button */}
                <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
                    <button
                        type="button"
                        className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary"
                        onClick={() => dispatch(toggleSidebar())}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0">
                    {/* Desktop Toggle Button */}
                    <button
                        type="button"
                        className="collapse-icon hidden lg:flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary transition-all duration-300"
                        onClick={() => dispatch(toggleSidebar())}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
                        <h2 className="text-xl font-semibold text-primary">Euriqo Admin</h2>
                    </div>
                    
                    {/* Profile Dropdown */}
                    <div className="dropdown shrink-0 relative" ref={dropdownRef}>
                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60 transition-all"
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        >
                            {/* Avatar */}
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-semibold">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                            
                            {/* User Info - Hidden on mobile */}
                            <div className="hidden md:block text-left">
                                <div className="text-sm font-semibold text-black dark:text-white">
                                    {userName}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                    {userPlan} Plan
                                </div>
                            </div>

                            {/* Dropdown Arrow */}
                            <svg
                                className={`h-4 w-4 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`}
                                fill="none"
                                    stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {showProfileDropdown && (
                            <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                                <div className="py-1">
                                    {/* User Info Section */}
                                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
                                                {userName.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {userName}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                    {userEmail}
                                                </p>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary capitalize mt-1">
                                                    {userPlan} Plan
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <button
                                        onClick={handleProfileClick}
                                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>My Profile</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setShowProfileDropdown(false);
                                            router.push('/dashboard/settings');
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>Settings</span>
                                    </button>

                                    <div className="border-t border-gray-200 dark:border-gray-700"></div>

                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
