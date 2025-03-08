
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { AlertTriangle, CheckCircle, Zap, FileText, Eye, Lock, Bell } from 'lucide-react';

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
        {/* Hero Section with binary particles - REFINED CONTENT */}
        <section className="text-center mb-12 relative">
          <div className="binary-particles-bg glass-morph p-8 rounded-lg border border-blue-500/20 shadow-glow">
            <h1 className="text-3xl font-bold mb-4 text-gradient">Unmask the Threats. Enforce Accountability.</h1>
            <p className="text-base mb-6 max-w-3xl mx-auto font-normal">
              Web3's rapid growth has enabled innovation — but also opened the door to deception and fraud. The Unmask Protocol is a powerful framework designed to identify malicious actors, provide secure evidence storage, and empower trusted accountability — all while preserving user privacy.
            </p>
            <p className="text-base mb-6 font-semibold text-blue-400">
              Data-Driven. Privacy-Preserving. Built for Web3.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 shadow-glow">Get Started</Button>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10" as={Link} to="/about">Learn More</Button>
            </div>
          </div>
        </section>

        {/* New section between Hero and Features - UPDATED CONTENT */}
        <section className="mb-16 relative">
          <div className="glass-morph p-6 rounded-lg border border-blue-500/20 shadow-glow flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-2/3 order-2 md:order-1">
              <h2 className="text-xl font-bold mb-3 text-gradient">Your Shield in the Web3 Landscape</h2>
              <p className="text-sm mb-3 font-normal">
                Unmask Protocol creates a structured, verifiable path to expose bad actors in Web3, enforcing accountability without sacrificing privacy or decentralization.
              </p>
              <p className="text-base font-semibold">
                Expose deception. Enforce accountability. Protect Web3.
              </p>
            </div>
            <div className="w-full md:w-1/3 order-1 md:order-2 flex justify-center">
              <div className="pulse-subtle">
                <img src="/protection-shield.png" alt="Protection Shield" className="h-16 w-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* Features - UPDATED CONTENT */}
        <section className="mb-16 relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-gradient">Advanced Threat Detection and Evidence Management</h2>
          <p className="text-center mb-10 max-w-3xl mx-auto">
            The Unmask Protocol provides powerful tools for identity verification, fraud reporting, and secure evidence storage — creating a structured, verifiable path to expose bad actors in Web3.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Eye className="h-10 w-10 text-blue-500" />}
              title="Identity Verification Layer"
              description="Ensures project founders are real, verified individuals through secure, encrypted checks."
            />
            <FeatureCard 
              icon={<Lock className="h-10 w-10 text-purple-500" />}
              title="Encrypted Data Vault"
              description="Utilizes quantum-safe encryption to secure identity data while maintaining strict access controls."
            />
            <FeatureCard 
              icon={<CheckCircle className="h-10 w-10 text-green-500" />}
              title="Evidence Submission"
              description="Provides a structured workflow for submitting, validating, and securely recording fraud-related evidence."
            />
            <FeatureCard 
              icon={<AlertTriangle className="h-10 w-10 text-orange-500" />}
              title="Intelligent Risk Alerts"
              description="Real-time notifications highlight high-risk projects based on behavioral trends and verified data."
            />
          </div>
        </section>

        {/* How It Works - UPDATED CONTENT */}
        <section className="mb-16 relative z-10">
          <div className="glass-morph p-8 rounded-lg border border-blue-500/20 shadow-glow">
            <h2 className="text-3xl font-bold mb-6 text-center text-gradient">Precision Tools for Threat Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left side - Steps with updated descriptions */}
              <div className="space-y-6">
                <StepCard 
                  number="01"
                  icon={<Eye className="h-8 w-8 text-blue-400" />}
                  title="Identity Verification"
                  description="Cryptographic identity checks ensure founders and project leaders are vetted without compromising sensitive details."
                />
                
                <StepCard 
                  number="02"
                  icon={<Lock className="h-8 w-8 text-purple-400" />}
                  title="PII Vault Encryption"
                  description="Verified data is encrypted using AES-256 standards and securely vaulted for future reference."
                />
                
                <StepCard 
                  number="03"
                  icon={<FileText className="h-8 w-8 text-orange-400" />}
                  title="Fraud Evidence Handling"
                  description="Users can submit verified evidence of malicious activities, with encryption ensuring secure storage and controlled access."
                />
                
                <StepCard 
                  number="04"
                  icon={<Bell className="h-8 w-8 text-yellow-400" />}
                  title="Dynamic Threat Alerts"
                  description="The system evaluates project behaviors, issuing targeted alerts for risks based on verified data and established threat models."
                />
              </div>
              
              {/* Right side - Visual Element */}
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  {/* Cyber security visual */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-600/30 animate-pulse-slow"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-3/4 h-3/4">
                      {/* Inner circle with updated visual */}
                      <div className="absolute inset-0 rounded-full border-2 border-blue-500/40 flex items-center justify-center">
                        <FileText className="w-16 h-16 text-blue-400" />
                      </div>
                      
                      {/* Orbiting elements - kept as is */}
                      <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '15s' }}>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="bg-purple-500 w-4 h-4 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                          <div className="bg-green-500 w-3 h-3 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '12s' }}>
                        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="bg-yellow-500 w-5 h-5 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                          <div className="bg-blue-500 w-4 h-4 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Outer ring with pulsing effect */}
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-pulse" style={{ animationDuration: '3s' }}></div>
                </div>
              </div>
            </div>
            
            {/* Bottom text */}
            <p className="mt-8 text-lg text-center">
              Unmask Protocol enforces accountability without sacrificing privacy or decentralization.
            </p>
          </div>
        </section>

        {/* For Developers and Investors Sections - UPDATED CONTENT */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-morph p-6 rounded-lg border border-blue-500/20 shadow-glow">
            <h2 className="text-2xl font-bold mb-4 text-gradient">Built for Integration. Designed for Security.</h2>
            <p className="mb-4">
              The Unmask Protocol API provides developers with seamless integration tools to enhance platform security, including on-chain and off-chain data access, flexible threat intelligence feeds, and scalable architecture.
            </p>
            <p>
              Unmask Protocol's modular design adapts to your platform's needs without compromising security standards.
            </p>
          </div>
          <div className="glass-morph p-6 rounded-lg border border-blue-500/20 shadow-glow">
            <h2 className="text-2xl font-bold mb-4 text-gradient">Empowering Investors with Actionable Intelligence</h2>
            <p className="mb-4">
              Unmask Protocol enhances investment confidence by providing verified identity data, secure evidence reports, and intelligent threat detection. Its structured reporting system offers a clear view of project integrity.
            </p>
            <p>
              See the risks others miss. Make informed decisions with Unmask Protocol.
            </p>
          </div>
        </section>

        {/* CTA Section - UPDATED CONTENT */}
        <section className="glass-morph p-10 rounded-xl static-circuit-lines text-center mb-16 relative z-10 shadow-glow">
          <h2 className="text-3xl font-bold mb-4 text-gradient">Web3's Future Relies on Accountability — Take Action Now.</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Fraud and deception are evolving — but so are the tools to stop them. The Unmask Protocol brings precision, structure, and security to an unpredictable Web3 landscape.
          </p>
          <p className="mb-6 max-w-2xl mx-auto font-semibold">
            Expose deception. Fortify trust. Build the future securely.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 pulse-subtle shadow-blue-500/20 shadow-sm">
              Start Using Unmask Protocol
            </Button>
            <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10" as={Link} to="/about">
              Learn More
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

// Step card component for the workflow section
const StepCard = ({ number, icon, title, description }) => (
  <div className="flex gap-4 p-4 rounded-lg border border-blue-500/10 bg-gray-900/40 hover:bg-gray-900/60 transition-all duration-300">
    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 border border-blue-500/20">
      {icon}
    </div>
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold text-blue-400 opacity-70">STEP {number}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </div>
);

export default Index;
