
import React from 'react';
import ProjectRegistrationForm from '../components/ProjectRegistrationForm';

const ProjectRegistrationPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Unmask Protocol RugID Registration</h1>
        <p className="text-muted-foreground">
          Register your Web3 project and receive a verified RugID to build trust with your community
        </p>
      </div>
      
      <ProjectRegistrationForm />
    </div>
  );
};

export default ProjectRegistrationPage;
