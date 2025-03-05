
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, AlertTriangle, BadgeCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Unmask Protocol</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Bringing transparency and trust to the Web3 ecosystem through verified identities and scam reporting
        </p>
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
  );
};

export default Index;
