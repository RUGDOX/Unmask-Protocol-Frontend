
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, AlertTriangle, BadgeCheck, Zap, Lock } from 'lucide-react';
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
      
      <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <img 
                src="/company-logo.svg" 
                alt="Company Logo" 
                className="h-12 w-auto dark:invert" 
              />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">Unmask Protocol</h1>
            </div>
            <ThemeToggle />
          </header>

          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-gray-100">Blockchain Security Reimagined</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto dark:text-gray-400">
              Securing Web3 with advanced RugID verification, transparent reporting, 
              and decentralized reputation management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="overflow-hidden border dark:border-gray-700 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10">
              <div className="h-1 w-full bg-gradient-to-r from-red-500 to-orange-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Report a Scam
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Help protect the community by reporting fraudulent projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 dark:text-gray-300">
                  Have you encountered a suspicious Web3 project or potential scam? Report it to our system so we can investigate and warn others.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/report" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                    Report a Scam
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border dark:border-gray-700 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10">
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-blue-500" />
                  Register for RugID
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Project owners: Verify your identity and build trust
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 dark:text-gray-300">
                  Register your project to receive a verified RugID. This shows your commitment to transparency and helps users identify legitimate projects.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/register" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Register Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-12 justify-center">
            <Card className="md:w-1/3 dark:border-gray-700 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  Verify Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link to="/verify">
                  <Button variant="ghost" className="w-full border border-primary/20 dark:border-gray-700 dark:text-gray-300">
                    RugID Verification
                    <Zap className="ml-2 h-4 w-4 text-yellow-500" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="md:w-1/3 dark:border-gray-700 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-blue-500" />
                  Admin Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link to="/admin">
                  <Button variant="ghost" className="w-full border border-primary/20 dark:border-gray-700 dark:text-gray-300">
                    Admin Panel
                    <Shield className="ml-2 h-4 w-4 text-blue-500" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <footer className="border-t dark:border-gray-800 pt-6 mt-12 text-center text-sm text-muted-foreground dark:text-gray-500">
            <p>© {new Date().getFullYear()} Unmask Protocol. Securing the Web3 ecosystem.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Index;
