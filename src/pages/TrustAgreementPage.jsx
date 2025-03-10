
import React from 'react';
import TrustAgreementForm from '../components/TrustAgreementForm';
import { Shield, FileText, UserCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

const TrustAgreementPage = () => {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Tech particle background */}
      <div className="particle-container absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="tech-particles"></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-indigo-950/30 to-purple-950/40 pointer-events-none z-0"></div>

      <div className="container relative z-10 mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-white">Unmask Protocol Trust Agreement</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Please review and sign the Trust Agreement to complete your RugID registration process.
            This binding agreement establishes your commitment to ethical practices.
          </p>
        </div>
        
        <Alert className="mb-6 max-w-3xl mx-auto bg-black/50 border-blue-500/20">
          <FileText className="h-4 w-4 text-blue-400" />
          <AlertTitle className="text-white">Legal Document</AlertTitle>
          <AlertDescription className="flex flex-col space-y-2 text-blue-100">
            <div className="flex items-start">
              <Shield className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
              <span>This agreement is legally binding. By signing, you confirm your identity and accept responsibility for your project.</span>
            </div>
            <div className="flex items-start">
              <UserCheck className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
              <span>Your verified information will be attached to this agreement as a record of your identity verification.</span>
            </div>
          </AlertDescription>
        </Alert>
        
        <TrustAgreementForm />
      </div>
    </div>
  );
};

export default TrustAgreementPage;
