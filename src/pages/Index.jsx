import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Bell, Settings, Activity, AlertCircle, Shield, Users, FileText, Database, Lock } from "lucide-react";
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Progress } from "../components/ui/progress";
import { useToast } from "../components/ui/use-toast";

import { alertsService } from '../services/alertsService';
import { investigationsService } from '../services/investigationsService';
import { systemService } from '../services/systemService';

const Index = () => {
  const { toast } = useToast();
  const [alertCount, setAlertCount] = useState(0);
  const [systemStatus, setSystemStatus] = useState('Loading...');
  const [investigationCount, setInvestigationCount] = useState(0);
  const [systemLoad, setSystemLoad] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        setTimeout(async () => {
          try {
            const alerts = [
              { id: 1, title: 'Security Breach Attempt', status: 'urgent' },
              { id: 2, title: 'System Update Required', status: 'normal' },
              { id: 3, title: 'Unusual Login Pattern', status: 'warning' },
              { id: 4, title: 'Failed Login Attempts', status: 'urgent' },
              { id: 5, title: 'Database Connection Issue', status: 'warning' }
            ];
            
            const investigations = [
              { id: 'INV-2023-001', title: 'Cross-Chain Fund Tracing', status: 'active' },
              { id: 'INV-2023-002', title: 'Identity Verification Review', status: 'urgent' },
              { id: 'INV-2023-003', title: 'Compliance Check', status: 'pending' }
            ];
            
            const activities = [
              { id: 1, text: 'New investigation opened', timestamp: '1 hour ago' },
              { id: 2, text: 'System update completed', timestamp: '3 hours ago' },
              { id: 3, text: 'New alert detected', timestamp: '5 hours ago' },
              { id: 4, text: 'User verification completed', timestamp: '1 day ago' },
              { id: 5, text: 'Blockchain sync completed', timestamp: '1 day ago' }
            ];
            
            setAlertCount(alerts.length);
            setInvestigationCount(investigations.length);
            setSystemStatus('Operational');
            setSystemLoad(65);
            setRecentActivity(activities);
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

  const handleViewAlerts = async () => {
    try {
      toast({
        title: "Viewing Alerts",
        description: `There are ${alertCount} active alerts.`,
      });
    } catch (err) {
      toast({
        title: "Error Viewing Alerts",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleConfigureSystem = async () => {
    try {
      setSystemStatus('Configuring...');
      
      toast({
        title: "System Configuration",
        description: "System configuration process started.",
      });
      
      setTimeout(() => {
        setSystemStatus('Operational');
        toast({
          title: "Configuration Complete",
          description: "System configuration process completed successfully.",
        });
      }, 2000);
    } catch (err) {
      setSystemStatus('Error');
      toast({
        title: "Error Configuring System",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleViewDetails = async () => {
    try {
      toast({
        title: "System Details",
        description: `Current system load: ${systemLoad}%`,
      });
    } catch (err) {
      toast({
        title: "Error Viewing System Details",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleViewInvestigations = async () => {
    try {
      toast({
        title: "Active Investigations",
        description: `There are ${investigationCount} ongoing investigations.`,
      });
    } catch (err) {
      toast({
        title: "Error Viewing Investigations",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleSecuritySettings = () => {
    toast({
      title: "Security Settings",
      description: "Opening security settings panel...",
    });
  };

  const handleDataVaultAccess = () => {
    toast({
      title: "Data Vault Access",
      description: "Accessing data vault. Please wait...",
    });
  };

  const handleEncryptionManagement = () => {
    toast({
      title: "Encryption Management",
      description: "Opening encryption management interface...",
    });
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

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
            <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white" onClick={handleViewAlerts}>
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
            <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white" onClick={handleViewDetails}>
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
            <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white" onClick={handleViewInvestigations}>
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
            <Button className="w-full mb-2 bg-primary text-white" onClick={handleConfigureSystem}>
              <Settings className="mr-2 h-4 w-4" />
              Configure System
            </Button>
            <Link to="/admin" className="w-full">
              <Button className="w-full mb-2 bg-secondary text-white" variant="secondary">
                <Users className="mr-2 h-4 w-4" />
                User Management
              </Button>
            </Link>
            <Button className="w-full mb-2 bg-secondary text-white" variant="secondary" onClick={handleSecuritySettings}>
              <Shield className="mr-2 h-4 w-4" />
              Security Settings
            </Button>
            <Button className="w-full mb-2 bg-secondary text-white" variant="secondary" onClick={handleDataVaultAccess}>
              <Database className="mr-2 h-4 w-4" />
              Data Vault Access
            </Button>
            <Button className="w-full bg-secondary text-white" variant="secondary" onClick={handleEncryptionManagement}>
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
              {recentActivity.map((activity) => (
                <li key={activity.id}>{activity.text} - {activity.timestamp}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
