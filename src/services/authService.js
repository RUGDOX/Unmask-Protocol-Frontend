
import { post, get } from '../utils/api';
import { toast } from 'sonner';

// Token refresh timing constants
const TOKEN_REFRESH_INTERVAL = 1000 * 60 * 14; // 14 minutes (assuming 15 min token lifespan)
const TOKEN_EXPIRY_THRESHOLD = 1000 * 60 * 1; // 1 minute before actual expiry

// Singleton to track token refresh interval
let tokenRefreshInterval = null;

export const authService = {
  /**
   * Login with username and password
   */
  login: async (credentials) => {
    try {
      const response = await post('/auth/login', credentials);
      
      if (!response || !response.token) {
        throw new Error('Invalid login response');
      }
      
      // Store auth data securely
      authService.saveAuthData(response);
      
      // Set up token refresh mechanism
      authService.setupTokenRefresh();
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  },
  
  /**
   * Save authentication data to local storage
   */
  saveAuthData: (authData) => {
    if (!authData || !authData.token) return;
    
    // Store token with expiry time calculation
    const tokenData = {
      value: authData.token,
      expiry: Date.now() + (authData.expiresIn || 900) * 1000, // Default 15 minutes if not specified
    };
    
    localStorage.setItem('auth_token', JSON.stringify(tokenData));
    localStorage.setItem('user_role', authData.role);
    localStorage.setItem('user_id', authData.id);
  },
  
  /**
   * Get token if valid, otherwise return null
   */
  getToken: () => {
    try {
      const tokenData = JSON.parse(localStorage.getItem('auth_token'));
      
      if (!tokenData) return null;
      
      // Check if token is expired
      if (Date.now() > tokenData.expiry) {
        authService.clearAuthData();
        return null;
      }
      
      return tokenData.value;
    } catch (error) {
      console.error('Error retrieving token:', error);
      authService.clearAuthData();
      return null;
    }
  },
  
  /**
   * Setup automatic token refresh
   */
  setupTokenRefresh: () => {
    // Clear any existing interval
    if (tokenRefreshInterval) {
      clearInterval(tokenRefreshInterval);
    }
    
    // Set new interval for token refresh
    tokenRefreshInterval = setInterval(async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem('auth_token'));
        
        if (!tokenData) {
          clearInterval(tokenRefreshInterval);
          return;
        }
        
        const timeUntilExpiry = tokenData.expiry - Date.now();
        
        // Refresh when token is close to expiry
        if (timeUntilExpiry < TOKEN_EXPIRY_THRESHOLD) {
          const refreshed = await authService.refreshToken();
          
          if (!refreshed) {
            console.warn('Token refresh failed, logging out');
            authService.logout();
            clearInterval(tokenRefreshInterval);
          }
        }
      } catch (error) {
        console.error('Error in token refresh cycle:', error);
      }
    }, TOKEN_REFRESH_INTERVAL);
  },
  
  /**
   * Clear auth data from local storage
   */
  clearAuthData: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
    
    if (tokenRefreshInterval) {
      clearInterval(tokenRefreshInterval);
      tokenRefreshInterval = null;
    }
  },
  
  /**
   * Logout the current user
   */
  logout: () => {
    try {
      // Get token before clearing
      const token = authService.getToken();
      
      // Don't attempt logout API if no token
      if (token) {
        // Call the logout endpoint to invalidate the token on the server
        post('/auth/logout', {}).catch(err => console.error('Logout error:', err));
      }
    } finally {
      // Always clear local storage even if the API call fails
      authService.clearAuthData();
    }
  },
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!authService.getToken();
  },
  
  /**
   * Get current user role
   */
  getUserRole: () => {
    return localStorage.getItem('user_role') || '';
  },
  
  /**
   * Check if current user has specific role
   */
  hasRole: (role) => {
    const userRole = localStorage.getItem('user_role');
    return userRole === role;
  },
  
  /**
   * Get current user ID
   */
  getUserId: () => {
    return localStorage.getItem('user_id');
  },
  
  /**
   * Get current user profile
   */
  getUserProfile: async () => {
    return await get('/auth/profile');
  },
  
  /**
   * Refresh token
   */
  refreshToken: async () => {
    try {
      const response = await post('/auth/refresh-token', {});
      
      if (response && response.token) {
        authService.saveAuthData(response);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return false;
    }
  }
};
