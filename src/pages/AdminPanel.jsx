import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertCircle, RefreshCw, Settings, FileText, Users, Shield, Package, Lock, Database, Activity, CheckCircle2, XCircle, BadgeCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../components/ui/use-toast";
import { Link } from 'react-router-dom';
import ReportsList from "../components/ReportsList";

import { alertsService } from '../services/alertsService';
import { usersService } from '../services/usersService';
import { modulesService } from '../services/modulesService';
import { investigationsService } from '../services/investigationsService';
import { systemService } from '../services/systemService';
import { projectsService } from '../services/projectsService';

const AdminPanel = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState([]);
  const [users, setUsers] = useState([]);
  const [modules, setModules] = useState([]);
  const [investigations, setInvestigations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newUser, setNewUser] = useState({ username: '', email: '', role: '' });
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

  const handleCreateUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all user fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const userToAdd = { ...newUser, id: newId };
      
      setUsers([...users, userToAdd]);
      setNewUser({ username: '', email: '', role: '' });
      
      toast({
        title: "User Created",
        description: `User ${newUser.username} has been created successfully.`,
      });
    } catch (err) {
      toast({
        title: "Error Creating User",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleVerifyUser = async (username, id) => {
    try {
      toast({
        title: "User Verification",
        description: `Verifying user: ${username}`,
      });
    } catch (err) {
      toast({
        title: "Error Verifying User",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleRestartSystem = async () => {
    try {
      toast({
        title: "System Restart",
        description: "Initiating system restart...",
      });
      
      setTimeout(() => {
        toast({
          title: "System Restarted",
          description: "System has been restarted successfully.",
        });
      }, 2000);
    } catch (err) {
      toast({
        title: "Error Restarting System",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleGenerateReport = async () => {
    try {
      toast({
        title: "Report Generation",
        description: "Generating system report...",
      });
      
      setTimeout(() => {
        toast({
          title: "Report Generated",
          description: "System report has been generated successfully.",
        });
      }, 1500);
    } catch (err) {
      toast({
        title: "Error Generating Report",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleViewLogs = async () => {
    try {
      toast({
        title: "System Logs",
        description: "Viewing system logs...",
      });
    } catch (err) {
      toast({
        title: "Error Viewing Logs",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleToggleModule = async (moduleId, enabled) => {
    try {
      setModules(modules.map(module => 
        module.id === moduleId ? { ...module, enabled } : module
      ));
      
      const module = modules.find(m => m.id === moduleId);
      toast({
        title: `Module ${enabled ? 'Enabled' : 'Disabled'}`,
        description: `${module.name} has been ${enabled ? 'enabled' : 'disabled'}.`,
      });
    } catch (err) {
      toast({
        title: "Error Updating Module",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleUpdateConfig = async () => {
    try {
      toast({
        title: "Configuration Updated",
        description: "System configuration has been updated successfully.",
      });
    } catch (err) {
      toast({
        title: "Error Updating Configuration",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleSecuritySettings = async () => {
    try {
      toast({
        title: "Security Settings Updated",
        description: "The security settings have been updated successfully.",
      });
    } catch (err) {
      toast({
        title: "Error Updating Security Settings",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleSyncBlockchain = async () => {
    try {
      toast({
        title: "Blockchain Sync Initiated",
        description: "Syncing blockchain data. This may take a few minutes.",
      });
      
      setTimeout(() => {
        toast({
          title: "Blockchain Sync Complete",
          description: "Blockchain data has been synchronized successfully.",
        });
      }, 3000);
    } catch (err) {
      toast({
        title: "Error Syncing Blockchain",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleInvestigationCreated = () => {
    toast({
      title: "Investigation Created",
      description: "A new investigation has been added to the system.",
    });
  };

  const handleVerifyProject = async (projectId) => {
    try {
      // In a real implementation, this would call the API
      // await projectsService.updateProjectStatus(projectId, 'verified');
      
      setProjects(projects.map(project => 
        project.id === projectId ? { ...project, status: 'verified' } : project
      ));
      
      toast({
        title: "Project Verified",
        description: `Project with ID ${projectId} has been verified and RugID issued.`,
      });
    } catch (err) {
      toast({
        title: "Error Verifying Project",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleRejectProject = async (projectId) => {
    try {
      // In a real implementation, this would call the API
      // await projectsService.updateProjectStatus(projectId, 'rejected');
      
      setProjects(projects.map(project => 
        project.id === projectId ? { ...project, status: 'rejected' } : project
      ));
      
      toast({
        title: "Project Rejected",
        description: `Project with ID ${projectId} has been rejected.`,
      });
    } catch (err) {
      toast({
        title: "Error Rejecting Project",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Unmask Protocol Admin Panel</h1>
        <Link to="/">
          <Button variant="outline">
            Return to Dashboard
          </Button>
        </Link>
      </div>
      
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
          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={handleRestartSystem}
                  className="flex items-center justify-center"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Restart System
                </Button>
                <Button 
                  onClick={handleGenerateReport}
                  className="flex items-center justify-center"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button 
                  onClick={handleViewLogs}
                  className="flex items-center justify-center"
                >
                  <Activity className="mr-2 h-4 w-4" />
                  View System Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Scam Reports</CardTitle>
              <CardDescription>
                Review and process incoming scam reports from the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportsList onInvestigationCreated={handleInvestigationCreated} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investigations">
          <Card>
            <CardHeader>
              <CardTitle>Active Investigations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investigations && investigations.length > 0 ? (
                  investigations.map((investigation, index) => (
                    <Alert key={index} variant={investigation.status === 'urgent' ? 'destructive' : 'default'}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Case #{investigation.id}</AlertTitle>
                      <AlertDescription>Status: {investigation.status}</AlertDescription>
                    </Alert>
                  ))
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Active Investigations</AlertTitle>
                    <AlertDescription>There are currently no ongoing investigations.</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-primary" />
                RugID Project Management
              </CardTitle>
              <CardDescription>
                Review and manage project registrations for RugID verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">Project Registrations</h3>
                    <p className="text-sm text-muted-foreground">Verify project owner identities and issue RugIDs</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setProjects([...projects])}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
                
                {projects && projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-lg">{project.name}</h4>
                            <p className="text-sm">RugID: {project.id}</p>
                          </div>
                          <div className="flex items-center">
                            {project.status === 'verified' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Verified
                              </span>
                            ) : project.status === 'rejected' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <XCircle className="mr-1 h-3 w-3" />
                                Rejected
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <AlertCircle className="mr-1 h-3 w-3" />
                                Pending
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Owner:</p>
                            <p className="text-sm">{project.owner}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Registered:</p>
                            <p className="text-sm">{project.dateRegistered}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Website:</p>
                            <p className="text-sm">
                              <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {project.website}
                              </a>
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Wallet:</p>
                            <p className="text-sm font-mono">{project.wallet}</p>
                          </div>
                        </div>
                        
                        {project.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleVerifyProject(project.id)} 
                              className="flex-1"
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Approve & Issue RugID
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => handleRejectProject(project.id)}
                              className="flex-1"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Project Registrations</AlertTitle>
                    <AlertDescription>There are currently no project registrations to review.</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  />
                  <Input
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                  <Input
                    placeholder="Role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  />
                </div>
                <Button
                  onClick={handleCreateUser}
                  className="w-full"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Create User
                </Button>
                <div className="space-y-2">
                  {users && users.length > 0 ? (
                    users.map((user) => (
                      <div key={user.id} className="flex justify-between items-center border p-3 rounded">
                        <div>
                          <div className="font-semibold">{user.username}</div>
                          <div className="text-sm text-gray-500">{user.email} - {user.role}</div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleVerifyUser(user.username, user.id)}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Verify
                        </Button>
                      </div>
                    ))
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>No Users Found</AlertTitle>
                      <AlertDescription>There are currently no users in the system.</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="encryptionKey">Encryption Key</Label>
                    <Input
                      id="encryptionKey"
                      value={config.encryptionKey}
                      onChange={(e) => setConfig({ ...config, encryptionKey: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idVerificationService">ID Verification Service</Label>
                    <Input
                      id="idVerificationService"
                      value={config.idVerificationService}
                      onChange={(e) => setConfig({ ...config, idVerificationService: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blockchainEndpoint">Ethereum Blockchain Endpoint</Label>
                  <Input
                    id="blockchainEndpoint"
                    value={config.blockchainEndpoint}
                    onChange={(e) => setConfig({ ...config, blockchainEndpoint: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oasisSapphireEndpoint">Oasis Sapphire Endpoint</Label>
                  <Input
                    id="oasisSapphireEndpoint"
                    value={config.oasisSapphireEndpoint}
                    onChange={(e) => setConfig({ ...config, oasisSapphireEndpoint: e.target.value })}
                  />
                </div>
                <Button
                  onClick={handleUpdateConfig}
                  className="w-full"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Update Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules">
          <Card>
            <CardHeader>
              <CardTitle>Module Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modules && modules.length > 0 ? (
                  modules.map((module) => (
                    <div key={module.id} className="flex justify-between items-center border p-3 rounded">
                      <span>{module.name}</span>
                      <Switch
                        checked={module.enabled}
                        onCheckedChange={(enabled) => handleToggleModule(module.id, enabled)}
                      />
                    </div>
                  ))
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Modules Found</AlertTitle>
                    <AlertDescription>There are currently no modules available.</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="encryptionAlgorithm">Encryption Algorithm</Label>
                  <Input
                    id="encryptionAlgorithm"
                    placeholder="e.g., AES-256"
                    defaultValue="AES-256-GCM"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataVaultAccess">Data Vault Access Policy</Label>
                  <Textarea
                    id="dataVaultAccess"
                    placeholder="Define access policy for data vaults"
                    defaultValue="Only admin users can access level 3 data. Investigators can access level 1-2 data with proper authorization."
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="deadManSwitch" defaultChecked={true} />
                  <Label htmlFor="deadManSwitch">Enable Dead Man's Switch</Label>
                </div>
                <Button 
                  className="w-full"
                  onClick={handleSecuritySettings}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Update Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ethereumNode">Ethereum Node URL</Label>
                  <Input
                    id="ethereumNode"
                    defaultValue="https://mainnet.infura.io/v3/your-project-id"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oasisSapphireNode">Oasis Sapphire Node URL</Label>
                  <Input
                    id="oasisSapphireNode"
                    defaultValue="https://sapphire.oasis.io"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smartContractAddress">Smart Contract Address</Label>
                  <Input
                    id="smartContractAddress"
                    defaultValue="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
                  />
                </div>
                <Button 
                  className="w-full"
                  onClick={handleSyncBlockchain}
                >
                  <Database className="mr-2 h-4 w-4" />
                  Sync Blockchain Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
