'use client';

import { useProfile } from '@/hooks/api';
import { useAuth } from '@/contexts/auth-context';

const ProfileContent = () => {
    const { data: profileData, isLoading, error, refetch } = useProfile();
    const { state } = useAuth();

    // Get user info - prioritize profile API data, fallback to auth context
    const user = profileData || state.user;
    const userName = user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'John Doe';
    const userEmail = user?.email || 'user@example.com';
    const userPlan = user?.plan || 'free';
    const isVerified = user?.isVerified || false;
    const projectCount = user?.projects?.length || 0;
    const createdAt = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'N/A';

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="panel">
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <svg className="h-12 w-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Failed to load profile</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{error.message}</p>
                    <button
                        onClick={() => refetch()}
                        className="btn btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-white">My Profile</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your account information and settings</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="panel">
                        <div className="flex flex-col items-center">
                            {/* Avatar */}
                            <div className="mb-4">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-bold text-3xl shadow-lg">
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                            </div>

                            {/* Name */}
                            <h3 className="text-xl font-semibold text-black dark:text-white mb-1">
                                {userName}
                            </h3>

                            {/* Email */}
                            <p className="text-gray-500 dark:text-gray-400 mb-3 text-sm">
                                {userEmail}
                            </p>

                            {/* Plan Badge */}
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary capitalize mb-4">
                                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {userPlan} Plan
                            </span>

                            {/* Verification Status */}
                            <div className="flex items-center gap-2 mb-4">
                                {isVerified ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                        <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Verified
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                                        <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Not Verified
                                    </span>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                <div className="flex justify-around text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-primary">{projectCount}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Projects</p>
                                    </div>
                                    <div className="border-l border-gray-200 dark:border-gray-700"></div>
                                    <div>
                                        <p className="text-2xl font-bold text-primary">0</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">API Calls</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="lg:col-span-2">
                    <div className="panel mb-6">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Account Information</h5>
                            <button className="btn btn-primary btn-sm">
                                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Profile
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* User ID */}
                            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-1/3">User ID</label>
                                <div className="mt-1 sm:mt-0 sm:w-2/3">
                                    <p className="text-sm text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded">
                                        {user?.id || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Full Name */}
                            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-1/3">Full Name</label>
                                <div className="mt-1 sm:mt-0 sm:w-2/3">
                                    <p className="text-sm text-gray-900 dark:text-white">{userName}</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-1/3">Email Address</label>
                                <div className="mt-1 sm:mt-0 sm:w-2/3">
                                    <p className="text-sm text-gray-900 dark:text-white">{userEmail}</p>
                                </div>
                            </div>

                            {/* Plan */}
                            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-1/3">Subscription Plan</label>
                                <div className="mt-1 sm:mt-0 sm:w-2/3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                                        {userPlan}
                                    </span>
                                </div>
                            </div>

                            {/* Member Since */}
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-1/3">Member Since</label>
                                <div className="mt-1 sm:mt-0 sm:w-2/3">
                                    <p className="text-sm text-gray-900 dark:text-white">{createdAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Projects Section */}
                    <div className="panel">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">My Projects</h5>
                            <button className="btn btn-outline-primary btn-sm">
                                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                New Project
                            </button>
                        </div>

                        {projectCount === 0 ? (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No projects</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new project.</p>
                                <div className="mt-6">
                                    <button className="btn btn-primary">
                                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Create Project
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {user?.projects?.map((project: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div>
                                            <h6 className="font-semibold text-gray-900 dark:text-white">{project.name || `Project ${index + 1}`}</h6>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{project.description || 'No description'}</p>
                                        </div>
                                        <button className="btn btn-sm btn-outline-primary">View</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;

