
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import AdminPanel from './pages/AdminPanel';
import ReportingPage from './pages/ReportingPage';
import ProjectRegistrationPage from './pages/ProjectRegistrationPage';
import RugIdSearchPage from './pages/RugIdSearchPage';
import AgentInvestigationPage from './pages/AgentInvestigationPage';
import LoginPage from './pages/LoginPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
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
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
