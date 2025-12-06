import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Widget / Branding Customization - Euriqo Admin',
};

const BrandingPage = () => {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-white">Widget / Branding Customization</h1>
                <p className="text-gray-600 dark:text-gray-400">Customize theme colors, logos, fonts, and widget layout</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Theme Colors */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Theme Colors</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="primary-color">Primary Color</label>
                            <div className="flex gap-2">
                                <input id="primary-color" type="color" className="h-10 w-16 rounded border" defaultValue="#4361ee" />
                                <input type="text" className="form-input flex-1" defaultValue="#4361ee" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="secondary-color">Secondary Color</label>
                            <div className="flex gap-2">
                                <input id="secondary-color" type="color" className="h-10 w-16 rounded border" defaultValue="#805dca" />
                                <input type="text" className="form-input flex-1" defaultValue="#805dca" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="accent-color">Accent Color</label>
                            <div className="flex gap-2">
                                <input id="accent-color" type="color" className="h-10 w-16 rounded border" defaultValue="#00ab55" />
                                <input type="text" className="form-input flex-1" defaultValue="#00ab55" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="background-color">Background Color</label>
                            <div className="flex gap-2">
                                <input id="background-color" type="color" className="h-10 w-16 rounded border" defaultValue="#ffffff" />
                                <input type="text" className="form-input flex-1" defaultValue="#ffffff" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="text-color">Text Color</label>
                            <div className="flex gap-2">
                                <input id="text-color" type="color" className="h-10 w-16 rounded border" defaultValue="#0e1726" />
                                <input type="text" className="form-input flex-1" defaultValue="#0e1726" />
                            </div>
                        </div>
                        <button className="btn btn-primary w-full">Apply Color Theme</button>
                    </div>
                </div>

                {/* Logo & Assets */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Logo & Assets</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label>Company Logo</label>
                            <div className="mt-2">
                                <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
                                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <button className="btn btn-outline-primary btn-sm mt-2">Upload Logo</button>
                            </div>
                        </div>
                        <div>
                            <label>Favicon</label>
                            <div className="mt-2">
                                <div className="flex h-16 w-16 items-center justify-center rounded border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <button className="btn btn-outline-secondary btn-sm mt-2">Upload Favicon</button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="company-name">Company Name</label>
                            <input id="company-name" type="text" className="form-input" placeholder="Your Company Name" defaultValue="Euriqo" />
                        </div>
                        <div>
                            <label htmlFor="tagline">Tagline</label>
                            <input id="tagline" type="text" className="form-input" placeholder="Your company tagline" defaultValue="AI Voice Assistant" />
                        </div>
                        <button className="btn btn-secondary w-full">Save Branding Assets</button>
                    </div>
                </div>

                {/* Typography */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Typography</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="font-family">Font Family</label>
                            <select id="font-family" className="form-select">
                                <option>Inter</option>
                                <option>Roboto</option>
                                <option>Open Sans</option>
                                <option>Nunito</option>
                                <option>Poppins</option>
                                <option>Lato</option>
                                <option>Montserrat</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="font-size">Base Font Size</label>
                            <select id="font-size" className="form-select">
                                <option>12px</option>
                                <option>14px</option>
                                <option>16px</option>
                                <option>18px</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="font-weight">Font Weight</label>
                            <select id="font-weight" className="form-select">
                                <option>300 (Light)</option>
                                <option>400 (Normal)</option>
                                <option>500 (Medium)</option>
                                <option>600 (Semi Bold)</option>
                                <option>700 (Bold)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="line-height">Line Height</label>
                            <select id="line-height" className="form-select">
                                <option>1.2</option>
                                <option>1.4</option>
                                <option>1.5</option>
                                <option>1.6</option>
                                <option>1.8</option>
                            </select>
                        </div>
                        <button className="btn btn-info w-full">Apply Typography</button>
                    </div>
                </div>

                {/* Widget Layout */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Widget Layout</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label>Layout Style</label>
                            <div className="mt-2 grid grid-cols-3 gap-2">
                                <label className="cursor-pointer">
                                    <input type="radio" name="layout" className="sr-only" defaultChecked />
                                    <div className="rounded border-2 border-primary bg-primary/10 p-3 text-center">
                                        <div className="mb-2 h-8 w-8 mx-auto rounded-full bg-primary"></div>
                                        <span className="text-xs">Floating Bubble</span>
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input type="radio" name="layout" className="sr-only" />
                                    <div className="rounded border-2 border-gray-300 p-3 text-center hover:border-primary">
                                        <div className="mb-2 h-8 w-full bg-gray-300 rounded"></div>
                                        <span className="text-xs">Sidebar</span>
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input type="radio" name="layout" className="sr-only" />
                                    <div className="rounded border-2 border-gray-300 p-3 text-center hover:border-primary">
                                        <div className="mb-2 h-6 w-full bg-gray-300 rounded"></div>
                                        <span className="text-xs">Inline</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="widget-position">Widget Position</label>
                            <select id="widget-position" className="form-select">
                                <option>Bottom Right</option>
                                <option>Bottom Left</option>
                                <option>Top Right</option>
                                <option>Top Left</option>
                                <option>Center</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="widget-size">Widget Size</label>
                            <select id="widget-size" className="form-select">
                                <option>Small</option>
                                <option>Medium</option>
                                <option>Large</option>
                                <option>Custom</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Show company logo</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="text-white-dark">Enable animations</span>
                            </label>
                        </div>
                        <button className="btn btn-success w-full">Update Widget Layout</button>
                    </div>
                </div>

                {/* Voice Personalities */}
                <div className="panel lg:col-span-2">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Pre-set Voice Personalities</h5>
                        <button className="btn btn-primary btn-sm">Create Custom Personality</button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                            <div className="mb-3 flex items-center justify-between">
                                <h6 className="font-semibold">Professional</h6>
                                <input type="radio" name="personality" className="form-radio" defaultChecked />
                            </div>
                            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                                Formal, courteous, and business-oriented tone. Perfect for corporate environments.
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Formality:</span>
                                    <span className="font-medium">High</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Friendliness:</span>
                                    <span className="font-medium">Medium</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Enthusiasm:</span>
                                    <span className="font-medium">Low</span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                            <div className="mb-3 flex items-center justify-between">
                                <h6 className="font-semibold">Friendly</h6>
                                <input type="radio" name="personality" className="form-radio" />
                            </div>
                            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                                Warm, approachable, and conversational. Great for customer service and support.
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Formality:</span>
                                    <span className="font-medium">Medium</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Friendliness:</span>
                                    <span className="font-medium">High</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Enthusiasm:</span>
                                    <span className="font-medium">Medium</span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                            <div className="mb-3 flex items-center justify-between">
                                <h6 className="font-semibold">Enthusiastic</h6>
                                <input type="radio" name="personality" className="form-radio" />
                            </div>
                            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                                Energetic, positive, and engaging. Ideal for sales and marketing interactions.
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Formality:</span>
                                    <span className="font-medium">Low</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Friendliness:</span>
                                    <span className="font-medium">High</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Enthusiasm:</span>
                                    <span className="font-medium">High</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dark/Light Mode Toggle */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Theme Mode</h5>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label>Default Theme</label>
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                <label className="cursor-pointer">
                                    <input type="radio" name="theme-mode" className="sr-only" defaultChecked />
                                    <div className="rounded border-2 border-primary bg-white p-4 text-center">
                                        <div className="mb-2 h-6 w-full bg-gray-100 rounded"></div>
                                        <span className="text-sm text-gray-800">Light Mode</span>
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input type="radio" name="theme-mode" className="sr-only" />
                                    <div className="rounded border-2 border-gray-300 bg-gray-800 p-4 text-center hover:border-primary">
                                        <div className="mb-2 h-6 w-full bg-gray-700 rounded"></div>
                                        <span className="text-sm text-white">Dark Mode</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span className="text-white-dark">Allow users to toggle theme</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex cursor-pointer items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="text-white-dark">Auto-detect system preference</span>
                            </label>
                        </div>
                        <button className="btn btn-warning w-full">Apply Theme Settings</button>
                    </div>
                </div>

                {/* Preview */}
                <div className="panel">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Live Preview</h5>
                    </div>
                    <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-600 dark:bg-gray-800">
                        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </div>
                        <h6 className="mb-2 font-semibold">Widget Preview</h6>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            This is how your voice assistant widget will appear to users.
                        </p>
                        <button className="btn btn-primary btn-sm mt-4">Start Conversation</button>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <button className="btn btn-outline-primary btn-sm flex-1">Preview on Desktop</button>
                        <button className="btn btn-outline-secondary btn-sm flex-1">Preview on Mobile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandingPage;
