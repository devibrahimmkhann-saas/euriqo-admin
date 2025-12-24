'use client';
import { useParams, useRouter } from 'next/navigation';
import { useProject } from '@/hooks/api';
import Swal from 'sweetalert2';

const ProjectDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;

    const { data: project, isLoading, error } = useProject(projectId);

    // Handle copy
    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        Swal.fire({
            icon: 'success',
            title: 'Copied!',
            text: `${label} copied to clipboard`,
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#7444FD] border-r-transparent"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="panel text-center py-12">
                <svg className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Project not found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">The project you're looking for doesn't exist or has been deleted.</p>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="btn btn-primary"
                    style={{
                        background: 'linear-gradient(135deg, #7444FD 0%, #9d6fff 100%)',
                        border: 'none'
                    }}
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const createdDate = new Date(project.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-black dark:text-white">{project.name}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{project.domain}</p>
                    </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    project.active 
                        ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                }`}>
                    {project.active ? '● Active' : '● Inactive'}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <div className="panel">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Description</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {project.description || 'No description provided'}
                        </p>
                    </div>

                    {/* Public Key */}
                    <div className="panel">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Public Key</h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                                <code className="flex-1 text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
                                    {project.publicId}
                                </code>
                                <button
                                    onClick={() => handleCopy(project.publicId, 'Public key')}
                                    className="flex-shrink-0 p-2 rounded-lg transition-all duration-200 text-gray-400 hover:text-[#7444FD] hover:bg-[#7444FD]/10"
                                    title="Copy public key"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Use this public key to integrate the chatbot into your website
                            </p>
                        </div>
                    </div>

                    {/* Usage Stats */}
                    <div className="panel">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage Statistics</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-blue-500/10">
                                        <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{project._count?.chats || 0}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Chats</p>
                            </div>

                            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-purple-500/10">
                                        <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{project.rateLimit}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Requests/Minute</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="space-y-6">
                    {/* Project Info */}
                    <div className="panel">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Project ID</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-sm text-gray-900 dark:text-white font-mono truncate">{project.id}</p>
                                    <button
                                        onClick={() => handleCopy(project.id, 'Project ID')}
                                        className="flex-shrink-0 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Domain</label>
                                <p className="text-sm text-gray-900 dark:text-white mt-1">{project.domain}</p>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Created</label>
                                <p className="text-sm text-gray-900 dark:text-white mt-1">{createdDate}</p>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Status</label>
                                <p className="text-sm text-gray-900 dark:text-white mt-1">
                                    {project.active ? 'Active' : 'Inactive'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="panel">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Edit Project</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Settings</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left">
                                <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span className="text-sm font-medium text-red-600 dark:text-red-400">Delete Project</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsPage;

