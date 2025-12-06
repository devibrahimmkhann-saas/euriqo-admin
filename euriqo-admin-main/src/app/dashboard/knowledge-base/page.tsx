import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Knowledge Base / Context Management - Euriqo Admin',
};

const KnowledgeBasePage = () => {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-white">Knowledge Base / Context Management</h1>
                <p className="text-gray-600 dark:text-gray-400">Upload content, manage FAQs, and configure auto-refresh settings</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Content Upload */}
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Content Upload</h5>
                        <button className="btn btn-primary btn-sm">Upload Content</button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label>Upload JSON File</label>
                            <div className="mt-2">
                                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
                                    <div className="text-center">
                                        <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            Drop JSON files here or click to upload
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="notion-url">Notion Integration</label>
                            <div className="flex gap-2">
                                <input id="notion-url" type="url" className="form-input flex-1" placeholder="https://notion.so/..." />
                                <button className="btn btn-secondary">Connect</button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="api-endpoint">API Endpoint</label>
                            <div className="flex gap-2">
                                <input id="api-endpoint" type="url" className="form-input flex-1" placeholder="https://api.example.com/knowledge" />
                                <button className="btn btn-info">Test</button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="api-key">API Key (optional)</label>
                            <input id="api-key" type="password" className="form-input" placeholder="••••••••••••••••" />
                        </div>
                    </div>
                </div>

                {/* FAQ Management */}
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">FAQ Management</h5>
                        <button className="btn btn-secondary btn-sm">Add FAQ</button>
                    </div>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        <div className="rounded border p-3 dark:border-gray-600">
                            <div className="mb-2 flex items-center justify-between">
                                <h6 className="font-semibold">What are your business hours?</h6>
                                <div className="flex gap-1">
                                    <button className="btn btn-outline-primary btn-sm">Edit</button>
                                    <button className="btn btn-outline-danger btn-sm">Delete</button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                We are open Monday through Friday from 9 AM to 6 PM EST. Our support team is available 24/7 for urgent matters.
                            </p>
                            <div className="mt-2 flex gap-2">
                                <span className="badge bg-success">Active</span>
                                <span className="badge bg-info">General</span>
                            </div>
                        </div>
                        <div className="rounded border p-3 dark:border-gray-600">
                            <div className="mb-2 flex items-center justify-between">
                                <h6 className="font-semibold">How do I reset my password?</h6>
                                <div className="flex gap-1">
                                    <button className="btn btn-outline-primary btn-sm">Edit</button>
                                    <button className="btn btn-outline-danger btn-sm">Delete</button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.
                            </p>
                            <div className="mt-2 flex gap-2">
                                <span className="badge bg-success">Active</span>
                                <span className="badge bg-warning">Account</span>
                            </div>
                        </div>
                        <div className="rounded border p-3 dark:border-gray-600">
                            <div className="mb-2 flex items-center justify-between">
                                <h6 className="font-semibold">What payment methods do you accept?</h6>
                                <div className="flex gap-1">
                                    <button className="btn btn-outline-primary btn-sm">Edit</button>
                                    <button className="btn btn-outline-danger btn-sm">Delete</button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                We accept all major credit cards, PayPal, and bank transfers for enterprise customers.
                            </p>
                            <div className="mt-2 flex gap-2">
                                <span className="badge bg-success">Active</span>
                                <span className="badge bg-secondary">Billing</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Policies & Scripts */}
                <div className="panel lg:col-span-2">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Company Policies & Scripts</h5>
                        <div className="flex gap-2">
                            <button className="btn btn-outline-primary btn-sm">Import</button>
                            <button className="btn btn-primary btn-sm">New Policy</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded border p-4 dark:border-gray-600">
                            <div className="mb-3 flex items-center justify-between">
                                <h6 className="font-semibold">Privacy Policy</h6>
                                <span className="badge bg-success">Active</span>
                            </div>
                            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                                Comprehensive privacy policy covering data collection, usage, and user rights.
                            </p>
                            <div className="mb-3 text-xs text-gray-500">
                                Last updated: Dec 1, 2024 • 2,450 words
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-outline-primary btn-sm">Edit</button>
                                <button className="btn btn-outline-info btn-sm">Preview</button>
                                <button className="btn btn-outline-secondary btn-sm">Version History</button>
                            </div>
                        </div>
                        <div className="rounded border p-4 dark:border-gray-600">
                            <div className="mb-3 flex items-center justify-between">
                                <h6 className="font-semibold">Terms of Service</h6>
                                <span className="badge bg-success">Active</span>
                            </div>
                            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                                Legal terms and conditions for using our services and platform.
                            </p>
                            <div className="mb-3 text-xs text-gray-500">
                                Last updated: Nov 28, 2024 • 3,120 words
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-outline-primary btn-sm">Edit</button>
                                <button className="btn btn-outline-info btn-sm">Preview</button>
                                <button className="btn btn-outline-secondary btn-sm">Version History</button>
                            </div>
                        </div>
                        <div className="rounded border p-4 dark:border-gray-600">
                            <div className="mb-3 flex items-center justify-between">
                                <h6 className="font-semibold">Customer Support Scripts</h6>
                                <span className="badge bg-warning">Draft</span>
                            </div>
                            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                                Standardized responses and conversation flows for customer support scenarios.
                            </p>
                            <div className="mb-3 text-xs text-gray-500">
                                Last updated: Dec 3, 2024 • 1,890 words
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-outline-primary btn-sm">Edit</button>
                                <button className="btn btn-outline-success btn-sm">Publish</button>
                                <button className="btn btn-outline-secondary btn-sm">Version History</button>
                            </div>
                        </div>
                        <div className="rounded border p-4 dark:border-gray-600">
                            <div className="mb-3 flex items-center justify-between">
                                <h6 className="font-semibold">Product Information</h6>
                                <span className="badge bg-success">Active</span>
                            </div>
                            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                                Detailed product specifications, features, and pricing information.
                            </p>
                            <div className="mb-3 text-xs text-gray-500">
                                Last updated: Dec 4, 2024 • 4,200 words
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-outline-primary btn-sm">Edit</button>
                                <button className="btn btn-outline-info btn-sm">Preview</button>
                                <button className="btn btn-outline-secondary btn-sm">Version History</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Auto-refresh Settings */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Auto-refresh / Webhook Sync</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Enable auto-refresh</span>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="refresh-interval">Refresh Interval</label>
                            <select id="refresh-interval" className="form-select">
                                <option>Every 15 minutes</option>
                                <option>Every 30 minutes</option>
                                <option>Every hour</option>
                                <option>Every 6 hours</option>
                                <option>Daily</option>
                                <option>Weekly</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="webhook-url">Webhook URL</label>
                            <input id="webhook-url" type="url" className="form-input" placeholder="https://your-domain.com/webhook" />
                        </div>
                        <div>
                            <label htmlFor="webhook-secret">Webhook Secret</label>
                            <input id="webhook-secret" type="password" className="form-input" placeholder="••••••••••••••••" />
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="text-white-dark">Send notifications on sync</span>
                            </label>
                        </div>
                        <button className="btn btn-success w-full">Save Sync Settings</button>
                    </div>
                </div>

                {/* Content Statistics */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Content Statistics</h5>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <span>Total Documents</span>
                            <span className="font-bold text-primary">156</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <span>FAQ Items</span>
                            <span className="font-bold text-secondary">42</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <span>Policy Documents</span>
                            <span className="font-bold text-success">8</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <span>Last Sync</span>
                            <span className="font-bold text-info">2 hours ago</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <span>Storage Used</span>
                            <span className="font-bold text-warning">1.2 GB / 50 GB</span>
                        </div>
                        <button className="btn btn-outline-primary w-full">View Detailed Analytics</button>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="panel mt-6">
                <div className="mb-5 flex items-center justify-between">
                    <h5 className="text-lg font-semibold dark:text-white-light">Recent Knowledge Base Activity</h5>
                    <button className="btn btn-outline-secondary btn-sm">View All</button>
                </div>
                <div className="table-responsive">
                    <table className="table-hover">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Content</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span className="badge bg-success">Created</span>
                                </td>
                                <td>New FAQ: "How to cancel subscription?"</td>
                                <td>John Doe</td>
                                <td>Dec 5, 2024 2:30 PM</td>
                                <td>
                                    <span className="badge bg-success">Published</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="badge bg-info">Updated</span>
                                </td>
                                <td>Privacy Policy v2.1</td>
                                <td>Jane Smith</td>
                                <td>Dec 5, 2024 1:15 PM</td>
                                <td>
                                    <span className="badge bg-success">Published</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="badge bg-warning">Synced</span>
                                </td>
                                <td>Notion Integration - Product Docs</td>
                                <td>System</td>
                                <td>Dec 5, 2024 12:00 PM</td>
                                <td>
                                    <span className="badge bg-success">Completed</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="badge bg-danger">Deleted</span>
                                </td>
                                <td>Outdated FAQ: "Old pricing structure"</td>
                                <td>Admin</td>
                                <td>Dec 5, 2024 10:45 AM</td>
                                <td>
                                    <span className="badge bg-danger">Removed</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeBasePage;
