
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { RefreshCw, FileText, Activity } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";

const Dashboard = () => {
  const { toast } = useToast();

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

  return (
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
  );
};

export default Dashboard;
