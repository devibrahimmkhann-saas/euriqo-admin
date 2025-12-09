import { AuthTokens } from '@/types/auth.types';

const ACCESS_TOKEN_KEY = 'euriqo_access_token';
const REFRESH_TOKEN_KEY = 'euriqo_refresh_token';
const USER_KEY = 'euriqo_user';

export class TokenStorage {
  // Check if we're in browser environment
  private static isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  // Store tokens securely
  static setTokens(tokens: AuthTokens): void {
    if (!this.isBrowser()) return;
    
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    } catch (error) {
      console.error('Failed to store tokens:', error);
    }
  }

  // Get access token
  static getAccessToken(): string | null {
    if (!this.isBrowser()) return null;
    
    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  }

  // Get refresh token
  static getRefreshToken(): string | null {
    if (!this.isBrowser()) return null;
    
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get refresh token:', error);
      return null;
    }
  }

  // Get both tokens
  static getTokens(): AuthTokens | null {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    
    if (!accessToken || !refreshToken) return null;
    
    return { accessToken, refreshToken };
  }

  // Store user data
  static setUser(user: any): void {
    if (!this.isBrowser()) return;
    
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user:', error);
    }
  }

  // Get user data
  static getUser(): any | null {
    if (!this.isBrowser()) return null;
    
    try {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to get user:', error);
      return null;
    }
  }

  // Clear all auth data
  static clearAll(): void {
    if (!this.isBrowser()) return;
    
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // Decode JWT token (basic decode without verification)
  static decodeToken(token: string): any | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  // Check if token is expired
  static isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  }

  // Check if access token is expired
  static isAccessTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;
    return this.isTokenExpired(token);
  }
}
