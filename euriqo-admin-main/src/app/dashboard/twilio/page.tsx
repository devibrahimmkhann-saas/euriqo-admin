import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Twilio / Voice Call Integration - Euriqo Admin',
};

const TwilioPage = () => {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-white">Twilio / Voice Call Integration</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage phone numbers, call flows, and voice interactions</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Phone Numbers Management */}
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Phone Numbers</h5>
                        <button className="btn btn-primary btn-sm">Add Number</button>
                    </div>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Phone Number</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>+1 (555) 123-4567</td>
                                    <td><span className="badge bg-success">Active</span></td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button className="btn btn-sm btn-outline-primary">Edit</button>
                                            <button className="btn btn-sm btn-outline-danger">Remove</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>+1 (555) 987-6543</td>
                                    <td><span className="badge bg-warning">Pending</span></td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button className="btn btn-sm btn-outline-primary">Edit</button>
                                            <button className="btn btn-sm btn-outline-danger">Remove</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Call Flow Configuration */}
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Call Flow Configuration</h5>
                        <button className="btn btn-secondary btn-sm">New Flow</button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="greeting">Greeting Message</label>
                            <textarea
                                id="greeting"
                                rows={3}
                                className="form-textarea"
                                placeholder="Hello! Welcome to Euriqo. How can I assist you today?"
                                defaultValue="Hello! Welcome to Euriqo. How can I assist you today?"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="timeout">Call Timeout (seconds)</label>
                            <input id="timeout" type="number" className="form-input" defaultValue="30" />
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Enable call recording</span>
                            </label>
                        </div>
                        <button className="btn btn-primary w-full">Save Configuration</button>
                    </div>
                </div>

                {/* Call Logs */}
                <div className="panel lg:col-span-2">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Recent Call Logs</h5>
                        <div className="flex gap-2">
                            <button className="btn btn-outline-primary btn-sm">Export</button>
                            <button className="btn btn-outline-secondary btn-sm">Filter</button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table-hover">
                            <thead>
                                <tr>
                                    <th>Date & Time</th>
                                    <th>Caller Number</th>
                                    <th>Duration</th>
                                    <th>Status</th>
                                    <th>Transcription</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2024-12-05 14:30:25</td>
                                    <td>+1 (555) 111-2222</td>
                                    <td>2m 45s</td>
                                    <td><span className="badge bg-success">Completed</span></td>
                                    <td>
                                        <button className="btn btn-outline-info btn-sm">View</button>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button className="btn btn-sm btn-outline-primary">Listen</button>
                                            <button className="btn btn-sm btn-outline-secondary">Download</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2024-12-05 13:15:10</td>
                                    <td>+1 (555) 333-4444</td>
                                    <td>1m 20s</td>
                                    <td><span className="badge bg-warning">Escalated</span></td>
                                    <td>
                                        <button className="btn btn-outline-info btn-sm">View</button>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button className="btn btn-sm btn-outline-primary">Listen</button>
                                            <button className="btn btn-sm btn-outline-secondary">Download</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2024-12-05 12:45:33</td>
                                    <td>+1 (555) 555-6666</td>
                                    <td>0m 15s</td>
                                    <td><span className="badge bg-danger">Failed</span></td>
                                    <td>
                                        <span className="text-gray-400">N/A</span>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button className="btn btn-sm btn-outline-warning">Retry</button>
                                            <button className="btn btn-sm btn-outline-info">Details</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Live Agent Escalation */}
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Live Agent Escalation</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Enable live agent escalation</span>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="escalation-trigger">Escalation Trigger</label>
                            <select id="escalation-trigger" className="form-select">
                                <option>User requests human agent</option>
                                <option>AI confidence below threshold</option>
                                <option>Complex query detected</option>
                                <option>After 3 failed attempts</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="agent-number">Agent Phone Number</label>
                            <input id="agent-number" type="tel" className="form-input" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div>
                            <label htmlFor="escalation-message">Escalation Message</label>
                            <textarea
                                id="escalation-message"
                                rows={2}
                                className="form-textarea"
                                placeholder="Let me connect you with a human agent..."
                                defaultValue="Let me connect you with a human agent who can better assist you."
                            ></textarea>
                        </div>
                        <button className="btn btn-success w-full">Update Escalation Settings</button>
                    </div>
                </div>

                {/* Test Call Interface */}
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Test Call Interface</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="test-number">Test Phone Number</label>
                            <input id="test-number" type="tel" className="form-input" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div>
                            <label htmlFor="test-scenario">Test Scenario</label>
                            <select id="test-scenario" className="form-select">
                                <option>Basic greeting and FAQ</option>
                                <option>Product information inquiry</option>
                                <option>Support ticket creation</option>
                                <option>Agent escalation test</option>
                                <option>Custom scenario</option>
                            </select>
                        </div>
                        <button className="btn btn-gradient w-full">
                            <svg className="h-5 w-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            Initiate Test Call
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwilioPage;
