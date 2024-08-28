import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Settings, Activity, AlertCircle } from "lucide-react";
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [alertCount, setAlertCount] = useState(5);
  const [systemStatus, setSystemStatus] = useState('Operational');

  const handleViewAlerts = () => {
    alert(`Viewing ${alertCount} active alerts`);
  };

  const handleConfigureSystem = () => {
    setSystemStatus('Configuring...');
    setTimeout(() => setSystemStatus('Operational'), 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Alertopia Control Center</h1>
      
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
            <Button className="mt-4 bg-green-500 hover:bg-green-600">
              <Activity className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </CardContent>
        </Card>
        
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
              <Button className="w-full" variant="outline">
                Go to Admin Panel
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>New Alert Detected</AlertTitle>
            <AlertDescription>
              A new alert has been detected in the system. Please review and take necessary action.
            </AlertDescription>
          </Alert>
          <ul className="space-y-2 mt-4">
            <li>System update completed - 2 hours ago</li>
            <li>New alert detected - 5 hours ago</li>
            <li>Configuration changed - 1 day ago</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
