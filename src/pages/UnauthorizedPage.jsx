
import React from 'react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-destructive mb-6">
        <AlertTriangle size={64} />
      </div>
      <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg text-center max-w-md mb-8">
        You do not have permission to access this page. Please contact an administrator if you believe this is an error.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
