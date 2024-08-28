import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Settings, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// These functions would call your backend API
const fetchAlerts = async () => {
  const response = await fetch('/api/alerts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const restartSystem = async () => {
  const response = await fetch('/api/restart', { method: 'POST' });
  if (!response.ok) {
    throw new Error('Failed to restart system');
  }
  return response.json();
};

const updateConfig = async () => {
  const response = await fetch('/api/update-config', { method: 'POST' });
  if (!response.ok) {
    throw new Error('Failed to update configuration');
  }
  return response.json();
};

const generateReport = async () => {
  const response = await fetch('/api/generate-report', { method: 'POST' });
  if (!response.ok) {
    throw new Error('Failed to generate report');
  }
  return response.json();
};

const AdminPanel = () => {
  const { data: alerts, isLoading, error } = useQuery({
    queryKey: ['alerts'],
    queryFn: fetchAlerts,
  });

  const restartMutation = useMutation({ mutationFn: restartSystem });
  const updateConfigMutation = useMutation({ mutationFn: updateConfig });
  const generateReportMutation = useMutation({ mutationFn: generateReport });

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      <Tabs defaultValue="controls" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="controls">System Controls</TabsTrigger>
          <TabsTrigger value="alerts">Recent Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="controls">
          <Card>
            <CardHeader>
              <CardTitle>System Controls</CardTitle>
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
                  onClick={() => updateConfigMutation.mutate()} 
                  disabled={updateConfigMutation.isLoading}
                  className="flex items-center justify-center"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {updateConfigMutation.isLoading ? 'Updating...' : 'Update Configuration'}
                </Button>
                <Button 
                  onClick={() => generateReportMutation.mutate()} 
                  disabled={generateReportMutation.isLoading}
                  className="flex items-center justify-center"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {generateReportMutation.isLoading ? 'Generating...' : 'Generate Report'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <Alert key={index} variant={alert.severity}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{alert.title}</AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
