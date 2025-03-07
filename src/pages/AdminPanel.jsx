import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import ReportsList from "../components/ReportsList";

// Import admin components
import Dashboard from "../components/admin/Dashboard";
import InvestigationsTab from "../components/admin/InvestigationsTab";
import ProjectsTab from "../components/admin/ProjectsTab";
import UsersTab from "../components/admin/UsersTab";
import SettingsTab from "../components/admin/SettingsTab";
import ModulesTab from "../components/admin/ModulesTab";
import SecurityTab from "../components/admin/SecurityTab";
import BlockchainTab from "../components/admin/BlockchainTab";
import AdminHeader from "../components/admin/AdminHeader";

const AdminPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [users, setUsers] = useState([]);
  const [modules, setModules] = useState([]);
  const [investigations, setInvestigations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState({
    encryptionKey: '',
    idVerificationService: '',
    blockchainEndpoint: '',
    oasisSapphireEndpoint: '',
  });
  const [projects, setProjects] = useState([]);
  const [reportsTabRefreshTrigger, setReportsTabRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        setTimeout(async () => {
          try {
            const alertsData = [
              { id: 1, title: 'Security Breach Attempt', status: 'urgent' },
              { id: 2, title: 'System Update Required', status: 'normal' },
              { id: 3, title: 'Unusual Login Pattern', status: 'warning' }
            ];
            
            const usersData = [
              { id: 1, username: 'admin', email: 'admin@unmask.io', role: 'Administrator' },
              { id: 2, username: 'investigator1', email: 'inv1@unmask.io', role: 'Investigator' },
              { id: 3, username: 'analyst', email: 'analyst@unmask.io', role: 'Data Analyst' }
            ];
            
            const modulesData = [
              { id: 1, name: 'ID Verification Engine', enabled: true },
              { id: 2, name: 'Blockchain Connector', enabled: true },
              { id: 3, name: 'Investigation Toolkit', enabled: false },
              { id: 4, name: 'Data Encryption Service', enabled: true }
            ];
            
            const investigationsData = [
              { id: 'INV-2023-001', title: 'Cross-Chain Fund Tracing', status: 'active' },
              { id: 'INV-2023-002', title: 'Identity Verification Review', status: 'urgent' },
              { id: 'INV-2023-003', title: 'Compliance Check', status: 'pending' }
            ];
            
            const configData = {
              encryptionKey: 'aes-256-gcm-standard',
              idVerificationService: 'https://verify.unmask.io',
              blockchainEndpoint: 'https://eth.unmask.io',
              oasisSapphireEndpoint: 'https://sapphire.unmask.io',
            };
            
            setAlerts(alertsData);
            setUsers(usersData);
            setModules(modulesData);
            setInvestigations(investigationsData);
            setConfig(configData);
            
            const projectsData = [
              { 
                id: 'RUG-2023-001', 
                name: 'DefiSwap Protocol', 
                owner: 'John Smith', 
                status: 'verified',
                dateRegistered: '2023-06-15',
                wallet: '0x1a2b3c...',
                website: 'https://defiswap.io'
              },
              { 
                id: 'RUG-2023-002', 
                name: 'MetaVerse Explorers', 
                owner: 'Jane Doe', 
                status: 'pending',
                dateRegistered: '2023-07-22',
                wallet: '0x4d5e6f...',
                website: 'https://metaverse-explorers.com'
              },
              { 
                id: 'RUG-2023-003', 
                name: 'Crypto Gaming Guild', 
                owner: 'Robert Johnson', 
                status: 'rejected',
                dateRegistered: '2023-08-05',
                wallet: '0x7g8h9i...',
                website: 'https://cryptogaming.io'
              },
            ];
            
            setProjects(projectsData);
            
            setLoading(false);
          } catch (err) {
            console.error('Failed to load data:', err);
            setError('Failed to load data: ' + err.message);
            setLoading(false);
          }
        }, 500);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInvestigationCreated = () => {
    const toast = (title, description) => console.log({ title, description });
    toast({
      title: "Investigation Created",
      description: "A new investigation has been added to the system.",
    });
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <AdminHeader alerts={alerts} />
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="investigations">Investigations</TabsTrigger>
          <TabsTrigger value="projects">RugID Projects</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="modules">Module Management</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsList onInvestigationCreated={handleInvestigationCreated} />
        </TabsContent>

        <TabsContent value="investigations">
          <InvestigationsTab investigations={investigations} />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectsTab projects={projects} setProjects={setProjects} />
        </TabsContent>

        <TabsContent value="users">
          <UsersTab users={users} setUsers={setUsers} />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab config={config} setConfig={setConfig} />
        </TabsContent>

        <TabsContent value="modules">
          <ModulesTab modules={modules} setModules={setModules} />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="blockchain">
          <BlockchainTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
