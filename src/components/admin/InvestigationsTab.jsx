
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { AlertCircle } from "lucide-react";
import { investigationsService } from "../../services/investigationsService";
import { toast } from "sonner";

const InvestigationsTab = ({ investigations: propInvestigations }) => {
  const [investigations, setInvestigations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestigations = async () => {
      try {
        setLoading(true);
        const data = await investigationsService.getInvestigations();
        setInvestigations(data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch investigations:", err);
        setError("Failed to load investigations. Please try again.");
        // Fallback to prop data if API fails
        if (propInvestigations && propInvestigations.length > 0) {
          setInvestigations(propInvestigations);
        }
        toast.error("Failed to load investigations from the server");
      } finally {
        setLoading(false);
      }
    };
    
    fetchInvestigations();
  }, [propInvestigations]);

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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Investigations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-8">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-r-transparent animate-spin"></div>
            <p className="ml-3">Loading investigations...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && !investigations.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Investigations</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

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
