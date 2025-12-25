'use client';
import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProjectFAQs, useCreateFAQ, useDeleteFAQ, parseFAQString } from '@/hooks/api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface ParsedFAQItem {
    question: string;
    answer: string;
}

const ProjectFAQPage = () => {
    const params = useParams();
    const router = useRouter();
    const projectId = params.projectId as string;

    const [uploadMethod, setUploadMethod] = useState<'text' | 'file'>('text');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Form states
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [fileContent, setFileContent] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // API hooks
    const { data: faqData, isLoading, error } = useProjectFAQs(projectId);
    const createFaqMutation = useCreateFAQ();
    const deleteFaqMutation = useDeleteFAQ(projectId);

    // Parse FAQs into individual Q&A pairs
    const parsedFaqs = useMemo<ParsedFAQItem[]>(() => {
        if (!faqData?.faqs) return [];
        return parseFAQString(faqData.faqs);
    }, [faqData]);

    const filteredFaqs = useMemo(() => {
        return parsedFaqs.filter(faq => {
            const matchesSearch = searchQuery === '' || 
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [parsedFaqs, searchQuery]);

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                MySwal.fire({
                    icon: 'error',
                    title: 'File Too Large',
                    text: 'File size must be less than 5MB.',
                    customClass: { popup: 'swal2-popup-dark' }
                });
                return;
            }
            
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setFileContent(event.target?.result as string);
            };
            reader.readAsText(file);
        }
    };

    // Handle text FAQ submission
    const handleTextSubmit = async () => {
        if (!question.trim() || !answer.trim()) {
            MySwal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill in all required fields.',
                customClass: { popup: 'swal2-popup-dark' }
            });
            return;
        }

        const faqString = `Q: ${question.trim()}\nA: ${answer.trim()}`;
        
        try {
            await createFaqMutation.mutateAsync({
                projectId,
                faqs: faqString
            });
            
            MySwal.fire({
                icon: 'success',
                title: 'FAQ Added!',
                text: 'Your FAQ has been added successfully.',
                timer: 2000,
                showConfirmButton: false,
                customClass: { popup: 'swal2-popup-dark' }
            });
            
            // Reset form
            setQuestion('');
            setAnswer('');
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Failed to Add FAQ',
                text: error instanceof Error ? error.message : 'An error occurred',
                customClass: { popup: 'swal2-popup-dark' }
            });
        }
    };

    // Handle file FAQ submission
    const handleFileSubmit = async () => {
        if (!fileContent) {
            MySwal.fire({
                icon: 'warning',
                title: 'Missing File',
                text: 'Please upload a file.',
                customClass: { popup: 'swal2-popup-dark' }
            });
            return;
        }

        try {
            await createFaqMutation.mutateAsync({
                projectId,
                faqs: fileContent
            });
            
            MySwal.fire({
                icon: 'success',
                title: 'FAQs Uploaded!',
                text: 'Your FAQs have been uploaded successfully.',
                timer: 2000,
                showConfirmButton: false,
                customClass: { popup: 'swal2-popup-dark' }
            });
            
            // Reset form
            setFileContent('');
            setSelectedFile(null);
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Failed to Upload FAQs',
                text: error instanceof Error ? error.message : 'An error occurred',
                customClass: { popup: 'swal2-popup-dark' }
            });
        }
    };

    // Handle FAQ deletion
    const handleDeleteFaq = async () => {
        if (!faqData?.id) return;

        const result = await MySwal.fire({
            icon: 'warning',
            title: 'Delete All FAQs?',
            text: 'This will delete all FAQ entries for this project. This action cannot be undone.',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete all',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'swal2-popup-dark',
                confirmButton: 'swal2-confirm-button-dark',
                cancelButton: 'swal2-cancel-button-dark'
            }
        });

        if (result.isConfirmed) {
            try {
                await deleteFaqMutation.mutateAsync(faqData.id);
                MySwal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'All FAQs have been deleted.',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: { popup: 'swal2-popup-dark' }
                });
            } catch (error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to Delete',
                    text: error instanceof Error ? error.message : 'An error occurred',
                    customClass: { popup: 'swal2-popup-dark' }
                });
            }
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/dashboard/knowledge-base')}
                        className="btn btn-outline-primary"
                    >
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-black dark:text-white">
                            {faqData?.project?.name || 'Loading...'}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {faqData?.project?.domain || ''}
                        </p>
                    </div>
                </div>
                {parsedFaqs.length > 0 && (
                    <button
                        onClick={handleDeleteFaq}
                        disabled={deleteFaqMutation.isPending}
                        className="btn btn-outline-danger"
                    >
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete All FAQs
                    </button>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="kb-stat-card">
                    <div className="kb-stat-icon kb-stat-icon-primary">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="kb-stat-label">Total FAQs</p>
                        <p className="kb-stat-value">{isLoading ? '...' : parsedFaqs.length}</p>
                    </div>
                </div>

                <div className="kb-stat-card">
                    <div className="kb-stat-icon kb-stat-icon-success">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="kb-stat-label">Status</p>
                        <p className="kb-stat-value text-sm">{parsedFaqs.length > 0 ? 'Active' : 'Empty'}</p>
                    </div>
                </div>

                <div className="kb-stat-card">
                    <div className="kb-stat-icon kb-stat-icon-info">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="kb-stat-label">Last Updated</p>
                        <p className="kb-stat-value text-sm">
                            {isLoading ? '...' : faqData?.updatedAt 
                                ? new Date(faqData.updatedAt).toLocaleDateString() 
                                : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Upload Method */}
            <div className="panel mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Search FAQs
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search questions or answers..."
                                className="form-input w-full pl-10"
                            />
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Upload Method Toggle */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Upload Method
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setUploadMethod('text')}
                                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                                    uploadMethod === 'text'
                                        ? 'bg-[#7444FD] text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                Text Input
                            </button>
                            <button
                                onClick={() => setUploadMethod('file')}
                                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                                    uploadMethod === 'file'
                                        ? 'bg-[#7444FD] text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                File Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Upload Section - Takes 1 column */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">
                            {uploadMethod === 'text' ? 'Add FAQ Manually' : 'Upload FAQ File'}
                        </h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {uploadMethod === 'text' ? 'Enter question and answer' : 'Upload a text file with FAQs'}
                        </p>
                    </div>
                    <div className="space-y-4">
                        {uploadMethod === 'text' ? (
                            <>
                                {/* Text Input Method */}
                                <div>
                                    <label htmlFor="faq-question" className="form-label">
                                        Question <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="faq-question"
                                        type="text"
                                        className="form-input"
                                        placeholder="What is your question?"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        disabled={createFaqMutation.isPending}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="faq-answer" className="form-label">
                                        Answer <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="faq-answer"
                                        rows={6}
                                        className="form-textarea"
                                        placeholder="Provide a detailed answer..."
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        maxLength={1000}
                                        disabled={createFaqMutation.isPending}
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {answer.length} / 1000 characters
                                    </p>
                                </div>

                                <button 
                                    onClick={handleTextSubmit}
                                    disabled={createFaqMutation.isPending}
                                    className="btn w-full"
                                    style={{
                                        background: 'linear-gradient(135deg, #7444FD 0%, #9d6fff 100%)',
                                        border: 'none',
                                        color: 'white'
                                    }}
                                >
                                    {createFaqMutation.isPending ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Adding...
                                        </span>
                                    ) : (
                                        <>
                                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add FAQ
                                        </>
                                    )}
                                </button>
                            </>
                        ) : (
                            <>
                                {/* File Upload Method */}
                                <div>
                                    <label className="form-label">
                                        Upload Text File <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            <div className="kb-upload-area">
                                                <svg className="h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    {selectedFile ? selectedFile.name : 'Drop your text file here or click to browse'}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Supports .txt files up to 5MB
                                                </p>
                                            </div>
                                        </label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept=".txt"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            disabled={createFaqMutation.isPending}
                                        />
                                    </div>
                                </div>

                                <div className="kb-info-box">
                                    <svg className="h-5 w-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="text-xs">
                                        <p className="font-semibold mb-1">File Format Guide:</p>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            FAQs can be in any format. Examples:<br/>
                                            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Q: Your question? A: Your answer.</code><br/>
                                            Or unstructured text - our parser will handle it!
                                        </p>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleFileSubmit}
                                    disabled={createFaqMutation.isPending || !selectedFile}
                                    className="btn w-full"
                                    style={{
                                        background: 'linear-gradient(135deg, #7444FD 0%, #9d6fff 100%)',
                                        border: 'none',
                                        color: 'white',
                                        opacity: !selectedFile ? 0.5 : 1
                                    }}
                                >
                                    {createFaqMutation.isPending ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Uploading...
                                        </span>
                                    ) : (
                                        <>
                                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            Upload FAQs
                                        </>
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* FAQ List - Takes 2 columns */}
                <div className="panel lg:col-span-2">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">FAQs</h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {filteredFaqs.length} FAQ{filteredFaqs.length !== 1 ? 's' : ''} found
                        </p>
                    </div>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                        {isLoading ? (
                            <div className="flex items-center justify-center min-h-[200px]">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : error ? (
                            <div className="kb-empty-state">
                                <svg className="h-16 w-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">Error Loading FAQs</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {error.message}
                                </p>
                            </div>
                        ) : filteredFaqs.length === 0 ? (
                            <div className="kb-empty-state">
                                <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No FAQs Found</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {searchQuery ? 'No FAQs match your search.' : 'Start by adding your first FAQ using the form on the left.'}
                                </p>
                            </div>
                        ) : (
                            filteredFaqs.map((faq, index) => (
                                <div key={index} className="kb-faq-card">
                                    <div className="kb-faq-header">
                                        <div className="flex items-start gap-3 flex-1">
                                            <div className="kb-faq-icon">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h6 className="kb-faq-question">{faq.question}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="kb-faq-answer">{faq.answer}</p>
                                    <div className="kb-faq-footer">
                                        <div className="flex gap-2">
                                            <span className="kb-badge kb-badge-success">Active</span>
                                        </div>
                                        <span className="kb-faq-date">
                                            Added {faqData?.createdAt ? new Date(faqData.createdAt).toLocaleDateString() : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectFAQPage;

