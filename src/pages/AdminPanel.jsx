import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const AdminPanel = () => {
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
              <Button>Restart System</Button>
              <Button>Update Configuration</Button>
              <Button>Generate Report</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center text-yellow-600">
                <AlertCircle className="mr-2" />
                <span>Low disk space warning</span>
              </li>
              <li className="flex items-center text-red-600">
                <AlertCircle className="mr-2" />
                <span>Failed login attempt</span>
              </li>
              <li className="flex items-center text-green-600">
                <AlertCircle className="mr-2" />
                <span>System update completed</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;