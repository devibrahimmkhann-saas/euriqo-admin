'use client';
import { Metadata } from 'next';
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-white">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome to Euriqo Admin Dashboard</p>
                {isMobile && (
                    <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                        💡 Swipe horizontally to view all cards
                    </p>
                )}
            </div>

            {/* Stats Cards */}
            <div className={`mb-6 text-white ${
                isMobile ? 'dashboard-grid horizontal-scroll' : 'dashboard-grid'
            }`}>
                <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Total Users</div>
                        <div className="dropdown">
                            <svg className="h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">1,234</div>
                        <div className="badge bg-white/30">+ 2.35%</div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <svg className="h-5 w-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                opacity="0.5"
                                d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        Last Week 44,700
                    </div>
                </div>

                <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Voice Interactions</div>
                        <div className="dropdown">
                            <svg className="h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">8,549</div>
                        <div className="badge bg-white/30">+ 18.2%</div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <svg className="h-5 w-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V8Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <path d="M20 10V12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Last Week 25,093
                    </div>
                </div>

                <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Active Conversations</div>
                        <div className="dropdown">
                            <svg className="h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">423</div>
                        <div className="badge bg-white/30">- 2.2%</div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <svg className="h-5 w-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.5 12.5L10.5 14.5L15.5 9.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                opacity="0.5"
                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                        </svg>
                        Last Week 454
                    </div>
                </div>

                <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Knowledge Base Items</div>
                        <div className="dropdown">
                            <svg className="h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">156</div>
                        <div className="badge bg-white/30">+ 5.1%</div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <svg className="h-5 w-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                opacity="0.5"
                                d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Last Week 142
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className={`${
                isMobile ? 'quick-actions-grid horizontal-scroll' : 'quick-actions-grid'
            }`}>
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Quick Actions</h5>
                    </div>
                    <div className="space-y-4">
                        <button className="btn btn-primary w-full">
                            <svg className="h-5 w-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.1007 13.359L16.5562 12.9062C17.1858 12.2801 18.1672 12.1515 18.9728 12.5894L20.8833 13.628C22.1102 14.2949 22.3806 15.9295 21.4217 16.883L20.0011 18.2954C19.6399 18.6546 19.1917 18.9171 18.6763 18.9651M4.00289 5.74561C3.96765 5.12559 4.25823 4.56668 4.69185 4.13552L6.26145 2.57483C7.13596 1.70529 8.61028 1.83992 9.37326 2.85908L10.6342 4.54348C11.2507 5.36691 11.1841 6.49484 10.4775 7.19738L10.1907 7.48257"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path
                                    opacity="0.5"
                                    d="M18.6763 18.9651C17.0469 19.117 13.0622 18.9492 8.8154 14.7266C4.81076 10.7447 4.09308 7.33182 4.00293 5.74561"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                            </svg>
                            Test Voice Call
                        </button>
                        <button className="btn btn-secondary w-full">
                            <svg className="h-5 w-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    opacity="0.5"
                                    d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            Add Knowledge Base Item
                        </button>
                        <button className="btn btn-success w-full">
                            <svg className="h-5 w-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                                <path
                                    opacity="0.5"
                                    d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2718 6.07301 5.18632 5.82294 5.15224C5.30704 5.08426 4.79912 5.23718 4.4047 5.5608C4 5.89292 3.8 6.40973 3.4 7.44333L3.39999 7.44334C3.0381 8.40058 2.85714 8.87920 2.85714 9.5C2.85714 10.1208 3.0381 10.5994 3.4 11.5567C3.8 12.5903 4 13.1071 4.4047 13.4392C4.79912 13.7628 5.30704 13.9157 5.82294 13.8478C6.07301 13.8137 6.31645 13.7282 6.65219 13.5412C7.14559 13.2805 7.73564 13.27 8.21894 13.5491C8.70226 13.8281 8.98826 14.3443 9.00911 14.902C9.0233 15.2815 9.05957 15.5417 9.15223 15.7654C9.35522 16.2554 9.74457 16.6448 10.2346 16.8478C10.6022 17 11.0681 17 12 17C12.9319 17 13.3978 17 13.7654 16.8478C14.2554 16.6448 14.6448 16.2554 14.8478 15.7654C14.9404 15.5417 14.9767 15.2815 14.9909 14.902C15.0117 14.3443 15.2977 13.8281 15.7811 13.5491C16.2644 13.27 16.8544 13.2805 17.3478 13.5412C17.6835 13.7282 17.927 13.8137 18.1771 13.8478C18.693 13.9157 19.2009 13.7628 19.5953 13.4392C20 13.1071 20.2 12.5903 20.6 11.5567C20.9619 10.5994 21.1429 10.1208 21.1429 9.5C21.1429 8.87920 20.9619 8.40058 20.6 7.44334L20.6 7.44333C20.2 6.40973 20 5.89292 19.5953 5.5608C19.2009 5.23718 18.693 5.08426 18.1771 5.15224C17.927 5.18632 17.6835 5.2718 17.3478 5.45876C16.8544 5.71954 16.2644 5.72996 15.7811 5.45093C15.2977 5.17189 15.0117 4.65568 14.9909 4.09799C14.9767 3.7185 14.9404 3.45834 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                            </svg>
                            Configure Settings
                        </button>
                    </div>
                </div>

                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Recent Activity</h5>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.1007 13.359L16.5562 12.9062C17.1858 12.2801 18.1672 12.1515 18.9728 12.5894L20.8833 13.628C22.1102 14.2949 22.3806 15.9295 21.4217 16.883L20.0011 18.2954C19.6399 18.6546 19.1917 18.9171 18.6763 18.9651M4.00289 5.74561C3.96765 5.12559 4.25823 4.56668 4.69185 4.13552L6.26145 2.57483C7.13596 1.70529 8.61028 1.83992 9.37326 2.85908L10.6342 4.54348C11.2507 5.36691 11.1841 6.49484 10.4775 7.19738L10.1907 7.48257"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                            <div className="ltr:ml-3 rtl:mr-3">
                                <p className="text-xs text-primary">25 Dec</p>
                                <h5 className="font-semibold text-[#515365] dark:text-white-dark">Voice call completed</h5>
                                <p className="text-xs text-white-dark">User interaction with AI assistant</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-light dark:bg-success text-success dark:text-success-light">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="ltr:ml-3 rtl:mr-3">
                                <p className="text-xs text-primary">24 Dec</p>
                                <h5 className="font-semibold text-[#515365] dark:text-white-dark">Knowledge base updated</h5>
                                <p className="text-xs text-white-dark">New FAQ items added</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning-light dark:bg-warning text-warning dark:text-warning-light">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </div>
                            <div className="ltr:ml-3 rtl:mr-3">
                                <p className="text-xs text-primary">23 Dec</p>
                                <h5 className="font-semibold text-[#515365] dark:text-white-dark">Settings configured</h5>
                                <p className="text-xs text-white-dark">Voice settings updated</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
