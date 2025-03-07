
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Shield, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import GlitchingGlobe from '../components/visualization/GlitchingGlobe';

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
        {/* Hero Section with binary particles */}
        <section className="text-center mb-12 relative">
          <div className="binary-particles-bg glass-morph p-8 rounded-lg border border-blue-500/20 shadow-glow">
            <h1 className="text-4xl font-bold mb-4 text-gradient">Unmask the Threats. Secure Your Future.</h1>
            <p className="text-xl mb-6 max-w-3xl mx-auto">
              In Web3, trust is everything — but scams and fraud put that trust at risk. The Unmask Protocol is your digital ally, providing powerful tools for identity verification, fraud reporting, and secure evidence storage — all backed by the robust FORTRESS data layer.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 shadow-glow">Get Started</Button>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10" as={Link} to="/about">Learn More</Button>
            </div>
          </div>
        </section>

        {/* New section between Hero and Features */}
        <section className="mb-16 relative">
          <div className="glass-morph p-8 rounded-lg border border-blue-500/20 shadow-glow flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <h2 className="text-2xl font-bold mb-4 text-gradient">Your Shield in the Web3 Landscape</h2>
              <p className="text-lg mb-4">
                Unmask Protocol works independently — but when combined with RugHunter, it becomes part of a powerful network built to stop Web3 scams in their tracks.
              </p>
              <p className="text-xl font-semibold mb-4">
                Expose deception. Enforce accountability. Protect Web3.
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-700 hover:from-purple-700 hover:to-blue-800 shadow-glow mt-2">
                Explore Features
              </Button>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
              <div className="pulse-subtle">
                <Shield className="h-32 w-32 text-blue-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16 relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-gradient">Your Shield Against Digital Deception</h2>
          <p className="text-center mb-10 max-w-3xl mx-auto">
            Unmask Protocol stands strong on its own — but when connected to RugHunter, its insights empower next-level fraud detection.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-blue-500" />}
              title="Identity Verification"
              description="Ensure project founders are verified without compromising privacy."
            />
            <FeatureCard 
              icon={<AlertTriangle className="h-10 w-10 text-orange-500" />}
              title="AI-Enhanced Fraud Detection"
              description="Advanced threat analysis identifies suspicious behaviors early."
            />
            <FeatureCard 
              icon={<CheckCircle className="h-10 w-10 text-green-500" />}
              title="Encrypted Evidence Vault"
              description="Secure, quantum-safe storage for critical data and proof."
            />
            <FeatureCard 
              icon={<Zap className="h-10 w-10 text-yellow-500" />}
              title="Dynamic Risk Alerts"
              description="Real-time notifications warn of verified scams or high-risk interactions."
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16 relative z-10">
          <div className="blockchain-visualization glass-morph p-8 rounded-lg border border-blue-500/20 shadow-glow">
            <h2 className="text-3xl font-bold mb-6 text-center text-gradient">Exposing Bad Actors in Web3</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-1/2">
                <ol className="space-y-4 list-decimal pl-5">
                  <li className="text-lg">
                    <span className="font-semibold">Verify with Confidence</span> — Project founders complete a secure identity check, ensuring transparency without exposing sensitive information.
                  </li>
                  <li className="text-lg">
                    <span className="font-semibold">Encrypted Data Storage</span> — Personal data is encrypted and stored securely in the FORTRESS layer.
                  </li>
                  <li className="text-lg">
                    <span className="font-semibold">Fraud Reporting Workflow</span> — Users can submit verified fraud reports backed by encrypted evidence for review.
                  </li>
                  <li className="text-lg">
                    <span className="font-semibold">Real-Time Alerts</span> — Users and platforms receive instant notifications when threats are detected.
                  </li>
                </ol>
                <p className="mt-4 text-lg">
                  Unmask Protocol thrives on its own — but when paired with RugHunter's live threat detection system, Web3 becomes a safer place for everyone.
                </p>
              </div>
              <div className="w-full md:w-1/2 h-64 rounded-lg overflow-hidden">
                <GlitchingGlobe />
              </div>
            </div>
          </div>
        </section>

        {/* For Developers and Investors Sections */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-morph p-6 rounded-lg border border-blue-500/20 shadow-glow">
            <h2 className="text-2xl font-bold mb-4 text-gradient">Empowering Builders in Web3</h2>
            <p className="mb-4">
              Integrate the Unmask Protocol API to protect your users and secure your platform. With real-time data insights powered by the FORTRESS layer, your system gains dynamic fraud detection capabilities without sacrificing performance or privacy.
            </p>
            <p>
              For even stronger protection, connect with RugHunter to unlock advanced risk scoring and behavioral analysis.
              Together, these systems provide unmatched protection for your users and your platform.
            </p>
          </div>
          <div className="glass-morph p-6 rounded-lg border border-blue-500/20 shadow-glow">
            <h2 className="text-2xl font-bold mb-4 text-gradient">Invest with Confidence</h2>
            <p className="mb-4">
              Web3's opportunity is vast — but so are the risks. The Unmask Protocol empowers investors with verified project data, risk alerts, and secure fraud reporting — all designed to prevent costly losses before they happen.
            </p>
            <p>
              For enhanced risk visibility, combine Unmask with RugHunter to spot emerging scam patterns in real-time.
              Stay protected. Stay informed. Stay ahead.
            </p>
          </div>
        </section>

        {/* CTA Section with static circuit lines */}
        <section className="glass-morph p-10 rounded-xl static-circuit-lines text-center mb-16 relative z-10 shadow-glow">
          <h2 className="text-3xl font-bold mb-4 text-gradient">The Future of Web3 Demands Accountability — Start Now.</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            The Web3 space moves fast — but fraud moves faster. With Unmask Protocol, you gain the tools to verify, detect, and defend against threats before they strike.
          </p>
          <p className="mb-6 max-w-2xl mx-auto">
            For those serious about security, pairing Unmask with RugHunter delivers unmatched protection in the fight against scams and rugs.
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
