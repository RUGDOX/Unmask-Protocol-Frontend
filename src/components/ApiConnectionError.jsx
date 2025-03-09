
import React from 'react';
import { Button } from './ui/button';

const ApiConnectionError = ({ onRetry, error }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 mb-4 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold mb-2">Connection Error</h2>
      <p className="mb-4 text-gray-500 max-w-md">
        We're having trouble connecting to our servers. This could be due to network issues or server maintenance.
      </p>
      <div className="space-y-2">
        <Button onClick={onRetry} className="w-full md:w-auto">
          Retry Connection
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()} className="w-full md:w-auto">
          Refresh Page
        </Button>
      </div>
      {error && (
        <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm text-left w-full max-w-md">
          <p className="font-mono break-all">{JSON.stringify(error).substring(0, 300)}</p>
        </div>
      )}
    </div>
  );
};

export default ApiConnectionError;
