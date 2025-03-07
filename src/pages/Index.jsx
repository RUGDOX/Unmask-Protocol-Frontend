
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, AlertTriangle, BadgeCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
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
            />
            <h1 className="text-4xl font-bold">Unmask Protocol</h1>
          </div>
        </header>

        {/* Main content */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Blockchain Security Reimagined
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Securing Web3 with advanced RugID verification, transparent reporting, 
            and decentralized reputation management.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gray-900 border-gray-700">
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
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium">
                  <span>Report a Scam</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
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
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                  <span>Register Your Project</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Footer */}
        <footer className="border-t border-blue-500/20 pt-6 mt-12 text-center text-sm text-blue-200">
          <p>© {new Date().getFullYear()} Unmask Protocol. Securing the Web3 ecosystem.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
