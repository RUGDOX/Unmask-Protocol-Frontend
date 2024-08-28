import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button onClick={() => restartMutation.mutate()} disabled={restartMutation.isLoading}>
                {restartMutation.isLoading ? 'Restarting...' : 'Restart System'}
              </Button>
              <Button onClick={() => updateConfigMutation.mutate()} disabled={updateConfigMutation.isLoading}>
                {updateConfigMutation.isLoading ? 'Updating...' : 'Update Configuration'}
              </Button>
              <Button onClick={() => generateReportMutation.mutate()} disabled={generateReportMutation.isLoading}>
                {generateReportMutation.isLoading ? 'Generating...' : 'Generate Report'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {alerts.map((alert, index) => (
                <li key={index} className={`flex items-center text-${alert.severity}-600`}>
                  <AlertCircle className="mr-2" />
                  <span>{alert.message}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
