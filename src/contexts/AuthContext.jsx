
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  // Function to load user profile from token
  const loadUserFromToken = async () => {
    try {
      setAuthError(null);
      
      // Check if token exists and is valid
      if (!authService.isAuthenticated()) {
        setLoading(false);
        return;
      }

      // Set up token refresh mechanism
      authService.setupTokenRefresh();

      // Get basic user data from localStorage
      const id = authService.getUserId();
      const role = authService.getUserRole();

      if (!id || !role) {
        console.warn("Token exists but unable to extract user data. Clearing auth data.");
        authService.clearAuthData();
        setLoading(false);
        return;
      }

      // Set basic user data
      setUser({
        id,
        role,
      });

      // Optionally fetch additional user data from the server
      try {
        const userProfile = await authService.getUserProfile();
        if (userProfile) {
          setUser(prev => ({
            ...prev,
            ...userProfile,
          }));
        }
      } catch (error) {
        console.error("Could not fetch user profile:", error);
        // Continue with basic user data, don't fail completely
      }
    } catch (error) {
      console.error("Error loading user from token:", error);
      setAuthError(error.message || "Authentication error");
      authService.clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserFromToken();
    
    // Set up event listener for storage changes (for multi-tab synchronization)
    const handleStorageChange = (e) => {
      if (e.key === 'auth_token' && !e.newValue) {
        // Token was removed in another tab
        setUser(null);
        navigate('/login');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      // Environment check for development mode
      const isDevelopment = import.meta.env.DEV || false;
      
      let response;
      
      // For demo purposes only - use in development mode
      if (isDevelopment && (credentials.username === 'admin' || credentials.username === 'agent')) {
        console.log('Using development mode login with mock credentials');
        // Simulated response for demonstration
        response = {
          token: 'simulated_jwt_token',
          expiresIn: 900, // 15 minutes
          id: credentials.username === 'admin' ? '1' : '2',
          role: credentials.username === 'admin' ? 'admin' : 'agent',
        };
        
        // Store auth data
        authService.saveAuthData(response);
      } else {
        // Real implementation for production
        response = await authService.login(credentials);
      }
      
      if (!response) {
        throw new Error('Invalid response from authentication service');
      }
      
      setUser({
        id: response.id,
        role: response.role,
        username: credentials.username,
      });
      
      toast.success(`Welcome back, ${credentials.username}!`);
      
      // Redirect based on role
      if (response.role === 'admin') {
        navigate('/admin');
      } else if (response.role === 'agent') {
        navigate('/investigations');
      } else {
        // Default redirect
        navigate('/');
      }
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setAuthError(error.message || 'Authentication failed');
      toast.error(`Login failed: ${error.message || 'Please check your credentials.'}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      authService.logout();
      setUser(null);
      toast.info('You have been logged out');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if there's an error
      setUser(null);
      localStorage.clear();
      navigate('/login');
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    error: authError,
    isAuthenticated: authService.isAuthenticated,
    hasRole: authService.hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
