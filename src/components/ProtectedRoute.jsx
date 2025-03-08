
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, hasRole, loading, user } = useAuth();
  const location = useLocation();

  // Check authentication on route access
  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      toast.error('Authentication required. Please log in.', {
        id: 'auth-required',
      });
    } else if (!loading && requiredRole && !hasRole(requiredRole)) {
      toast.error(`You don't have permission to access this area.`, {
        id: 'permission-denied',
      });
    }
  }, [loading, isAuthenticated, hasRole, requiredRole]);

  // Show loading state if auth is still being determined
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
