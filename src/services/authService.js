
import { post, get } from '../utils/api';

export const authService = {
  /**
   * Login with username and password
   */
  login: async (credentials) => {
    const response = await post('/auth/login', credentials);
    if (response && response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_role', response.role);
      localStorage.setItem('user_id', response.id);
      return response;
    }
    throw new Error('Invalid login response');
  },
  
  /**
   * Logout the current user
   */
  logout: () => {
    try {
      // Call the logout endpoint to invalidate the token on the server
      post('/auth/logout', {}).catch(err => console.error('Logout error:', err));
    } finally {
      // Always clear local storage even if the API call fails
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_id');
    }
  },
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
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
        localStorage.setItem('auth_token', response.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return false;
    }
  }
};
