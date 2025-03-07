
import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Import the Index page
import Index from './pages/Index';

// Lazy load other pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const UnauthorizedPage = lazy(() => import('./pages/UnauthorizedPage'));
const ReportingPage = lazy(() => import('./pages/ReportingPage'));
const ProjectRegistrationPage = lazy(() => import('./pages/ProjectRegistrationPage'));
const RugIdSearchPage = lazy(() => import('./pages/RugIdSearchPage'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const AgentInvestigationPage = lazy(() => import('./pages/AgentInvestigationPage'));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    <span className="ml-3 text-blue-400">Loading...</span>
  </div>
);

function App({ onLoad }) {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
    
    // Call onLoad callback when component is mounted
    if (typeof onLoad === 'function') {
      onLoad();
    }
  }, [onLoad]);
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/report" element={<ReportingPage />} />
            <Route path="/register" element={<ProjectRegistrationPage />} />
            <Route path="/verify" element={<RugIdSearchPage />} />
            
            {/* Protected Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            } />
            
            <Route path="/agent" element={
              <ProtectedRoute requiredRole="agent">
                <AgentInvestigationPage />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </AuthProvider>
      <Toaster position="top-center" />
    </ErrorBoundary>
  );
}

export default App;
