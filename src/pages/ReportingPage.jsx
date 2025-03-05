
import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import ReportForm from "../components/ReportForm";

const ReportingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">Unmask Protocol</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Report a Web3 Scam</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help us combat fraud in the Web3 ecosystem. Your reports help identify and stop scammers
            and protect the community.
          </p>
        </div>

        <ReportForm />
        
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            All reports are reviewed by our investigation team. If there's a connection to 
            registered projects in our system, appropriate action will be taken.
          </p>
        </div>
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Unmask Protocol. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ReportingPage;
