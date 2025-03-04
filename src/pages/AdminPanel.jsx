
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertCircle, RefreshCw, Settings, FileText, Users, Shield, Package, Lock, Database, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../components/ui/use-toast";
import { Link } from 'react-router-dom';

// Mock data for development
const mockAlerts = [
  { id: 1, title: 'Security Breach Attempt', status: 'urgent' },
  { id: 2, title: 'System Update Required', status: 'normal' },
  { id: 3, title: 'Unusual Login Pattern', status: 'warning' }
];

const mockUsers = [
  { id: 1, username: 'admin', email: 'admin@unmask.io', role: 'Administrator' },
  { id: 2, username: 'investigator1', email: 'inv1@unmask.io', role: 'Investigator' },
  { id: 3, username: 'analyst', email: 'analyst@unmask.io', role: 'Data Analyst' }
];

const mockModules = [
  { id: 1, name: 'ID Verification Engine', enabled: true },
  { id: 2, name: 'Blockchain Connector', enabled: true },
  { id: 3, name: 'Investigation Toolkit', enabled: false },
  { id: 4, name: 'Data Encryption Service', enabled: true }
];

const mockInvestigations = [
  { id: 'INV-2023-001', title: 'Cross-Chain Fund Tracing', status: 'active' },
  { id: 'INV-2023-002', title: 'Identity Verification Review', status: 'urgent' },
  { id: 'INV-2023-003', title: 'Compliance Check', status: 'pending' }
];

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
    encryptionKey: 'aes-256-gcm-standard',
    idVerificationService: 'https://verify.unmask.io',
    blockchainEndpoint: 'https://eth.unmask.io',
    oasisSapphireEndpoint: 'https://sapphire.unmask.io',
  });

  // Load mock data on component mount
  useEffect(() => {
    const loadMockData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setAlerts(mockAlerts);
        setUsers(mockUsers);
        setModules(mockModules);
        setInvestigations(mockInvestigations);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    loadMockData();
  }, []);

  // User management functions
  const handleCreateUser = () => {
    if (!newUser.username || !newUser.email || !newUser.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all user fields",
        variant: "destructive"
      });
      return;
    }

    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const userToAdd = { ...newUser, id: newId };
    
    setUsers([...users, userToAdd]);
    setNewUser({ username: '', email: '', role: '' });
    
    toast({
      title: "User Created",
      description: `User ${newUser.username} has been created successfully.`,
    });
  };

  const handleVerifyUser = (username) => {
    toast({
      title: "User Verification",
      description: `Verifying user: ${username}`,
    });
  };

  // System management functions
  const handleRestartSystem = () => {
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
  };

  const handleGenerateReport = () => {
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
  };

  const handleViewLogs = () => {
    toast({
      title: "System Logs",
      description: "Viewing system logs...",
    });
  };

  // Module management functions
  const handleToggleModule = (moduleId, enabled) => {
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, enabled } : module
    ));
    
    const module = modules.find(m => m.id === moduleId);
    toast({
      title: `Module ${enabled ? 'Enabled' : 'Disabled'}`,
      description: `${module.name} has been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  // Settings functions
  const handleUpdateConfig = () => {
    toast({
      title: "Configuration Updated",
      description: "System configuration has been updated successfully.",
    });
  };

  // Security functions
  const handleSecuritySettings = () => {
    toast({
      title: "Security Settings Updated",
      description: "The security settings have been updated successfully.",
    });
  };

  // Blockchain functions
  const handleSyncBlockchain = () => {
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
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="investigations">Investigations</TabsTrigger>
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
                          onClick={() => handleVerifyUser(user.username)}
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
