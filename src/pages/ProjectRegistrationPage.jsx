
import React from 'react';
import ProjectRegistrationForm from '../components/ProjectRegistrationForm';
import { Shield, Lock, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

const ProjectRegistrationPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Unmask Protocol RugID Registration</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Register your Web3 project and receive a verified RugID to build trust with your community.
          Your RugID acts as your Web3 DNA, protecting your privacy while ensuring accountability.
        </p>
      </div>
      
      <Alert className="mb-6 max-w-3xl mx-auto">
        <Shield className="h-4 w-4" />
        <AlertTitle>Privacy & Security Guaranteed</AlertTitle>
        <AlertDescription className="flex flex-col space-y-2">
          <div className="flex items-start">
            <Lock className="h-4 w-4 mr-2 mt-0.5" />
            <span>Your personal information is stored in secure data vaults with a dead man's switch protection mechanism.</span>
          </div>
          <div className="flex items-start">
            <AlertCircle className="h-4 w-4 mr-2 mt-0.5" />
            <span>Your RugID (format: RID-XX00XX00XX00) is cryptographically generated from your Web3 and personal information, creating a unique identifier that cannot be reverse-engineered.</span>
          </div>
        </AlertDescription>
      </Alert>
      
      <ProjectRegistrationForm />
    </div>
  );
};

export default ProjectRegistrationPage;
