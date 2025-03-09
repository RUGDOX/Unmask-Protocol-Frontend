
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Index from './pages/Index';
import LoginPage from './pages/LoginPage';
import RugIdSearchPage from './pages/RugIdSearchPage';
import ReportingPage from './pages/ReportingPage';
import ProjectRegistrationPage from './pages/ProjectRegistrationPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import AboutPage from './pages/AboutPage';
import ApiKeyRequestPage from './pages/ApiKeyRequestPage';
import ApiInfoPage from './pages/ApiInfoPage';
import AdminPanel from './pages/AdminPanel';
import AgentInvestigationPage from './pages/AgentInvestigationPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Header />
                <Index />
              </>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/rugid" element={
              <>
                <Header />
                <RugIdSearchPage />
              </>
            } />
            <Route path="/report" element={
              <>
                <Header />
                <ReportingPage />
              </>
            } />
            <Route path="/register" element={
              <>
                <Header />
                <ProjectRegistrationPage />
              </>
            } />
            <Route path="/api" element={<ApiKeyRequestPage />} />
            <Route path="/api-info" element={
              <>
                <Header />
                <ApiInfoPage />
              </>
            } />
            <Route path="/unauthorized" element={
              <>
                <Header />
                <UnauthorizedPage />
              </>
            } />
            <Route path="/about" element={
              <>
                <Header />
                <AboutPage />
              </>
            } />
            
            {/* Protected Admin Route */}
            <Route path="/admin/*" element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            } />
            
            {/* Protected Agent Route */}
            <Route path="/investigations/*" element={
              <ProtectedRoute requiredRole="agent">
                <AgentInvestigationPage />
              </ProtectedRoute>
            } />
            
            {/* Default redirect for authenticated users */}
            <Route path="/auth-redirect" element={
              <ProtectedRoute>
                {({ user }) => {
                  if (user?.role === 'admin') return <Navigate to="/admin" replace />;
                  if (user?.role === 'agent') return <Navigate to="/investigations" replace />;
                  return <Navigate to="/" replace />;
                }}
              </ProtectedRoute>
            } />
            
            {/* 404 Route - must be last */}
            <Route path="*" element={
              <>
                <Header />
                <div className="py-20 text-center">
                  <h1 className="text-3xl font-bold">Page Not Found</h1>
                  <p className="mt-4">The page you are looking for does not exist.</p>
                </div>
              </>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
      <Toaster position="top-center" />
    </AuthProvider>
  );
}

export default App;
