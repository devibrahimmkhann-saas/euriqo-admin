'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/themeConfigSlice';

const Sidebar = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const sidebarOpen = useSelector((state: IRootState) => state.themeConfig.sidebar);

    const menuItems = [
        {
            title: 'Dashboard',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        opacity="0.5"
                        d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path d="M12 15L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
            href: '/dashboard',
        },
        {
            title: 'Twilio / Voice Calls',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            ),
            href: '/dashboard/twilio',
        },
        {
            title: 'System Settings',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <path
                        opacity="0.5"
                        d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2718 6.07301 5.18632 5.82294 5.15224C5.30704 5.08426 4.79912 5.23718 4.4047 5.5608C4 5.89292 3.8 6.40973 3.4 7.44333L3.39999 7.44334C3.0381 8.40058 2.85714 8.87920 2.85714 9.5C2.85714 10.1208 3.0381 10.5994 3.4 11.5567C3.8 12.5903 4 13.1071 4.4047 13.4392C4.79912 13.7628 5.30704 13.9157 5.82294 13.8478C6.07301 13.8137 6.31645 13.7282 6.65219 13.5412C7.14559 13.2805 7.73564 13.27 8.21894 13.5491C8.70226 13.8281 8.98826 14.3443 9.00911 14.902C9.0233 15.2815 9.05957 15.5417 9.15223 15.7654C9.35522 16.2554 9.74457 16.6448 10.2346 16.8478C10.6022 17 11.0681 17 12 17C12.9319 17 13.3978 17 13.7654 16.8478C14.2554 16.6448 14.6448 16.2554 14.8478 15.7654C14.9404 15.5417 14.9767 15.2815 14.9909 14.902C15.0117 14.3443 15.2977 13.8281 15.7811 13.5491C16.2644 13.27 16.8544 13.2805 17.3478 13.5412C17.6835 13.7282 17.927 13.8137 18.1771 13.8478C18.693 13.9157 19.2009 13.7628 19.5953 13.4392C20 13.1071 20.2 12.5903 20.6 11.5567C20.9619 10.5994 21.1429 10.1208 21.1429 9.5C21.1429 8.87920 20.9619 8.40058 20.6 7.44334L20.6 7.44333C20.2 6.40973 20 5.89292 19.5953 5.5608C19.2009 5.23718 18.693 5.08426 18.1771 5.15224C17.927 5.18632 17.6835 5.2718 17.3478 5.45876C16.8544 5.71954 16.2644 5.72996 15.7811 5.45093C15.2977 5.17189 15.0117 4.65568 14.9909 4.09799C14.9767 3.7185 14.9404 3.45834 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
            ),
            href: '/dashboard/settings',
        },
        {
            title: 'Widget / Branding',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path opacity="0.5" d="M6 8L18 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity="0.5" d="M6 12L18 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity="0.5" d="M6 16L18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
            href: '/dashboard/branding',
        },
        {
            title: 'Knowledge Base',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        opacity="0.5"
                        d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
            href: '/dashboard/knowledge-base',
        },
        {
            title: 'Voice & Narrator',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V8Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path opacity="0.5" d="M13.5 8L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity="0.5" d="M13.5 11L17 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity="0.5" d="M7 8L10.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity="0.5" d="M7 11L10.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M20 10V12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
            href: '/dashboard/voice',
        },
        {
            title: 'Messages & Conversations',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            ),
            href: '/dashboard/messages',
        },
        {
            title: 'Analytics',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 18V16M12 18V14M17 18V12M7 14V12M12 10V8M17 8V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path
                        opacity="0.5"
                        d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
            ),
            href: '/dashboard/analytics',
        },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                    onClick={() => dispatch(toggleSidebar())}
                ></div>
            )}
            
            <nav className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
                sidebarOpen ? 'ltr:left-0 rtl:right-0' : 'ltr:-left-[260px] rtl:-right-[260px]'
            } w-[260px] lg:ltr:left-0 lg:rtl:right-0`}>
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/dashboard" className="main-logo flex shrink-0 items-center">
                            <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">
                                Euriqo
                            </span>
                        </Link>
                        
                        {/* Close button for mobile */}
                        <button
                            type="button"
                            className="collapse-icon flex rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                <div className="perfect-scrollbar h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden p-4 pb-16">
                    <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                        {menuItems.map((item, index) => (
                            <li key={index} className="nav-item">
                                <Link
                                    href={item.href}
                                    className={`nav-link group ${
                                        pathname === item.href ? 'active' : ''
                                    }`}
                                    onClick={() => {
                                        // Close sidebar on mobile when clicking a link
                                        if (window.innerWidth < 1024) {
                                            dispatch(toggleSidebar());
                                        }
                                    }}
                                >
                                    <div className="flex items-center">
                                        <div className="shrink-0">{item.icon}</div>
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                                            {item.title}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
        </>
    );
};

export default Sidebar;


// i will gonna use userId as a key 
// teespring xclone 1st phase readiness 