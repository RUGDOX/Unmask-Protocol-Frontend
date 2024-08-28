import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Settings, Activity } from "lucide-react";
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Alertopia Control Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">5</p>
            <Button className="mt-4">
              <Bell className="mr-2 h-4 w-4" />
              View Alerts
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-500">Operational</p>
            <Button className="mt-4">
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
            <Button className="w-full mb-2">
              <Settings className="mr-2 h-4 w-4" />
              Configure System
            </Button>
            <Link to="/admin">
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
          <ul className="space-y-2">
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
