
import React, { useState } from 'react';
import { toast } from "sonner";
import { Search, Shield, AlertCircle, Check, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { rugidPublicService } from '../services/rugidPublicService';

const RugIdSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm || !searchTerm.startsWith('RID-')) {
      toast.error("Please enter a valid RugID (format: RID-XX00XX00XX00)");
      return;
    }
    
    setIsSearching(true);
    setErrorMessage("");
    
    try {
      // In a real implementation, this would call the API
      // const result = await rugidPublicService.searchRugId(searchTerm);
      
      // Mock data for demonstration
      setTimeout(() => {
        // Simulation of different possible statuses
        let mockResult;
        if (searchTerm === 'RID-XX00XX00XX00') {
          mockResult = {
            rugId: searchTerm,
            status: 'verified',
            projectName: 'Example Project',
            lastVerified: '2023-05-15',
            statusHistory: [
              { date: '2023-04-01', status: 'registered' },
              { date: '2023-05-15', status: 'verified' }
            ]
          };
        } else if (searchTerm === 'RID-AA11BB22CC33') {
          mockResult = {
            rugId: searchTerm,
            status: 'under_investigation',
            projectName: 'Test Project',
            lastVerified: null,
            statusHistory: [
              { date: '2023-03-10', status: 'registered' },
              { date: '2023-06-20', status: 'under_investigation' }
            ]
          };
        } else if (searchTerm === 'RID-DD44EE55FF66') {
          mockResult = {
            rugId: searchTerm,
            status: 'blacklisted',
            projectName: 'Scam Project',
            lastVerified: '2023-07-01',
            statusHistory: [
              { date: '2023-02-15', status: 'registered' },
              { date: '2023-06-10', status: 'under_investigation' },
              { date: '2023-07-01', status: 'blacklisted' }
            ]
          };
        } else {
          setErrorMessage("No RugID found with the provided identifier");
          setSearchResult(null);
          setIsSearching(false);
          return;
        }
        
        setSearchResult(mockResult);
        setIsSearching(false);
      }, 1500);
    } catch (error) {
      console.error("Error searching RugID:", error);
      setErrorMessage("An error occurred while searching. Please try again later.");
      setIsSearching(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'registered':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'under_investigation':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'blacklisted':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'verified':
        return "bg-green-100 text-green-800 border-green-200";
      case 'registered':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'under_investigation':
        return "bg-amber-100 text-amber-800 border-amber-200";
      case 'blacklisted':
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'verified':
        return "Verified";
      case 'registered':
        return "Registered";
      case 'under_investigation':
        return "Under Investigation";
      case 'blacklisted':
        return "Blacklisted";
      default:
        return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Unmask Protocol RugID Verification</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Verify the status of any Web3 project or entity by searching their RugID.
          RugIDs help protect communities while preserving privacy for honest builders.
        </p>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            RugID Search
          </CardTitle>
          <CardDescription>
            Enter a valid RugID to check its verification status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter RugID (e.g., RID-XX00XX00XX00)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button type="submit" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
            
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </form>
          
          {searchResult && (
            <div className="mt-6 space-y-4 border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{searchResult.projectName}</h3>
                  <p className="text-sm text-muted-foreground">RugID: {searchResult.rugId}</p>
                </div>
                <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(searchResult.status)}`}>
                  {getStatusIcon(searchResult.status)}
                  <span className="ml-1">{formatStatus(searchResult.status)}</span>
                </div>
              </div>
              
              {searchResult.lastVerified && (
                <p className="text-sm">
                  Last verified: {searchResult.lastVerified}
                </p>
              )}
              
              {searchResult.statusHistory && searchResult.statusHistory.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Status History:</h4>
                  <div className="space-y-2">
                    {searchResult.statusHistory.map((item, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-24 text-muted-foreground">{item.date}</div>
                        <div className="flex items-center">
                          {getStatusIcon(item.status)}
                          <span className="ml-1">{formatStatus(item.status)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/50 text-sm text-muted-foreground">
          <div className="flex items-center">
            <AlertCircle className="mr-2 h-4 w-4" />
            <p>RugID statuses are verified by Unmask Protocol's investigation team. No personal information is displayed.</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RugIdSearchPage;
