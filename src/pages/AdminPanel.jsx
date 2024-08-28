import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Settings, FileText, Users, Shield, Package, Lock, Database, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// API functions
const handleApiError = (error) => {
  console.error('API Error:', error);
  throw new Error(error.message || 'An error occurred while fetching data');
};

const fetchAlerts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/alerts`);
    if (!response.ok) throw new Error('Failed to fetch alerts');
    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

const restartSystem = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/restart`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to restart system');
    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

const updateConfig = async (config) => {
  try {
    const response = await fetch(`${API_BASE_URL}/update-config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    if (!response.ok) throw new Error('Failed to update configuration');
    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

const generateReport = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-report`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to generate report');
    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

const fetchModules = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/modules`);
    if (!response.ok) throw new Error('Failed to fetch modules');
    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

const toggleModule = async ({ moduleId, enabled }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled }),
    });
    if (!response.ok) throw new Error('Failed to toggle module');
    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

const fetchInvestigations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/investigations`);
    if (!response.ok) throw new Error('Failed to fetch investigations');
    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

const AdminPanel = () => {
  const { toast } = useToast();
  const { data: alerts, isLoading: alertsLoading, error: alertsError } = useQuery({
    queryKey: ['alerts'],
    queryFn: fetchAlerts,
  });

  const { data: users, isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { data: modules, isLoading: modulesLoading, error: modulesError } = useQuery({
    queryKey: ['modules'],
    queryFn: fetchModules,
  });

  const { data: investigations, isLoading: investigationsLoading, error: investigationsError } = useQuery({
    queryKey: ['investigations'],
    queryFn: fetchInvestigations,
  });

  const restartMutation = useMutation({ mutationFn: restartSystem });
  const updateConfigMutation = useMutation({ mutationFn: updateConfig });
  const generateReportMutation = useMutation({ mutationFn: generateReport });
  const createUserMutation = useMutation({ mutationFn: createUser });
  const toggleModuleMutation = useMutation({ mutationFn: toggleModule });

  const [newUser, setNewUser] = React.useState({ username: '', email: '', role: '' });
  const [config, setConfig] = React.useState({
    encryptionKey: '',
    idVerificationService: '',
    blockchainEndpoint: '',
    oasisSapphireEndpoint: '',
  });

  if (alertsLoading || usersLoading || modulesLoading || investigationsLoading) 
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (alertsError || usersError || modulesError || investigationsError) 
    return <div className="flex justify-center items-center h-screen">Error: {alertsError?.message || usersError?.message || modulesError?.message || investigationsError?.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Unmask Protocol Admin Panel</h1>
      
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
                  onClick={() => restartMutation.mutate()} 
                  disabled={restartMutation.isLoading}
                  className="flex items-center justify-center"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {restartMutation.isLoading ? 'Restarting...' : 'Restart System'}
                </Button>
                <Button 
                  onClick={() => generateReportMutation.mutate()} 
                  disabled={generateReportMutation.isLoading}
                  className="flex items-center justify-center"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {generateReportMutation.isLoading ? 'Generating...' : 'Generate Report'}
                </Button>
                <Button className="flex items-center justify-center">
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
                {investigations.map((investigation, index) => (
                  <Alert key={index} variant={investigation.status === 'urgent' ? 'destructive' : 'default'}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Case #{investigation.id}</AlertTitle>
                    <AlertDescription>Status: {investigation.status}</AlertDescription>
                  </Alert>
                ))}
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
                  onClick={() => createUserMutation.mutate(newUser)}
                  disabled={createUserMutation.isLoading}
                  className="w-full"
                >
                  <Users className="mr-2 h-4 w-4" />
                  {createUserMutation.isLoading ? 'Creating...' : 'Create User'}
                </Button>
                <div className="space-y-2">
                  {users.map((user) => (
                    <div key={user.id} className="flex justify-between items-center">
                      <span>{user.username} ({user.role})</span>
                      <Button variant="outline" size="sm">
                        <Shield className="mr-2 h-4 w-4" />
                        Verify
                      </Button>
                    </div>
                  ))}
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
                  onClick={() => updateConfigMutation.mutate(config)}
                  disabled={updateConfigMutation.isLoading}
                  className="w-full"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {updateConfigMutation.isLoading ? 'Updating...' : 'Update Settings'}
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
                {modules.map((module) => (
                  <div key={module.id} className="flex justify-between items-center">
                    <span>{module.name}</span>
                    <Switch
                      checked={module.enabled}
                      onCheckedChange={(enabled) => toggleModuleMutation.mutate({ moduleId: module.id, enabled })}
                    />
                  </div>
                ))}
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataVaultAccess">Data Vault Access Policy</Label>
                  <Textarea
                    id="dataVaultAccess"
                    placeholder="Define access policy for data vaults"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="deadManSwitch" />
                  <Label htmlFor="deadManSwitch">Enable Dead Man's Switch</Label>
                </div>
                <Button className="w-full">
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
                    placeholder="https://mainnet.infura.io/v3/YOUR-PROJECT-ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oasisSapphireNode">Oasis Sapphire Node URL</Label>
                  <Input
                    id="oasisSapphireNode"
                    placeholder="https://sapphire.oasis.io"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smartContractAddress">Smart Contract Address</Label>
                  <Input
                    id="smartContractAddress"
                    placeholder="0x..."
                  />
                </div>
                <Button className="w-full">
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
