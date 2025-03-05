
import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, AlertTriangle, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">Unmask Protocol</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/admin")}>
            <Settings className="mr-2 h-4 w-4" />
            Admin Panel
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Transparency and Security in Web3
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Unmask Protocol provides verification tools and fraud detection for
            the decentralized ecosystem.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/admin")}>
              <User className="mr-2 h-5 w-5" />
              Access Dashboard
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/report")}>
              <AlertTriangle className="mr-2 h-5 w-5" />
              Report a Scam
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Identity Verification</CardTitle>
              <CardDescription>
                Verify the identity of project owners and team members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our protocol provides secure verification of team identities
                while respecting privacy concerns.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fraud Detection</CardTitle>
              <CardDescription>
                Advanced monitoring for suspicious activities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We use on-chain analysis and community reports to identify
                potential scams before they can cause harm.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Trust</CardTitle>
              <CardDescription>
                Building a safer ecosystem together.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Join our network of verified projects and contribute to a more
                trustworthy Web3 environment.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Unmask Protocol. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
