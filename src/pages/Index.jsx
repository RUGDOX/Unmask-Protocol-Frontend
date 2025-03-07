
import React from 'react';
import { Button } from '../components/ui/button';
import { Shield, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Removed the Header import and rendering here since it's already in App.jsx */}
        
        <main className="py-8">
          {/* Hero Section */}
          <section className="text-center mb-16 glow-effect">
            <h1 className="text-5xl font-bold mb-6 text-gradient">Unmask Protocol</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Advanced blockchain security platform for detecting scams, verifying projects, and protecting users in the crypto ecosystem.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
              <Button variant="outline" className="border-blue-500 text-blue-500">Learn More</Button>
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Security Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                icon={<Shield className="h-10 w-10 text-blue-500" />}
                title="RugID Verification"
                description="Verify project authenticity and security score to avoid potential scams and rug pulls."
              />
              <FeatureCard 
                icon={<AlertTriangle className="h-10 w-10 text-orange-500" />}
                title="Scam Reporting"
                description="Report suspicious projects and contribute to our community-driven security database."
              />
              <FeatureCard 
                icon={<CheckCircle className="h-10 w-10 text-green-500" />}
                title="Project Verification"
                description="Get your legitimate project verified to build trust with your community."
              />
              <FeatureCard 
                icon={<Zap className="h-10 w-10 text-yellow-500" />}
                title="Real-time Alerts"
                description="Receive instant notifications about security threats in the blockchain space."
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 p-10 rounded-xl cyber-grid text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Protect Your Crypto Assets</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Join thousands of users who trust Unmask Protocol to safeguard their blockchain interactions and investments.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 pulse-subtle">
              Start Scanning
            </Button>
          </section>
        </main>

        {/* Also removed Footer import and rendering, as it's in App.jsx */}
      </div>
    </div>
  );
};

// Feature card component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-blue-800 transition-all shimmer">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Index;
