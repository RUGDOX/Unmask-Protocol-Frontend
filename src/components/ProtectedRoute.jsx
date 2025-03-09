
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import ApiConnectionError from './ApiConnectionError';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, hasRole, loading, user, error } = useAuth();
  const location = useLocation();
  const [retryCount, setRetryCount] = useState(0);
  const [showError, setShowError] = useState(false);

  // Show connection error after multiple attempts or certain error types
  useEffect(() => {
    if (error && (
      error.includes('Failed to fetch') || 
      error.includes('Network Error') ||
      error.includes('connection')
    )) {
      // Only show error after a few seconds to avoid flash on normal loading
      const timer = setTimeout(() => {
        setShowError(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    setShowError(false);
  }, [error, retryCount]);

  // Check authentication on route access
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated()) {
        toast.error('Authentication required. Please log in.', {
          id: 'auth-required',
        });
      } else if (requiredRole && !hasRole(requiredRole)) {
        toast.error(`You don't have permission to access this area.`, {
          id: 'permission-denied',
        });
      }
    }
  }, [loading, isAuthenticated, hasRole, requiredRole]);

  // Handle retry logic
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setShowError(false);
    window.location.reload();
  };

  // Show loading state if auth is still being determined
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show error state if there was an authentication error
  if (error && showError) {
    return <ApiConnectionError onRetry={handleRetry} error={error} />;
  }

  // Show error UI
  if (error && !showError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <h2 className="font-bold text-lg mb-2">Authentication Error</h2>
          <p>{error}</p>
          <div className="mt-4">
            <button 
              onClick={() => window.location.href = '/login'} 
              className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated()) {
    // Redirect to login and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a specific role is required, check if user has that role
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // If children is a function, call it with the user data
  if (typeof children === 'function') {
    return children({ user });
  }

  // If authenticated and has required role (if any), render the children
  return children;
};

export default ProtectedRoute;
