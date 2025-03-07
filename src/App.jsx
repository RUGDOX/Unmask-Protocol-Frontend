
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Eager load the Index page for faster initial load
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
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <>
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
      <Toaster />
    </>
  );
}

export default App;
