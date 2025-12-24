import { ApiResponse } from '@/types/auth.types';
import { TokenStorage } from '@/utils/token-storage';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_TIMEOUT = 30000; // 30 seconds

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Request configuration interface
interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
  timeout?: number;
}

// API Client class
export class ApiClient {
  private baseURL: string;
  private defaultTimeout: number;

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL;
    this.defaultTimeout = timeout;
  }

  // Create request headers
  private createHeaders(config: RequestConfig = {}): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...config.headers,
    };

    // Add authorization header if required and token exists
    if (config.requiresAuth !== false) {
      const accessToken = TokenStorage.getAccessToken();
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return headers;
  }

  // Create AbortController for timeout
  private createAbortController(timeout: number): AbortController {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller;
  }

  // Handle API response
  private async handleResponse<T>(response: Response): Promise<T> {
    let data: any;
    
    try {
      data = await response.json();
    } catch (error) {
      throw new ApiError('Invalid JSON response', response.status);
    }

    if (!response.ok) {
      const message = data?.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new ApiError(message, response.status, data);
    }

    return data;
  }

  // Make HTTP request
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      method = 'GET',
      body,
      timeout = this.defaultTimeout,
      requiresAuth = true,
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    const headers = this.createHeaders(config);
    const controller = this.createAbortController(timeout);

    const requestInit: RequestInit = {
      method,
      headers,
      signal: controller.signal,
    };

    // Add body for non-GET requests
    if (body && method !== 'GET') {
      requestInit.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, requestInit);
      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError('Request timeout', 408);
        }
        throw new ApiError(error.message, 0);
      }
      
      throw new ApiError('Unknown error occurred', 0);
    }
  }

  // GET request
  async get<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body });
  }

  // PUT request
  async put<T>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body });
  }

  // DELETE request
  async delete<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  // PATCH request
  async patch<T>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Convenience methods for common patterns
export const api = {
  // Authentication endpoints
  auth: {
    login: (credentials: any) => 
      apiClient.post<ApiResponse>('/api/auth/login', credentials, { requiresAuth: false }),
    
    signup: (userData: any) => 
      apiClient.post<ApiResponse>('/api/auth/signup', userData, { requiresAuth: false }),
    
    register: (userData: any) => 
      apiClient.post<ApiResponse>('/api/auth/signup', userData, { requiresAuth: false }),
    
    logout: () => 
      apiClient.post<ApiResponse>('/api/auth/logout'),
    
    refreshToken: (refreshToken: string) => 
      apiClient.post<ApiResponse>('/api/auth/refresh', { refreshToken }, { requiresAuth: false }),
    
    me: () => 
      apiClient.get<ApiResponse>('/api/auth/me'),
    
    profile: () => 
      apiClient.get<ApiResponse>('/api/auth/profile'),
  },

  // Projects endpoints
  projects: {
    create: (projectData: { name: string; description?: string; domain: string }) =>
      apiClient.post<ApiResponse>('/api/projects', projectData),
    
    list: () =>
      apiClient.get<ApiResponse>('/api/projects'),
    
    get: (projectId: string) =>
      apiClient.get<ApiResponse>(`/api/projects/${projectId}`),
    
    update: (projectId: string, projectData: any) =>
      apiClient.put<ApiResponse>(`/api/projects/${projectId}`, projectData),
    
    delete: (projectId: string) =>
      apiClient.delete<ApiResponse>(`/api/projects/${projectId}`),
  },

  // Generic CRUD operations
  get: <T>(endpoint: string, config?: Parameters<typeof apiClient.get>[1]) => 
    apiClient.get<T>(endpoint, config),
  
  post: <T>(endpoint: string, body?: any, config?: Parameters<typeof apiClient.post>[2]) => 
    apiClient.post<T>(endpoint, body, config),
  
  put: <T>(endpoint: string, body?: any, config?: Parameters<typeof apiClient.put>[2]) => 
    apiClient.put<T>(endpoint, body, config),
  
  delete: <T>(endpoint: string, config?: Parameters<typeof apiClient.delete>[1]) => 
    apiClient.delete<T>(endpoint, config),
  
  patch: <T>(endpoint: string, body?: any, config?: Parameters<typeof apiClient.patch>[2]) => 
    apiClient.patch<T>(endpoint, body, config),
};

export default api;


// to dos
// 
// days weekdays
// 8pm to 5am work