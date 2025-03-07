
import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex-grow">
          <Header />
          <main className="py-6">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/rugid" element={<RugIdSearchPage />} />
              <Route path="/report" element={<ReportingPage />} />
              <Route path="/register" element={<ProjectRegistrationPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="*" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Page Not Found</h1><p className="mt-4">The page you are looking for does not exist.</p></div>} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
      <Toaster position="top-center" />
    </AuthProvider>
  );
}

export default App;
