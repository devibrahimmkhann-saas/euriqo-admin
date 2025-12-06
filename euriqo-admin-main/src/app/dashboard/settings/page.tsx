import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'System Settings - Euriqo Admin',
};

const SettingsPage = () => {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-white">System Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">Configure API keys, webhooks, and system preferences</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* API Keys & Access Tokens */}
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">API Keys & Access Tokens</h5>
                        <button className="btn btn-primary btn-sm">Generate New Key</button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="twilio-sid">Twilio Account SID</label>
                            <div className="relative">
                                <input id="twilio-sid" type="password" className="form-input" placeholder="AC..." />
                                <button className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            opacity="0.5"
                                            d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="twilio-token">Twilio Auth Token</label>
                            <div className="relative">
                                <input id="twilio-token" type="password" className="form-input" placeholder="••••••••••••••••" />
                                <button className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            opacity="0.5"
                                            d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="openai-key">OpenAI API Key</label>
                            <div className="relative">
                                <input id="openai-key" type="password" className="form-input" placeholder="sk-..." />
                                <button className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            opacity="0.5"
                                            d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button className="btn btn-success w-full">Save API Keys</button>
                    </div>
                </div>

                {/* Webhooks & Endpoints */}
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Webhooks & Endpoints</h5>
                        <button className="btn btn-secondary btn-sm">Add Webhook</button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="webhook-url">Webhook URL</label>
                            <input id="webhook-url" type="url" className="form-input" placeholder="https://your-domain.com/webhook" />
                        </div>
                        <div>
                            <label htmlFor="webhook-events">Events to Subscribe</label>
                            <div className="space-y-2">
                                <label className="flex cursor-pointer items-center">
                                    <input type="checkbox" className="form-checkbox" defaultChecked />
                                    <span className="text-white-dark">Call Started</span>
                                </label>
                                <label className="flex cursor-pointer items-center">
                                    <input type="checkbox" className="form-checkbox" defaultChecked />
                                    <span className="text-white-dark">Call Ended</span>
                                </label>
                                <label className="flex cursor-pointer items-center">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-white-dark">Transcription Available</span>
                                </label>
                                <label className="flex cursor-pointer items-center">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-white-dark">Agent Escalation</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="webhook-secret">Webhook Secret</label>
                            <input id="webhook-secret" type="password" className="form-input" placeholder="••••••••••••••••" />
                        </div>
                        <button className="btn btn-primary w-full">Configure Webhook</button>
                    </div>
                </div>

                {/* Billing & Subscription */}
                <div className="panel lg:col-span-2">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Billing & Subscription Management</h5>
                        <button className="btn btn-outline-primary btn-sm">View Invoices</button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                            <h6 className="mb-2 font-semibold">Current Plan</h6>
                            <p className="text-2xl font-bold text-primary">Professional</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">$99/month</p>
                            <ul className="mt-3 space-y-1 text-sm">
                                <li>✓ 10,000 voice minutes</li>
                                <li>✓ Unlimited knowledge base</li>
                                <li>✓ Advanced analytics</li>
                                <li>✓ Priority support</li>
                            </ul>
                            <button className="btn btn-outline-primary btn-sm mt-4 w-full">Upgrade Plan</button>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                            <h6 className="mb-2 font-semibold">Usage This Month</h6>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Voice Minutes</span>
                                    <span className="font-semibold">2,847 / 10,000</span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-2 rounded-full bg-primary" style={{ width: '28.47%' }}></div>
                                </div>
                                <div className="flex justify-between">
                                    <span>API Calls</span>
                                    <span className="font-semibold">15,234 / ∞</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Storage</span>
                                    <span className="font-semibold">1.2GB / 50GB</span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                            <h6 className="mb-2 font-semibold">Next Billing</h6>
                            <p className="text-lg font-bold">January 5, 2025</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Amount: $99.00</p>
                            <div className="mt-3 space-y-2">
                                <button className="btn btn-outline-secondary btn-sm w-full">Update Payment Method</button>
                                <button className="btn btn-outline-warning btn-sm w-full">Cancel Subscription</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Preferences */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">System Preferences</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="timezone">Timezone</label>
                            <select id="timezone" className="form-select">
                                <option>UTC-8 (Pacific Time)</option>
                                <option>UTC-5 (Eastern Time)</option>
                                <option>UTC+0 (GMT)</option>
                                <option>UTC+1 (Central European Time)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date-format">Date Format</label>
                            <select id="date-format" className="form-select">
                                <option>MM/DD/YYYY</option>
                                <option>DD/MM/YYYY</option>
                                <option>YYYY-MM-DD</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Enable email notifications</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="text-white-dark">Enable SMS alerts</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Auto-backup configurations</span>
                            </label>
                        </div>
                        <button className="btn btn-success w-full">Save Preferences</button>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Security Settings</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Enable two-factor authentication</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Require HTTPS for webhooks</span>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="session-timeout">Session Timeout (minutes)</label>
                            <input id="session-timeout" type="number" className="form-input" defaultValue="60" />
                        </div>
                        <div>
                            <label htmlFor="ip-whitelist">IP Whitelist (comma separated)</label>
                            <textarea
                                id="ip-whitelist"
                                rows={3}
                                className="form-textarea"
                                placeholder="192.168.1.1, 10.0.0.1"
                            ></textarea>
                        </div>
                        <button className="btn btn-warning w-full">Update Security Settings</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
