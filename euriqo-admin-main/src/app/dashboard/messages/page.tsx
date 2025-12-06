import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Messages & Conversations - Euriqo Admin',
};

const MessagesPage = () => {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-white">Messages & Conversations</h1>
                <p className="text-gray-600 dark:text-gray-400">View AI-human conversations, manage live agent handoffs, and export chat logs</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Conversation List */}
                <div className="panel lg:col-span-2">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Active Conversations</h5>
                        <div className="flex gap-2">
                            <button className="btn btn-outline-primary btn-sm">Filter</button>
                            <button className="btn btn-outline-secondary btn-sm">Export</button>
                        </div>
                    </div>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        <div className="rounded border p-4 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 cursor-pointer">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    <span className="font-semibold">+1 (555) 123-4567</span>
                                    <span className="badge bg-success">Active</span>
                                </div>
                                <span className="text-sm text-gray-500">2 min ago</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                User: "Can you help me with my billing question?"
                            </p>
                            <div className="flex items-center justify-between text-xs">
                                <span>Duration: 5m 23s</span>
                                <span>Messages: 12</span>
                                <button className="btn btn-outline-primary btn-sm">View</button>
                            </div>
                        </div>
                        
                        <div className="rounded border p-4 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 cursor-pointer">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                    <span className="font-semibold">+1 (555) 987-6543</span>
                                    <span className="badge bg-warning">Escalated</span>
                                </div>
                                <span className="text-sm text-gray-500">5 min ago</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                User: "I need to speak with a human agent about..."
                            </p>
                            <div className="flex items-center justify-between text-xs">
                                <span>Duration: 8m 45s</span>
                                <span>Messages: 18</span>
                                <button className="btn btn-outline-warning btn-sm">Intervene</button>
                            </div>
                        </div>

                        <div className="rounded border p-4 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 cursor-pointer">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                                    <span className="font-semibold">+1 (555) 456-7890</span>
                                    <span className="badge bg-secondary">Completed</span>
                                </div>
                                <span className="text-sm text-gray-500">15 min ago</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                User: "Thank you for your help!"
                            </p>
                            <div className="flex items-center justify-between text-xs">
                                <span>Duration: 3m 12s</span>
                                <span>Messages: 8</span>
                                <button className="btn btn-outline-info btn-sm">Review</button>
                            </div>
                        </div>

                        <div className="rounded border p-4 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 cursor-pointer">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                    <span className="font-semibold">+1 (555) 111-2222</span>
                                    <span className="badge bg-danger">Failed</span>
                                </div>
                                <span className="text-sm text-gray-500">20 min ago</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                System: Connection timeout after 30 seconds
                            </p>
                            <div className="flex items-center justify-between text-xs">
                                <span>Duration: 0m 30s</span>
                                <span>Messages: 1</span>
                                <button className="btn btn-outline-danger btn-sm">Retry</button>
                            </div>
                        </div>

                        <div className="rounded border p-4 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 cursor-pointer">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                    <span className="font-semibold">+1 (555) 333-4444</span>
                                    <span className="badge bg-info">AI Handled</span>
                                </div>
                                <span className="text-sm text-gray-500">1 hour ago</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                User: "What are your business hours?"
                            </p>
                            <div className="flex items-center justify-between text-xs">
                                <span>Duration: 1m 45s</span>
                                <span>Messages: 4</span>
                                <button className="btn btn-outline-info btn-sm">View</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Agent Controls */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Live Agent Controls</h5>
                    </div>
                    <div className="space-y-4">
                        <div className="rounded bg-yellow-50 border border-yellow-200 p-3 dark:bg-yellow-900/20 dark:border-yellow-800">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                <span className="font-semibold text-yellow-800 dark:text-yellow-200">Pending Escalation</span>
                            </div>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                                Customer requesting human agent for complex billing issue
                            </p>
                            <div className="flex gap-2">
                                <button className="btn btn-warning btn-sm flex-1">Take Over</button>
                                <button className="btn btn-outline-warning btn-sm">Assign</button>
                            </div>
                        </div>
                        
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Auto-assign to available agents</span>
                            </label>
                        </div>
                        
                        <div>
                            <label htmlFor="agent-status">Your Status</label>
                            <select id="agent-status" className="form-select">
                                <option>Available</option>
                                <option>Busy</option>
                                <option>Away</option>
                                <option>Do Not Disturb</option>
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="max-concurrent">Max Concurrent Chats</label>
                            <input id="max-concurrent" type="number" className="form-input" defaultValue="3" min="1" max="10" />
                        </div>
                        
                        <button className="btn btn-primary w-full">Update Agent Settings</button>
                    </div>
                </div>

                {/* Conversation Details */}
                <div className="panel lg:col-span-3">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Conversation Details</h5>
                        <div className="flex gap-2">
                            <button className="btn btn-outline-primary btn-sm">Export Chat</button>
                            <button className="btn btn-outline-secondary btn-sm">Download Audio</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="rounded border p-4 dark:border-gray-600 max-h-96 overflow-y-auto">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm">AI</div>
                                        <div className="flex-1">
                                            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                                                <p className="text-sm">Hello! Welcome to Euriqo. How can I assist you today?</p>
                                            </div>
                                            <span className="text-xs text-gray-500 mt-1">2:30 PM</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3 justify-end">
                                        <div className="flex-1 text-right">
                                            <div className="rounded-lg bg-primary p-3 text-white inline-block">
                                                <p className="text-sm">Hi, I have a question about my billing</p>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">2:31 PM</div>
                                        </div>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white text-sm">U</div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm">AI</div>
                                        <div className="flex-1">
                                            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                                                <p className="text-sm">I'd be happy to help you with your billing question. Could you please provide more details about what you'd like to know?</p>
                                            </div>
                                            <span className="text-xs text-gray-500 mt-1">2:31 PM</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3 justify-end">
                                        <div className="flex-1 text-right">
                                            <div className="rounded-lg bg-primary p-3 text-white inline-block">
                                                <p className="text-sm">I was charged twice this month and I need to understand why</p>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">2:32 PM</div>
                                        </div>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white text-sm">U</div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm">AI</div>
                                        <div className="flex-1">
                                            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                                                <p className="text-sm">I understand your concern about the duplicate charge. Let me connect you with a billing specialist who can review your account and resolve this issue for you.</p>
                                            </div>
                                            <span className="text-xs text-gray-500 mt-1">2:33 PM</span>
                                        </div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <span className="badge bg-warning">Escalated to Human Agent</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Quick Response Templates */}
                            <div className="mt-4">
                                <h6 className="mb-3 font-semibold">Quick Response Templates</h6>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="btn btn-outline-primary btn-sm text-left">Thank you for waiting...</button>
                                    <button className="btn btn-outline-primary btn-sm text-left">I'm reviewing your account...</button>
                                    <button className="btn btn-outline-primary btn-sm text-left">Let me transfer you to...</button>
                                    <button className="btn btn-outline-primary btn-sm text-left">Is there anything else...</button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="rounded border p-4 dark:border-gray-600">
                                <h6 className="mb-3 font-semibold">Conversation Info</h6>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Phone:</span>
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Started:</span>
                                        <span>2:30 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Duration:</span>
                                        <span>5m 23s</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Messages:</span>
                                        <span>12</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Status:</span>
                                        <span className="badge bg-warning">Escalated</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="rounded border p-4 dark:border-gray-600">
                                <h6 className="mb-3 font-semibold">AI Confidence</h6>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Intent Recognition:</span>
                                        <span>92%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                        <div className="h-2 rounded-full bg-success" style={{ width: '92%' }}></div>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Response Quality:</span>
                                        <span>78%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                        <div className="h-2 rounded-full bg-warning" style={{ width: '78%' }}></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="rounded border p-4 dark:border-gray-600">
                                <h6 className="mb-3 font-semibold">Actions</h6>
                                <div className="space-y-2">
                                    <button className="btn btn-primary btn-sm w-full">Take Over Chat</button>
                                    <button className="btn btn-secondary btn-sm w-full">Add Note</button>
                                    <button className="btn btn-info btn-sm w-full">Flag for Review</button>
                                    <button className="btn btn-warning btn-sm w-full">Request Callback</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="panel lg:col-span-3">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Search & Filter Conversations</h5>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div>
                            <label htmlFor="search-phone">Phone Number</label>
                            <input id="search-phone" type="tel" className="form-input" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div>
                            <label htmlFor="date-range">Date Range</label>
                            <select id="date-range" className="form-select">
                                <option>Today</option>
                                <option>Yesterday</option>
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Custom range</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="conversation-status">Status</label>
                            <select id="conversation-status" className="form-select">
                                <option>All statuses</option>
                                <option>Active</option>
                                <option>Completed</option>
                                <option>Escalated</option>
                                <option>Failed</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="conversation-type">Type</label>
                            <select id="conversation-type" className="form-select">
                                <option>All types</option>
                                <option>AI Only</option>
                                <option>Human Assisted</option>
                                <option>Escalated</option>
                                <option>Failed</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <button className="btn btn-primary">Search Conversations</button>
                        <button className="btn btn-outline-secondary">Clear Filters</button>
                        <button className="btn btn-outline-info">Export Results</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;
