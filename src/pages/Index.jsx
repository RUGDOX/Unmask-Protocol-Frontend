
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Shield, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Tech particle background */}
      <div className="particle-container absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="tech-particles"></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-indigo-950/30 to-purple-950/40 pointer-events-none z-0"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section with binary particles instead of spinning border */}
        <section className="text-center mb-16 relative">
          <div className="binary-particles-bg glass-morph p-8 rounded-lg border border-blue-500/20 shadow-glow">
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Advanced blockchain security platform for detecting scams, verifying projects, and protecting users in the crypto ecosystem.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 shadow-glow">Get Started</Button>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10" as={Link} to="/about">Learn More</Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16 relative z-10">
          <h2 className="text-3xl font-bold mb-10 text-center text-gradient">Our Security Features</h2>
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

        {/* CTA Section with circuit lines effect */}
        <section className="glass-morph p-10 rounded-xl circuit-lines text-center mb-16 relative z-10 shadow-glow">
          <h2 className="text-3xl font-bold mb-4 text-gradient">Protect Your Crypto Assets</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join thousands of users who trust Unmask Protocol to safeguard their blockchain interactions and investments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 pulse-subtle shadow-blue-500/20 shadow-sm">
              Start Scanning
            </Button>
            <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10" as={Link} to="/about">
              About Unmask Protocol
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

// Feature card component with enhanced styling
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-all duration-300 shimmer shadow-glow glass-morph">
    <div className="mb-4 animate-float">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Index;
