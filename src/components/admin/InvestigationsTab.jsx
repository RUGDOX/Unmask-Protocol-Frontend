
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { AlertCircle } from "lucide-react";

const InvestigationsTab = ({ investigations }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'urgent':
        return 'text-red-500 bg-red-100';
      case 'active':
        return 'text-blue-500 bg-blue-100';
      case 'pending':
        return 'text-amber-500 bg-amber-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
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
                <div className="flex justify-between items-start">
                  <div>
                    <AlertTitle>Case #{investigation.id}</AlertTitle>
                    <AlertDescription>
                      {investigation.title}
                      <div className="mt-1">
                        <Badge className={`${getStatusColor(investigation.status)}`}>
                          {investigation.status}
                        </Badge>
                      </div>
                    </AlertDescription>
                  </div>
                </div>
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
  );
};

export default InvestigationsTab;
