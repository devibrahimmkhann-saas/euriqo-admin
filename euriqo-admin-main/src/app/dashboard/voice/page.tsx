import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Voice & Narrator Settings - Euriqo Admin',
};

const VoicePage = () => {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-white">Voice & Narrator Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">Configure voice settings, narrator options, and auto-play triggers</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Voice Selection */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Voice Selection</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="voice-provider">Voice Provider</label>
                            <select id="voice-provider" className="form-select">
                                <option>OpenAI TTS</option>
                                <option>Google Cloud Text-to-Speech</option>
                                <option>Amazon Polly</option>
                                <option>Microsoft Azure Speech</option>
                                <option>ElevenLabs</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="voice-model">Voice Model</label>
                            <select id="voice-model" className="form-select">
                                <option>Alloy (Neutral)</option>
                                <option>Echo (Male)</option>
                                <option>Fable (British Male)</option>
                                <option>Onyx (Deep Male)</option>
                                <option>Nova (Female)</option>
                                <option>Shimmer (Soft Female)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="voice-language">Language</label>
                            <select id="voice-language" className="form-select">
                                <option>English (US)</option>
                                <option>English (UK)</option>
                                <option>Spanish (ES)</option>
                                <option>French (FR)</option>
                                <option>German (DE)</option>
                                <option>Italian (IT)</option>
                                <option>Portuguese (BR)</option>
                                <option>Japanese (JP)</option>
                                <option>Korean (KR)</option>
                                <option>Chinese (CN)</option>
                            </select>
                        </div>
                        <div className="flex gap-4">
                            <button className="btn btn-outline-primary flex-1">Preview Voice</button>
                            <button className="btn btn-primary flex-1">Save Selection</button>
                        </div>
                    </div>
                </div>

                {/* Voice Parameters */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Voice Parameters</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="speech-rate">Speech Rate</label>
                            <div className="flex items-center gap-3">
                                <span className="text-sm">Slow</span>
                                <input id="speech-rate" type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="flex-1" />
                                <span className="text-sm">Fast</span>
                            </div>
                            <div className="mt-1 text-center text-sm text-gray-500">Current: 1.0x</div>
                        </div>
                        <div>
                            <label htmlFor="pitch">Pitch</label>
                            <div className="flex items-center gap-3">
                                <span className="text-sm">Low</span>
                                <input id="pitch" type="range" min="-20" max="20" step="1" defaultValue="0" className="flex-1" />
                                <span className="text-sm">High</span>
                            </div>
                            <div className="mt-1 text-center text-sm text-gray-500">Current: 0 Hz</div>
                        </div>
                        <div>
                            <label htmlFor="volume">Volume</label>
                            <div className="flex items-center gap-3">
                                <span className="text-sm">Quiet</span>
                                <input id="volume" type="range" min="0" max="100" step="5" defaultValue="80" className="flex-1" />
                                <span className="text-sm">Loud</span>
                            </div>
                            <div className="mt-1 text-center text-sm text-gray-500">Current: 80%</div>
                        </div>
                        <div>
                            <label htmlFor="emphasis">Emphasis Level</label>
                            <select id="emphasis" className="form-select">
                                <option>None</option>
                                <option>Reduced</option>
                                <option>Moderate</option>
                                <option>Strong</option>
                            </select>
                        </div>
                        <button className="btn btn-success w-full">Apply Voice Parameters</button>
                    </div>
                </div>

                {/* Narrator Settings */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Website Narrator</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Enable narrator on website</span>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="narrator-voice">Narrator Voice</label>
                            <select id="narrator-voice" className="form-select">
                                <option>Same as assistant voice</option>
                                <option>Nova (Female)</option>
                                <option>Alloy (Neutral)</option>
                                <option>Echo (Male)</option>
                                <option>Custom voice</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="narrator-speed">Narrator Speed</label>
                            <div className="flex items-center gap-3">
                                <span className="text-sm">0.5x</span>
                                <input id="narrator-speed" type="range" min="0.5" max="2" step="0.1" defaultValue="1.2" className="flex-1" />
                                <span className="text-sm">2x</span>
                            </div>
                            <div className="mt-1 text-center text-sm text-gray-500">Current: 1.2x</div>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="text-white-dark">Highlight text while reading</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Show narrator controls</span>
                            </label>
                        </div>
                        <button className="btn btn-info w-full">Configure Narrator</button>
                    </div>
                </div>

                {/* Auto-play Triggers */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Auto-play Triggers</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Auto-play on page load</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="text-white-dark">Auto-play on scroll to section</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="text-white-dark">Auto-play on click/tap</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="text-white-dark">Auto-play on hover (desktop)</span>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="delay-time">Delay before auto-play (seconds)</label>
                            <input id="delay-time" type="number" className="form-input" defaultValue="2" min="0" max="10" />
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Respect user's reduced motion preference</span>
                            </label>
                        </div>
                        <button className="btn btn-warning w-full">Save Trigger Settings</button>
                    </div>
                </div>

                {/* Live Testing */}
                <div className="panel lg:col-span-2">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Live Voice Testing</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="test-text">Test Text</label>
                            <textarea
                                id="test-text"
                                rows={4}
                                className="form-textarea"
                                defaultValue="Hello! Welcome to Euriqo. I'm your AI voice assistant, and I'm here to help you with any questions you might have about our products and services. How can I assist you today?"
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="rounded border p-4 dark:border-gray-600">
                                <h6 className="mb-3 font-semibold">Quick Tests</h6>
                                <div className="space-y-2">
                                    <button className="btn btn-outline-primary btn-sm w-full">Test Greeting</button>
                                    <button className="btn btn-outline-secondary btn-sm w-full">Test FAQ Response</button>
                                    <button className="btn btn-outline-info btn-sm w-full">Test Error Message</button>
                                    <button className="btn btn-outline-success btn-sm w-full">Test Goodbye</button>
                                </div>
                            </div>
                            <div className="rounded border p-4 dark:border-gray-600">
                                <h6 className="mb-3 font-semibold">Voice Comparison</h6>
                                <div className="space-y-2">
                                    <button className="btn btn-outline-primary btn-sm w-full">Compare Male Voices</button>
                                    <button className="btn btn-outline-secondary btn-sm w-full">Compare Female Voices</button>
                                    <button className="btn btn-outline-info btn-sm w-full">Compare Languages</button>
                                    <button className="btn btn-outline-warning btn-sm w-full">Compare Speeds</button>
                                </div>
                            </div>
                            <div className="rounded border p-4 dark:border-gray-600">
                                <h6 className="mb-3 font-semibold">Advanced Testing</h6>
                                <div className="space-y-2">
                                    <button className="btn btn-outline-primary btn-sm w-full">SSML Testing</button>
                                    <button className="btn btn-outline-secondary btn-sm w-full">Emotion Testing</button>
                                    <button className="btn btn-outline-info btn-sm w-full">Pronunciation Test</button>
                                    <button className="btn btn-outline-danger btn-sm w-full">Stress Test</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="btn btn-gradient flex-1">
                                <svg className="h-5 w-5 ltr:mr-2 rtl:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-6-10V4a2 2 0 012-2h4a2 2 0 012 2v2M7 7h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
                                </svg>
                                Test Current Configuration
                            </button>
                            <button className="btn btn-outline-success">
                                <svg className="h-5 w-5 ltr:mr-2 rtl:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Download Sample
                            </button>
                        </div>
                    </div>
                </div>

                {/* Voice Analytics */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Voice Usage Analytics</h5>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <span>Total Voice Generations</span>
                            <span className="font-bold text-primary">8,549</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <span>Average Response Time</span>
                            <span className="font-bold text-secondary">1.2s</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <span>Most Used Voice</span>
                            <span className="font-bold text-success">Nova (Female)</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <span>Audio Storage Used</span>
                            <span className="font-bold text-warning">450 MB</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded dark:bg-gray-800">
                            <span>Cost This Month</span>
                            <span className="font-bold text-info">$23.45</span>
                        </div>
                        <button className="btn btn-outline-primary w-full">View Detailed Analytics</button>
                    </div>
                </div>

                {/* Voice Cache Settings */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Voice Cache & Performance</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Enable voice caching</span>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="cache-duration">Cache Duration</label>
                            <select id="cache-duration" className="form-select">
                                <option>1 hour</option>
                                <option>6 hours</option>
                                <option>24 hours</option>
                                <option>7 days</option>
                                <option>30 days</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="max-cache-size">Max Cache Size (MB)</label>
                            <input id="max-cache-size" type="number" className="form-input" defaultValue="500" min="100" max="2000" />
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="text-white-dark">Preload common phrases</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Compress audio files</span>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <button className="btn btn-outline-warning flex-1">Clear Cache</button>
                            <button className="btn btn-success flex-1">Save Settings</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoicePage;
