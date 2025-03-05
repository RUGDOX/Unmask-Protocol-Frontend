
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import AdminPanel from './pages/AdminPanel';
import ReportingPage from './pages/ReportingPage';
import ProjectRegistrationPage from './pages/ProjectRegistrationPage';
import RugIdSearchPage from './pages/RugIdSearchPage';
import AgentInvestigationPage from './pages/AgentInvestigationPage';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/report" element={<ReportingPage />} />
        <Route path="/register" element={<ProjectRegistrationPage />} />
        <Route path="/verify" element={<RugIdSearchPage />} />
        <Route path="/agent" element={<AgentInvestigationPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
