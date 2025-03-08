
import React from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import { 
  Info, 
  Lock, 
  Shield, 
  Database, 
  Code, 
  ArrowRight, 
  Server, 
  FileCode
} from 'lucide-react';

const ApiInfoPage = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Unmask Protocol API</h1>
          <p className="text-xl text-muted-foreground">
            Connect to our threat intelligence database and enhance your platform's security
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              About the API
            </CardTitle>
            <CardDescription>
              Integrate blockchain security data directly into your platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Unmask Protocol API provides access to our comprehensive blockchain threat intelligence 
              database, allowing you to verify project legitimacy, detect scams, and enhance your platform's 
              security measures in real-time.
            </p>
            <p>
              Our API is designed for platforms, wallets, dApps, and security tools that want to provide 
              enhanced protection to their users against blockchain-related scams and frauds.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Data Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 min-w-5 text-green-500 mt-0.5" />
                  <span>Project verification status</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 min-w-5 text-green-500 mt-0.5" />
                  <span>Contract address risk assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 min-w-5 text-green-500 mt-0.5" />
                  <span>Wallet blacklist status</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 min-w-5 text-green-500 mt-0.5" />
                  <span>Scam reports and alerts</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Integration Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 min-w-5 text-green-500 mt-0.5" />
                  <span>RESTful API endpoints</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 min-w-5 text-green-500 mt-0.5" />
                  <span>Webhook notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 min-w-5 text-green-500 mt-0.5" />
                  <span>SDK integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 min-w-5 text-green-500 mt-0.5" />
                  <span>GraphQL query support</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              API Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <Shield className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Security Checks</h3>
                <p className="text-sm text-muted-foreground">Verify contracts and addresses in real-time</p>
              </div>
              <div className="border rounded-lg p-4">
                <Lock className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Rate Limiting</h3>
                <p className="text-sm text-muted-foreground">Flexible plans based on your usage needs</p>
              </div>
              <div className="border rounded-lg p-4">
                <FileCode className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Documentation</h3>
                <p className="text-sm text-muted-foreground">Comprehensive guides and examples</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-6">Ready to integrate?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/api">
              <Button size="lg" className="min-w-[200px]">
                Request API Access
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiInfoPage;
