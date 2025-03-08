
import React from "react";
import { useNavigate } from "react-router-dom";
import ReportForm from "../components/ReportForm";

const ReportingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black relative">
      {/* Tech particle background */}
      <div className="particle-container absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="tech-particles"></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-indigo-950/30 to-purple-950/40 pointer-events-none z-0"></div>
      
      <main className="container relative z-10 mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">Report a Web3 Scam</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Help us combat fraud in the Web3 ecosystem. Your reports help identify and stop scammers
            and protect the community.
          </p>
        </div>

        <ReportForm />
        
        <div className="mt-12 text-center text-sm text-blue-200">
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
