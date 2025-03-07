import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, AlertTriangle, BadgeCheck, Zap, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { ThemeToggle } from '../components/ThemeToggle';

const PerformanceMonitor = () => {
  useEffect(() => {
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
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    console.log("Index component mounted");
    
    try {
      // Mark component as loaded
      setIsLoaded(true);
      console.log("Index component marked as loaded");
      
      // Hide the loading screen if it's still visible
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          if (loadingScreen) loadingScreen.style.display = 'none';
        }, 500);
      }
    } catch (error) {
      console.error("Error in Index component:", error);
    }
  }, []);

  // Debug render
  console.log("Index rendering, isLoaded:", isLoaded);

  return (
    <>
      <PerformanceMonitor />
      
      <div 
        className={`min-h-screen bg-black dark:bg-gray-900 transition-colors duration-200 cyber-grid ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: 'opacity 0.5s ease' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-purple-950/30 pointer-events-none"></div>
        
        <div className="container relative mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <img 
                src="/unmask-logo.svg" 
                alt="Unmask Protocol Logo" 
                className="h-16 w-auto" 
                onError={(e) => {
                  console.error('Logo failed to load, using fallback');
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTEwMCAwQzQ0LjggMCAwIDQ0LjggMCAxMDBDMCAxNTUuMiA0NC44IDIwMCAxMDAgMjAwQzE1NS4yIDIwMCAyMDAgMTU1LjIgMjAwIDEwMEMyMDAgNDQuOCAxNTUuMiAwIDEwMCAwWiIgZmlsbD0id2hpdGUiLz4KICA8cGF0aCBkPSJNNjUgMTI1QzY1IDExNS4xIDczLjEgMTA3IDgzIDEwN0gxMTdDMTI2LjkgMTA3IDEzNSAxMTUuMSAxMzUgMTI1VjE1NUgxNTVWMTI1QzE1NSAxMDQuMCAxMzguMCA4NyAxMTcgODdIODNDNjIuMCA4NyA0NSAxMDQuMCA0NSAxMjVWMTU1SDY1VjEyNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==';
                }}
                onLoad={() => console.log('Logo loaded successfully')}
              />
              <h1 className="text-4xl font-bold text-gradient">Unmask Protocol</h1>
            </div>
            <ThemeToggle />
          </header>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient glow-effect">
              Blockchain Security Reimagined
            </h2>
            <p className="text-blue-100 dark:text-blue-100 max-w-2xl mx-auto text-lg">
              Securing Web3 with advanced RugID verification, transparent reporting, 
              and decentralized reputation management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="overflow-hidden border-0 dark:border-gray-700 bg-gray-900/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 shimmer">
              <div className="h-1.5 w-full bg-gradient-to-r from-red-500 to-orange-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <span className="text-white">Report a Scam</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Help protect the community by reporting fraudulent projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-200">
                  Have you encountered a suspicious Web3 project or potential scam? Report it to our system so we can investigate and warn others.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/report" className="w-full">
                  <Button className="w-full pulse-subtle bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-6">
                    <span>Report a Scam</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-0 dark:border-gray-700 bg-gray-900/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 shimmer">
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <BadgeCheck className="h-6 w-6 text-blue-400" />
                  <span className="text-white">Register for RugID</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Project owners: Verify your identity and build trust
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-200">
                  Register your project to receive a verified RugID. This shows your commitment to transparency and helps users identify legitimate projects.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/register" className="w-full">
                  <Button className="w-full pulse-subtle bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-6">
                    <span>Register Your Project</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-16 justify-center">
            <Card className="md:w-1/3 border-0 dark:border-gray-700 bg-gray-900/80 backdrop-blur-sm hover:shadow-md hover:shadow-blue-500/10 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  Verify Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link to="/verify">
                  <Button variant="ghost" className="w-full border border-blue-500/20 text-blue-100 hover:bg-blue-900/30">
                    RugID Verification
                    <Zap className="ml-2 h-4 w-4 text-yellow-400" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="md:w-1/3 border-0 dark:border-gray-700 bg-gray-900/80 backdrop-blur-sm hover:shadow-md hover:shadow-blue-500/10 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <Lock className="h-5 w-5 text-blue-400" />
                  Admin Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link to="/admin">
                  <Button variant="ghost" className="w-full border border-blue-500/20 text-blue-100 hover:bg-blue-900/30">
                    Admin Panel
                    <Shield className="ml-2 h-4 w-4 text-blue-400" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto mb-16 p-6 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-blue-500/20">
            <h3 className="text-xl font-bold mb-4 text-center text-gradient">The Future of Web3 Security</h3>
            <p className="text-blue-100 mb-6 text-center">
              Unmask Protocol brings transparency to blockchain projects while respecting legitimate builders' privacy.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3">
                <div className="text-blue-400 text-3xl font-bold mb-1">100+</div>
                <div className="text-gray-400 text-sm">Projects Verified</div>
              </div>
              <div className="text-center p-3">
                <div className="text-blue-400 text-3xl font-bold mb-1">$10M+</div>
                <div className="text-gray-400 text-sm">Saved from Scams</div>
              </div>
              <div className="text-center p-3">
                <div className="text-blue-400 text-3xl font-bold mb-1">24/7</div>
                <div className="text-gray-400 text-sm">Monitoring</div>
              </div>
              <div className="text-center p-3">
                <div className="text-blue-400 text-3xl font-bold mb-1">500+</div>
                <div className="text-gray-400 text-sm">Community Reports</div>
              </div>
            </div>
          </div>

          <footer className="border-t border-blue-500/20 pt-6 mt-12 text-center text-sm text-blue-200">
            <div className="flex justify-center mb-4">
              <img 
                src="/unmask-logo.svg" 
                alt="Unmask Protocol Logo" 
                className="h-10 w-auto opacity-50 hover:opacity-100 transition-opacity" 
                onError={(e) => {
                  console.error('Footer logo failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <p>© {new Date().getFullYear()} Unmask Protocol. Securing the Web3 ecosystem.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Index;
