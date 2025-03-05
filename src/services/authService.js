
import { post, get } from '../utils/api';

export const authService = {
  /**
   * Login with username and password
   */
  login: (credentials) => post('/auth/login', credentials),
  
  /**
   * Logout the current user
   */
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
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
  }
};
