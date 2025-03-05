
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token');
    const role = localStorage.getItem('user_role');
    const id = localStorage.getItem('user_id');
    
    if (token && role) {
      setUser({
        id,
        role,
      });
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      // In a real app, this would call the login API
      // For now, we'll simulate a response
      
      // Simulated response for demonstration
      const response = {
        token: 'simulated_jwt_token',
        user: {
          id: credentials.username === 'admin' ? '1' : '2',
          role: credentials.username === 'admin' ? 'admin' : 'agent',
        }
      };
      
      // Store auth data
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_role', response.user.role);
      localStorage.setItem('user_id', response.user.id);
      
      setUser(response.user);
      toast.success(`Welcome back, ${credentials.username}!`);
      
      // Redirect based on role
      if (response.user.role === 'admin') {
        navigate('/admin');
      } else if (response.user.role === 'agent') {
        navigate('/agent');
      }
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.info('You have been logged out');
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    logout,
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
