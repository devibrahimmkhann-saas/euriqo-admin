'use client';
import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { useProfile, useProjects } from '@/hooks/api';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const { data: user } = useProfile();
    const { data: projectsData, isLoading: projectsLoading } = useProjects();
    const router = useRouter();
    
    const projects = projectsData?.projects || [];
    const hasProjects = projects.length > 0;
    const userName = user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'there';

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Show onboarding tooltip if user has no projects
    useEffect(() => {
        if (user && !hasProjects) {
            const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
            if (!hasSeenOnboarding) {
                setShowOnboarding(true);
            }
        }
    }, [user, hasProjects]);

    const handleCreateProject = () => {
        // Close onboarding tooltip
        if (showOnboarding) {
            localStorage.setItem('hasSeenOnboarding', 'true');
            setShowOnboarding(false);
        }
        // Navigate to create project page (you can change this route)
        router.push('/dashboard/projects/create');
    };

    const closeOnboarding = () => {
        localStorage.setItem('hasSeenOnboarding', 'true');
        setShowOnboarding(false);
    };

    // Handle copy public key
    const handleCopyPublicKey = (publicId: string, projectName: string) => {
        navigator.clipboard.writeText(publicId);
        Swal.fire({
            icon: 'success',
            title: 'Copied!',
            text: `Public key for "${projectName}" copied to clipboard`,
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
        });
    };

    // Handle view project
    const handleViewProject = (projectId: string) => {
        router.push(`/dashboard/projects/${projectId}`);
    };

    return (
        <div>
            {/* Header with Create Project Button */}
            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">
                        Welcome back, {userName}! 👋
                    </h1>
                    <p className="dashboard-subtitle">
                        Here's what's happening with your projects today
                    </p>
                </div>
                
                {/* Create Project Button with Tooltips */}
                <div className="relative group">
                    <button 
                        onClick={handleCreateProject}
                        className="create-project-btn"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Create Project</span>
                    </button>

                    {/* Onboarding Tooltip - For users with NO projects */}
                    {showOnboarding && !hasProjects && (
                        <div className="onboarding-tooltip">
                            <button 
                                onClick={closeOnboarding}
                                className="onboarding-close"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="onboarding-icon">
                                <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        d="M12 2L2 7L12 12L22 7L12 2Z" 
                                        fill="white" 
                                        opacity="0.9"
                                    />
                                    <path 
                                        d="M2 17L12 22L22 17" 
                                        stroke="white" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        opacity="0.9"
                                    />
                                    <path 
                                        d="M2 12L12 17L22 12" 
                                        stroke="white" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        opacity="0.9"
                                    />
                                </svg>
                            </div>
                            <h4 className="onboarding-title">Get Started!</h4>
                            <p className="onboarding-text">
                                Create your first project to unlock the full potential of Euriqo
                            </p>
                            <div className="onboarding-arrow"></div>
                        </div>
                    )}

                    {/* Hover Tooltip - For users WITH projects */}
                    {hasProjects && (
                        <div className="create-project-hover-tooltip">
                            <p className="hover-tooltip-text">
                                ✨ Start a new project and expand your possibilities
                            </p>
                            <div className="hover-tooltip-arrow"></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Cards - Enterprise Design */}
            <div className={`mb-6 ${
                isMobile ? 'dashboard-grid horizontal-scroll' : 'dashboard-grid'
            }`}>
                <div className="stat-card stat-card-primary">
                    <div className="stat-card-header">
                        <div className="stat-card-icon">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    opacity="0.5"
                                    d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <div className="stat-card-menu">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="stat-card-body">
                        <p className="stat-card-label">Total Users</p>
                        <div className="stat-card-value-row">
                            <h3 className="stat-card-value">1,234</h3>
                            <span className="stat-badge stat-badge-success">+ 2.35%</span>
                        </div>
                        <p className="stat-card-footer">
                            <span className="stat-card-footer-label">Last Week:</span> 44,700
                        </p>
                    </div>
                </div>

       {/* TEMPORARY COMMENTED OUT */}
                <div className="stat-card stat-card-secondary">
                    <div className="stat-card-header">
                        <div className="stat-card-icon">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V8Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path d="M20 10V12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="stat-card-menu">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
             
                    <div className="stat-card-body">
                        {/* <p className="stat-card-label">Voice Interactions</p> */}
                        <p className="stat-card-label">Closed Conversations</p>
                        <div className="stat-card-value-row">
                            <h3 className="stat-card-value">8,549</h3>
                            <span className="stat-badge stat-badge-success">+ 18.2%</span>
                        </div>
                        <p className="stat-card-footer">
                            <span className="stat-card-footer-label">Last Week:</span> 25,093
                        </p>
                    </div>
                </div>

                <div className="stat-card stat-card-info">
                    <div className="stat-card-header">
                        <div className="stat-card-icon">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        </div>
                        <div className="stat-card-menu">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="stat-card-body">
                        <p className="stat-card-label">Active Conversations</p>
                        <div className="stat-card-value-row">
                            <h3 className="stat-card-value">423</h3>
                            <span className="stat-badge stat-badge-danger">- 2.2%</span>
                        </div>
                        <p className="stat-card-footer">
                            <span className="stat-card-footer-label">Last Week:</span> 454
                        </p>
                    </div>
                </div>

                <div className="stat-card stat-card-warning">
                    <div className="stat-card-header">
                        <div className="stat-card-icon">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    opacity="0.5"
                                    d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="stat-card-menu">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="stat-card-body">
                        <p className="stat-card-label">Knowledge Base Items</p>
                        <div className="stat-card-value-row">
                            <h3 className="stat-card-value">156</h3>
                            <span className="stat-badge stat-badge-success">+ 5.1%</span>
                        </div>
                        <p className="stat-card-footer">
                            <span className="stat-card-footer-label">Last Week:</span> 142
                        </p>
                    </div>
                </div>
            </div>

            {/* Projects Section */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Projects</h2>
                    {projectsData && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {projectsData.count} of {projectsData.plan === 'free' ? projectsData.limits.free : projectsData.plan === 'pro' ? projectsData.limits.pro : projectsData.limits.enterprise} projects
                        </span>
                    )}
                </div>

                {projectsLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#7444FD] border-r-transparent"></div>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="panel text-center py-12">
                        <div className="mb-4">
                            <svg className="h-16 w-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No projects yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">Get started by creating your first project</p>
                        <button
                            onClick={handleCreateProject}
                            className="btn btn-primary"
                            style={{
                                background: 'linear-gradient(135deg, #7444FD 0%, #9d6fff 100%)',
                                border: 'none'
                            }}
                        >
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Your First Project
                        </button>
                    </div>
                ) : (
                    <div className={`${isMobile ? 'projects-grid horizontal-scroll' : 'projects-grid'}`}>
                        {projects.map((project) => (
                            <div key={project.id} className="project-card">
                                <div className="project-card-header">
                                    <div className="flex items-center gap-3">
                                        <div className="project-icon">
                                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.8"/>
                                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="project-name">{project.name}</h3>
                                            <p className="project-domain">{project.domain}</p>
                                        </div>
                                        <div className={`project-status ${project.active ? 'project-status-active' : 'project-status-inactive'}`}>
                                            {project.active ? 'Active' : 'Inactive'}
                                        </div>
                                    </div>
                                </div>

                                <div className="project-card-body">
                                    <p className="project-description">
                                        {project.description || 'No description provided'}
                                    </p>

                                    <div className="project-stats">
                                        <div className="project-stat">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                            <span>{project._count?.chats || 0} chats</span>
                                        </div>
                                        <div className="project-stat">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span>{project.rateLimit} req/min</span>
                                        </div>
                                    </div>

                                    <div className="project-public-key">
                                        <label className="project-key-label">Public Key</label>
                                        <div className="project-key-container">
                                            <code className="project-key-value">{project.publicId}</code>
                                            <button
                                                onClick={() => handleCopyPublicKey(project.publicId, project.name)}
                                                className="project-key-copy"
                                                title="Copy public key"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-card-footer">
                                    <button
                                        onClick={() => handleViewProject(project.id)}
                                        className="project-view-btn"
                                    >
                                        <span>View Details</span>
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions - Enterprise Design */}
            {/* <div className={`${
                isMobile ? 'quick-actions-grid horizontal-scroll' : 'quick-actions-grid'
            }`}>
                <div className="action-panel">
                    <div className="action-panel-header">
                        <h5 className="action-panel-title">Quick Actions</h5>
                    </div>
                    <div className="action-panel-body">
                        <button className="action-btn action-btn-primary">
                            <div className="action-btn-icon">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            </div>
                            <span>Test Voice Call</span>
                        </button>
                        <button className="action-btn action-btn-secondary">
                            <div className="action-btn-icon">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        opacity="0.5"
                                        d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span>Add Knowledge Base</span>
                        </button>
                        <button className="action-btn action-btn-info">
                            <div className="action-btn-icon">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                                    <path
                                        opacity="0.5"
                                        d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2718 6.07301 5.18632 5.82294 5.15224C5.30704 5.08426 4.79912 5.23718 4.4047 5.5608C4 5.89292 3.8 6.40973 3.4 7.44333L3.39999 7.44334C3.0381 8.40058 2.85714 8.87920 2.85714 9.5C2.85714 10.1208 3.0381 10.5994 3.4 11.5567C3.8 12.5903 4 13.1071 4.4047 13.4392C4.79912 13.7628 5.30704 13.9157 5.82294 13.8478C6.07301 13.8137 6.31645 13.7282 6.65219 13.5412C7.14559 13.2805 7.73564 13.27 8.21894 13.5491C8.70226 13.8281 8.98826 14.3443 9.00911 14.902C9.0233 15.2815 9.05957 15.5417 9.15223 15.7654C9.35522 16.2554 9.74457 16.6448 10.2346 16.8478C10.6022 17 11.0681 17 12 17C12.9319 17 13.3978 17 13.7654 16.8478C14.2554 16.6448 14.6448 16.2554 14.8478 15.7654C14.9404 15.5417 14.9767 15.2815 14.9909 14.902C15.0117 14.3443 15.2977 13.8281 15.7811 13.5491C16.2644 13.27 16.8544 13.2805 17.3478 13.5412C17.6835 13.7282 17.927 13.8137 18.1771 13.8478C18.693 13.9157 19.2009 13.7628 19.5953 13.4392C20 13.1071 20.2 12.5903 20.6 11.5567C20.9619 10.5994 21.1429 10.1208 21.1429 9.5C21.1429 8.87920 20.9619 8.40058 20.6 7.44334L20.6 7.44333C20.2 6.40973 20 5.89292 19.5953 5.5608C19.2009 5.23718 18.693 5.08426 18.1771 5.15224C17.927 5.18632 17.6835 5.2718 17.3478 5.45876C16.8544 5.71954 16.2644 5.72996 15.7811 5.45093C15.2977 5.17189 15.0117 4.65568 14.9909 4.09799C14.9767 3.7185 14.9404 3.45834 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                            <span>Configure Settings</span>
                        </button>
                    </div>
                </div>

                <div className="action-panel">
                    <div className="action-panel-header">
                        <h5 className="action-panel-title">Recent Activity</h5>
                    </div>
                    <div className="action-panel-body">
                        <div className="activity-item">
                            <div className="activity-icon activity-icon-primary">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.1007 13.359L16.5562 12.9062C17.1858 12.2801 18.1672 12.1515 18.9728 12.5894L20.8833 13.628C22.1102 14.2949 22.3806 15.9295 21.4217 16.883L20.0011 18.2954C19.6399 18.6546 19.1917 18.9171 18.6763 18.9651M4.00289 5.74561C3.96765 5.12559 4.25823 4.56668 4.69185 4.13552L6.26145 2.57483C7.13596 1.70529 8.61028 1.83992 9.37326 2.85908L10.6342 4.54348C11.2507 5.36691 11.1841 6.49484 10.4775 7.19738L10.1907 7.48257"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                            <div className="activity-content">
                                <p className="activity-date">25 Dec</p>
                                <h6 className="activity-title">Voice call completed</h6>
                                <p className="activity-description">User interaction with AI assistant</p>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon activity-icon-success">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="activity-content">
                                <p className="activity-date">24 Dec</p>
                                <h6 className="activity-title">Knowledge base updated</h6>
                                <p className="activity-description">New FAQ items added</p>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon activity-icon-warning">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </div>
                            <div className="activity-content">
                                <p className="activity-date">23 Dec</p>
                                <h6 className="activity-title">Settings configured</h6>
                                <p className="activity-description">Voice settings updated</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Dashboard;
