
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Index from './pages/Index';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import UnauthorizedPage from './pages/UnauthorizedPage';

// Lazy load non-critical pages to improve initial load performance
const RugIdSearchPage = lazy(() => import('./pages/RugIdSearchPage'));
const ReportingPage = lazy(() => import('./pages/ReportingPage'));
const ProjectRegistrationPage = lazy(() => import('./pages/ProjectRegistrationPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ApiKeyRequestPage = lazy(() => import('./pages/ApiKeyRequestPage'));
const ApiInfoPage = lazy(() => import('./pages/ApiInfoPage'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const AgentInvestigationPage = lazy(() => import('./pages/AgentInvestigationPage'));
const TrustAgreementPage = lazy(() => import('./pages/TrustAgreementPage'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Error boundary for route loading failures
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <button 
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
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
                  <Suspense fallback={<LoadingFallback />}>
                    <RugIdSearchPage />
                  </Suspense>
                </>
              } />
              
              <Route path="/report" element={
                <>
                  <Header />
                  <Suspense fallback={<LoadingFallback />}>
                    <ReportingPage />
                  </Suspense>
                </>
              } />
              
              <Route path="/register" element={
                <>
                  <Header />
                  <Suspense fallback={<LoadingFallback />}>
                    <ProjectRegistrationPage />
                  </Suspense>
                </>
              } />
              
              <Route path="/api" element={
                <Suspense fallback={<LoadingFallback />}>
                  <ApiKeyRequestPage />
                </Suspense>
              } />
              
              <Route path="/api-info" element={
                <>
                  <Header />
                  <Suspense fallback={<LoadingFallback />}>
                    <ApiInfoPage />
                  </Suspense>
                </>
              } />
              
              <Route path="/trust-agreement" element={
                <Suspense fallback={<LoadingFallback />}>
                  <TrustAgreementPage />
                </Suspense>
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
                  <Suspense fallback={<LoadingFallback />}>
                    <AboutPage />
                  </Suspense>
                </>
              } />
              
              {/* Protected Admin Route */}
              <Route path="/admin/*" element={
                <ProtectedRoute requiredRole="admin">
                  <Suspense fallback={<LoadingFallback />}>
                    <AdminPanel />
                  </Suspense>
                </ProtectedRoute>
              } />
              
              {/* Protected Agent Route */}
              <Route path="/investigations/*" element={
                <ProtectedRoute requiredRole="agent">
                  <Suspense fallback={<LoadingFallback />}>
                    <AgentInvestigationPage />
                  </Suspense>
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
    </ErrorBoundary>
  );
}

export default App;
