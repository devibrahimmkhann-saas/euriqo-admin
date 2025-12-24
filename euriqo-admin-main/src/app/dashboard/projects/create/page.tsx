'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateProject } from '@/hooks/api';
import Swal from 'sweetalert2';

const CreateProjectPage = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [domain, setDomain] = useState('');
    const [errors, setErrors] = useState<{ name?: string; description?: string; domain?: string }>({});

    const createProjectMutation = useCreateProject();

    // Domain validation helper
    const isValidDomain = (domain: string): boolean => {
        // Basic domain validation regex
        const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
        return domainRegex.test(domain);
    };

    // Form validation
    const validateForm = (): boolean => {
        const newErrors: { name?: string; description?: string; domain?: string } = {};

        if (!name.trim()) {
            newErrors.name = 'Project name is required';
        } else if (name.trim().length < 3) {
            newErrors.name = 'Project name must be at least 3 characters';
        } else if (name.trim().length > 100) {
            newErrors.name = 'Project name must be less than 100 characters';
        }

        if (!domain.trim()) {
            newErrors.domain = 'Domain is required';
        } else if (!isValidDomain(domain.trim())) {
            newErrors.domain = 'Please enter a valid domain (e.g., example.com)';
        }

        if (description && description.trim().length > 500) {
            newErrors.description = 'Description must be less than 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Create project
        createProjectMutation.mutate(
            {
                name: name.trim(),
                domain: domain.trim(),
                description: description.trim() || undefined,
            },
            {
                onSuccess: (data) => {
                    // Show success message
                    Swal.fire({
                        icon: 'success',
                        title: 'Project Created!',
                        text: data.message || 'Your project has been created successfully',
                        confirmButtonText: 'View Dashboard',
                        confirmButtonColor: '#7444FD',
                        showCancelButton: true,
                        cancelButtonText: 'Create Another',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Navigate to dashboard
                            router.push('/dashboard');
                        } else {
                            // Reset form for another project
                            setName('');
                            setDescription('');
                            setDomain('');
                            setErrors({});
                        }
                    });
                },
                onError: (error: Error) => {
                    // Show error message
                    Swal.fire({
                        icon: 'error',
                        title: 'Creation Failed',
                        text: error.message || 'Failed to create project. Please try again.',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#7444FD',
                    });
                },
            }
        );
    };

    // Handle cancel
    const handleCancel = () => {
        if (name.trim() || description.trim() || domain.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Discard Changes?',
                text: 'You have unsaved changes. Are you sure you want to leave?',
                showCancelButton: true,
                confirmButtonText: 'Yes, Discard',
                cancelButtonText: 'No, Stay',
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#7444FD',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.back();
                }
            });
        } else {
            router.back();
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-white">Create New Project</h1>
                <p className="text-gray-600 dark:text-gray-400">Set up your new Euriqo project</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light mb-4">Project Details</h5>
                        <div className="space-y-4">
                            {/* Project Name */}
                            <div>
                                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Project Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="projectName"
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (errors.name) {
                                            setErrors({ ...errors, name: undefined });
                                        }
                                    }}
                                    placeholder="Enter project name"
                                    className={`form-input w-full ${errors.name ? 'border-red-500' : ''}`}
                                    disabled={createProjectMutation.isPending}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {name.length}/100 characters
                                </p>
                            </div>

                            {/* Project Domain */}
                            <div>
                                <label htmlFor="projectDomain" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Domain <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="projectDomain"
                                    type="text"
                                    value={domain}
                                    onChange={(e) => {
                                        setDomain(e.target.value);
                                        if (errors.domain) {
                                            setErrors({ ...errors, domain: undefined });
                                        }
                                    }}
                                    placeholder="example.com"
                                    className={`form-input w-full ${errors.domain ? 'border-red-500' : ''}`}
                                    disabled={createProjectMutation.isPending}
                                />
                                {errors.domain && (
                                    <p className="mt-1 text-sm text-red-500">{errors.domain}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Enter your website domain (e.g., example.com)
                                </p>
                            </div>

                            {/* Project Description */}
                            <div>
                                <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Description <span className="text-gray-400">(Optional)</span>
                                </label>
                                <textarea
                                    id="projectDescription"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        if (errors.description) {
                                            setErrors({ ...errors, description: undefined });
                                        }
                                    }}
                                    placeholder="Enter project description"
                                    className={`form-textarea w-full ${errors.description ? 'border-red-500' : ''}`}
                                    disabled={createProjectMutation.isPending}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {description.length}/500 characters
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn btn-outline-danger"
                            disabled={createProjectMutation.isPending}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary flex items-center gap-2"
                            style={{
                                background: 'linear-gradient(135deg, #7444FD 0%, #9d6fff 100%)',
                                border: 'none'
                            }}
                            disabled={createProjectMutation.isPending}
                        >
                            {createProjectMutation.isPending ? (
                                <>
                                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                                    <span>Creating...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Create Project</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateProjectPage;

