import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Settings, Activity, AlertCircle, Shield, Users, FileText, Database, Lock } from "lucide-react";
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const [alertCount, setAlertCount] = useState(5);
  const [systemStatus, setSystemStatus] = useState('Operational');
  const [investigationCount, setInvestigationCount] = useState(3);
  const [systemLoad, setSystemLoad] = useState(65);

  const handleViewAlerts = () => {
    alert(`Viewing ${alertCount} active alerts`);
  };

  const handleConfigureSystem = () => {
    setSystemStatus('Configuring...');
    setTimeout(() => setSystemStatus('Operational'), 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Unmask Protocol Control Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-red-500">{alertCount}</p>
            <Button className="mt-4 bg-red-500 hover:bg-red-600" onClick={handleViewAlerts}>
              <Bell className="mr-2 h-4 w-4" />
              View Alerts
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-green-500" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-500">{systemStatus}</p>
            <Progress value={systemLoad} className="mt-2" />
            <p className="text-sm text-gray-500 mt-1">System Load: {systemLoad}%</p>
            <Button className="mt-4 bg-green-500 hover:bg-green-600">
              <Activity className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-blue-500" />
              Active Investigations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-500">{investigationCount}</p>
            <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
              <FileText className="mr-2 h-4 w-4" />
              View Investigations
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full mb-2" onClick={handleConfigureSystem}>
              <Settings className="mr-2 h-4 w-4" />
              Configure System
            </Button>
            <Link to="/admin" className="w-full">
              <Button className="w-full mb-2" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                User Management
              </Button>
            </Link>
            <Button className="w-full mb-2" variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Security Settings
            </Button>
            <Button className="w-full mb-2" variant="outline">
              <Database className="mr-2 h-4 w-4" />
              Data Vault Access
            </Button>
            <Button className="w-full" variant="outline">
              <Lock className="mr-2 h-4 w-4" />
              Encryption Management
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>New Investigation Opened</AlertTitle>
              <AlertDescription>
                A new investigation has been initiated. Please review and assign resources.
              </AlertDescription>
            </Alert>
            <ul className="space-y-2 mt-4">
              <li>New investigation opened - 1 hour ago</li>
              <li>System update completed - 3 hours ago</li>
              <li>New alert detected - 5 hours ago</li>
              <li>User verification completed - 1 day ago</li>
              <li>Blockchain sync completed - 1 day ago</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
