import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, AlertTriangle, BadgeCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { ThemeToggle } from '../components/ThemeToggle';

const PerformanceMonitor = () => {
  React.useEffect(() => {
    const reportWebVitals = () => {
      if (window.performance && window.performance.timing) {
        const t = window.performance.timing;
        
        const domLoaded = t.domContentLoadedEventEnd - t.navigationStart;
        console.log(`DOM Content Loaded: ${domLoaded}ms`);
        
        const pageLoad = t.loadEventEnd - t.navigationStart;
        console.log(`Page Load Time: ${pageLoad}ms`);
      }
    };

    window.addEventListener('load', reportWebVitals);
    
    return () => {
      window.removeEventListener('load', reportWebVitals);
    };
  }, []);

  return null;
};

const Index = () => {
  return (
    <>
      <PerformanceMonitor />
      
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <img 
              src="/company-logo.svg" 
              alt="Company Logo" 
              className="h-12 w-auto dark:invert" 
            />
            <h1 className="text-4xl font-bold">Unmask Protocol</h1>
          </div>
          <ThemeToggle />
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Report a Scam
              </CardTitle>
              <CardDescription>
                Help protect the community by reporting fraudulent projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Have you encountered a suspicious Web3 project or potential scam? Report it to our system so we can investigate and warn others.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/report" className="w-full">
                <Button className="w-full">
                  Report a Scam
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-primary" />
                Register for RugID
              </CardTitle>
              <CardDescription>
                Project owners: Verify your identity and build trust
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Register your project to receive a verified RugID. This shows your commitment to transparency and helps users identify legitimate projects.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/register" className="w-full">
                <Button className="w-full" variant="outline">
                  Register Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
          <p className="mb-4 text-muted-foreground">
            Access the administrative panel to manage investigations, reports, and user verification
          </p>
          <Link to="/admin">
            <Button variant="outline" size="lg">
              <Shield className="mr-2 h-5 w-5" /> Admin Panel
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
