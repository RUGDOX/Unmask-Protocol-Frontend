
import React from 'react';
import ProjectRegistrationForm from '../components/ProjectRegistrationForm';
import { Shield, Lock, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

const ProjectRegistrationPage = () => {
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
          <h1 className="text-3xl font-bold mb-2 text-white">Unmask Protocol RugID Registration</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Register your Web3 project and receive a verified RugID to build trust with your community.
            Your RugID acts as your Web3 DNA, protecting your privacy while ensuring accountability.
          </p>
        </div>
        
        <Alert className="mb-6 max-w-3xl mx-auto bg-black/50 border-blue-500/20">
          <Shield className="h-4 w-4 text-blue-400" />
          <AlertTitle className="text-white">Privacy & Security Guaranteed</AlertTitle>
          <AlertDescription className="flex flex-col space-y-2 text-blue-100">
            <div className="flex items-start">
              <Lock className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
              <span>Your personal information is stored in secure data vaults with a dead man's switch protection mechanism.</span>
            </div>
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
              <span>Your RugID (format: RID-XX00XX00XX00) is cryptographically generated from your Web3 and personal information, creating a unique identifier that cannot be reverse-engineered.</span>
            </div>
          </AlertDescription>
        </Alert>
        
        <ProjectRegistrationForm />
      </div>
    </div>
  );
};

export default ProjectRegistrationPage;
