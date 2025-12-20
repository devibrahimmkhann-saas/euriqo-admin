'use client';
import { useRouter } from 'next/navigation';

const CreateProjectPage = () => {
    const router = useRouter();

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-white">Create New Project</h1>
                <p className="text-gray-600 dark:text-gray-400">Set up your new Euriqo project</p>
            </div>

            <div className="panel">
                <div className="mb-5">
                    <h5 className="text-lg font-semibold dark:text-white-light mb-4">Project Details</h5>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Project Name
                            </label>
                            <input
                                id="projectName"
                                type="text"
                                placeholder="Enter project name"
                                className="form-input w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                id="projectDescription"
                                rows={4}
                                placeholder="Enter project description"
                                className="form-textarea w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="btn btn-outline-danger"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{
                            background: 'linear-gradient(135deg, #7444FD 0%, #9d6fff 100%)',
                            border: 'none'
                        }}
                    >
                        Create Project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectPage;

