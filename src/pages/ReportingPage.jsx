
import React from "react";
import { useNavigate } from "react-router-dom";
import ReportForm from "../components/ReportForm";

const ReportingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
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
    </div>
  );
};

export default ReportingPage;
