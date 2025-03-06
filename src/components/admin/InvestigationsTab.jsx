
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircle } from "lucide-react";

const InvestigationsTab = ({ investigations }) => {
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
                <AlertTitle>Case #{investigation.id}</AlertTitle>
                <AlertDescription>Status: {investigation.status}</AlertDescription>
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
