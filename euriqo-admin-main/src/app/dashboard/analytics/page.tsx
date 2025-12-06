import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard / Analytics - Euriqo Admin',
};

const AnalyticsPage = () => {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-white">Dashboard / Analytics</h1>
                <p className="text-gray-600 dark:text-gray-400">Monitor engagement, usage metrics, sentiment analysis, and generate reports</p>
            </div>

            {/* Key Metrics */}
            <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
                <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Total Active Users</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">1,234</div>
                        <div className="badge bg-white/30">+ 12.5%</div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <span className="text-sm">vs last month</span>
                    </div>
                </div>

                <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Engagement Rate</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">78.5%</div>
                        <div className="badge bg-white/30">+ 5.2%</div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <span className="text-sm">avg session engagement</span>
                    </div>
                </div>

                <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Voice Interactions</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">8,549</div>
                        <div className="badge bg-white/30">+ 18.2%</div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <span className="text-sm">this month</span>
                    </div>
                </div>

                <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Avg Session Time</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">4m 32s</div>
                        <div className="badge bg-white/30">+ 8.1%</div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <span className="text-sm">per conversation</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Usage Metrics Chart */}
                <div className="panel lg:col-span-2">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Usage Metrics Over Time</h5>
                        <div className="flex gap-2">
                            <select className="form-select w-auto">
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last 3 months</option>
                                <option>Last year</option>
                            </select>
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700" style={{ height: '300px' }}>
                        <div className="flex h-full items-center justify-center text-gray-500">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <p>Interactive Chart Placeholder</p>
                                <p className="text-sm">Voice interactions, chat sessions, and user engagement</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sentiment Analysis */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Sentiment Analysis</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="mb-2 flex justify-between">
                                <span className="text-sm font-medium">Positive</span>
                                <span className="text-sm font-bold text-success">68%</span>
                            </div>
                            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                <div className="h-2 rounded-full bg-success" style={{ width: '68%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 flex justify-between">
                                <span className="text-sm font-medium">Neutral</span>
                                <span className="text-sm font-bold text-info">24%</span>
                            </div>
                            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                <div className="h-2 rounded-full bg-info" style={{ width: '24%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 flex justify-between">
                                <span className="text-sm font-medium">Negative</span>
                                <span className="text-sm font-bold text-danger">8%</span>
                            </div>
                            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                <div className="h-2 rounded-full bg-danger" style={{ width: '8%' }}></div>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <div className="text-sm">
                                <strong>Sentiment Score:</strong> +0.72 (Very Positive)
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Based on 1,234 conversations this month
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Interaction Types */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Top Interaction Types</h5>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-primary"></div>
                                <span className="font-medium">Product Inquiries</span>
                            </div>
                            <span className="font-bold">342</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-secondary"></div>
                                <span className="font-medium">Support Requests</span>
                            </div>
                            <span className="font-bold">287</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-success"></div>
                                <span className="font-medium">Billing Questions</span>
                            </div>
                            <span className="font-bold">156</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-warning"></div>
                                <span className="font-medium">General Info</span>
                            </div>
                            <span className="font-bold">98</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-info"></div>
                                <span className="font-medium">Technical Issues</span>
                            </div>
                            <span className="font-bold">67</span>
                        </div>
                    </div>
                </div>

                {/* Performance Metrics */}
                <div className="panel lg:col-span-2">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Performance Metrics</h5>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="text-center p-4 rounded border dark:border-gray-600">
                            <div className="text-2xl font-bold text-primary mb-2">92.5%</div>
                            <div className="text-sm font-medium">AI Resolution Rate</div>
                            <div className="text-xs text-gray-500 mt-1">Without human intervention</div>
                        </div>
                        <div className="text-center p-4 rounded border dark:border-gray-600">
                            <div className="text-2xl font-bold text-secondary mb-2">1.2s</div>
                            <div className="text-sm font-medium">Avg Response Time</div>
                            <div className="text-xs text-gray-500 mt-1">First response latency</div>
                        </div>
                        <div className="text-center p-4 rounded border dark:border-gray-600">
                            <div className="text-2xl font-bold text-success mb-2">4.7/5</div>
                            <div className="text-sm font-medium">Customer Satisfaction</div>
                            <div className="text-xs text-gray-500 mt-1">Based on 456 ratings</div>
                        </div>
                        <div className="text-center p-4 rounded border dark:border-gray-600">
                            <div className="text-2xl font-bold text-info mb-2">7.5%</div>
                            <div className="text-sm font-medium">Escalation Rate</div>
                            <div className="text-xs text-gray-500 mt-1">Transferred to humans</div>
                        </div>
                    </div>
                </div>

                {/* Geographic Distribution */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Geographic Distribution</h5>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">🇺🇸</span>
                                <span>United States</span>
                            </div>
                            <div className="text-right">
                                <div className="font-bold">45%</div>
                                <div className="text-xs text-gray-500">556 users</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">🇨🇦</span>
                                <span>Canada</span>
                            </div>
                            <div className="text-right">
                                <div className="font-bold">18%</div>
                                <div className="text-xs text-gray-500">222 users</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">🇬🇧</span>
                                <span>United Kingdom</span>
                            </div>
                            <div className="text-right">
                                <div className="font-bold">12%</div>
                                <div className="text-xs text-gray-500">148 users</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">🇦🇺</span>
                                <span>Australia</span>
                            </div>
                            <div className="text-right">
                                <div className="font-bold">8%</div>
                                <div className="text-xs text-gray-500">99 users</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">🌍</span>
                                <span>Others</span>
                            </div>
                            <div className="text-right">
                                <div className="font-bold">17%</div>
                                <div className="text-xs text-gray-500">209 users</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Peak Usage Times */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Peak Usage Times</h5>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span>9:00 AM - 11:00 AM</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-2 rounded-full bg-primary" style={{ width: '85%' }}></div>
                                </div>
                                <span className="text-sm font-bold">85%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>2:00 PM - 4:00 PM</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-2 rounded-full bg-secondary" style={{ width: '72%' }}></div>
                                </div>
                                <span className="text-sm font-bold">72%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>7:00 PM - 9:00 PM</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-2 rounded-full bg-success" style={{ width: '58%' }}></div>
                                </div>
                                <span className="text-sm font-bold">58%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>11:00 AM - 1:00 PM</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-2 rounded-full bg-info" style={{ width: '45%' }}></div>
                                </div>
                                <span className="text-sm font-bold">45%</span>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-3">
                            * Times shown in your local timezone (PST)
                        </div>
                    </div>
                </div>

                {/* Exportable Reports */}
                <div className="panel lg:col-span-2">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Exportable Reports</h5>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded border p-4 dark:border-gray-600">
                            <h6 className="mb-2 font-semibold">Usage Analytics Report</h6>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Comprehensive usage statistics, user engagement, and interaction metrics
                            </p>
                            <div className="flex gap-2">
                                <button className="btn btn-outline-primary btn-sm">CSV</button>
                                <button className="btn btn-outline-secondary btn-sm">JSON</button>
                                <button className="btn btn-outline-info btn-sm">PDF</button>
                            </div>
                        </div>
                        <div className="rounded border p-4 dark:border-gray-600">
                            <h6 className="mb-2 font-semibold">Conversation Logs</h6>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Detailed conversation transcripts, sentiment scores, and resolution data
                            </p>
                            <div className="flex gap-2">
                                <button className="btn btn-outline-primary btn-sm">CSV</button>
                                <button className="btn btn-outline-secondary btn-sm">JSON</button>
                                <button className="btn btn-outline-info btn-sm">PDF</button>
                            </div>
                        </div>
                        <div className="rounded border p-4 dark:border-gray-600">
                            <h6 className="mb-2 font-semibold">Performance Metrics</h6>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                AI performance, response times, resolution rates, and quality scores
                            </p>
                            <div className="flex gap-2">
                                <button className="btn btn-outline-primary btn-sm">CSV</button>
                                <button className="btn btn-outline-secondary btn-sm">JSON</button>
                                <button className="btn btn-outline-info btn-sm">PDF</button>
                            </div>
                        </div>
                        <div className="rounded border p-4 dark:border-gray-600">
                            <h6 className="mb-2 font-semibold">Custom Report</h6>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Build custom reports with specific metrics and date ranges
                            </p>
                            <div className="flex gap-2">
                                <button className="btn btn-primary btn-sm">Configure</button>
                                <button className="btn btn-outline-secondary btn-sm">Templates</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
