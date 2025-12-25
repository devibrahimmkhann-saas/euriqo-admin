'use client';
import { useProjects } from '@/hooks/api';
import { useRouter } from 'next/navigation';

const KnowledgeBasePage = () => {
    const router = useRouter();
    const { data: projectsData, isLoading: areProjectsLoading } = useProjects();

    const projects = projectsData?.projects || [];

    const handleProjectClick = (projectId: string) => {
        router.push(`/dashboard/knowledge-base/${projectId}`);
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-white">Knowledge Base</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage FAQs and training data for your AI chatbots</p>
            </div>

            {/* Projects Overview */}
            <div className="panel">
                <div className="mb-5">
                    <h5 className="text-lg font-semibold dark:text-white-light">Your Projects</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Click on a project to manage its FAQs
                    </p>
                </div>
                {areProjectsLoading ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="kb-empty-state">
                        <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Projects Found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Create a project first to start adding FAQs.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {projects.map((project) => (
                            <div key={project.id} className="kb-project-card cursor-pointer" onClick={() => handleProjectClick(project.id)}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="kb-project-icon">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    <span className="kb-project-count">
                                        <svg className="h-4 w-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        FAQs
                                    </span>
                                </div>
                                <h6 className="kb-project-name">{project.name}</h6>
                                <p className="kb-project-domain">{project.domain}</p>
                                <div className="kb-project-view-btn mt-4">
                                    Manage FAQs
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default KnowledgeBasePage;
