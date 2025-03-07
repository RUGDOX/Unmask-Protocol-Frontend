import React, { useState } from 'react';
import { toast } from "sonner";
import { Search, Shield, AlertCircle, Check, AlertTriangle, XCircle, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { ThemeToggle } from '../components/ThemeToggle';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-black relative">
      {/* Tech particle background */}
      <div className="particle-container absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="tech-particles"></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-indigo-950/30 to-purple-950/40 pointer-events-none z-0"></div>
      
      <header className="relative z-10 border-b border-blue-500/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-bold text-gradient">RugID Verification</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-blue-100 hover:bg-blue-900/30 border border-blue-500/20">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container relative z-10 mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-gradient glow-effect">
            RugID Verification
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Verify the status of any Web3 project or entity by searching their RugID.
            RugIDs help protect communities while preserving privacy for honest builders.
          </p>
        </div>
        
        <Card className="max-w-2xl mx-auto bg-gray-900/80 backdrop-blur-sm border border-blue-500/20 shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-blue-400" />
              RugID Search
            </CardTitle>
            <CardDescription className="text-gray-300">
              Enter a valid RugID to check its verification status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Enter RugID (e.g., RID-XX00XX00XX00)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 bg-gray-800 border-blue-500/20 text-white"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSearching}
                  className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 shadow-blue-500/20 shadow-sm"
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
              
              {errorMessage && (
                <Alert variant="destructive" className="bg-red-900/60 border-red-500/30 text-red-100">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
            </form>
            
            {searchResult && (
              <div className="mt-6 space-y-4 border rounded-md p-4 border-blue-500/20 bg-gray-800/60 backdrop-blur-sm animate-fade-in">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{searchResult.projectName}</h3>
                    <p className="text-sm text-blue-300">RugID: {searchResult.rugId}</p>
                  </div>
                  <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(searchResult.status)}`}>
                    {getStatusIcon(searchResult.status)}
                    <span className="ml-1">{formatStatus(searchResult.status)}</span>
                  </div>
                </div>
                
                {searchResult.lastVerified && (
                  <p className="text-sm text-blue-200">
                    Last verified: {searchResult.lastVerified}
                  </p>
                )}
                
                {searchResult.statusHistory && searchResult.statusHistory.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2 text-white">Status History:</h4>
                    <div className="space-y-2">
                      {searchResult.statusHistory.map((item, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-24 text-gray-400">{item.date}</div>
                          <div className="flex items-center">
                            {getStatusIcon(item.status)}
                            <span className="ml-1 text-gray-200">{formatStatus(item.status)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-gray-800/40 text-sm text-gray-400 border-t border-blue-500/10">
            <div className="flex items-center">
              <AlertCircle className="mr-2 h-4 w-4 text-blue-400" />
              <p>RugID statuses are verified by Unmask Protocol's investigation team. No personal information is displayed.</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RugIdSearchPage;
