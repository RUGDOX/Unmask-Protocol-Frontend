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
        {/* Hero Section with binary particles - REDUCED TEXT SIZE */}
        <section className="text-center mb-12 relative">
          <div className="binary-particles-bg glass-morph p-8 rounded-lg border border-blue-500/20 shadow-glow">
            <h1 className="text-3xl font-bold mb-4 text-gradient">Unmask the Threats. Secure Your Future.</h1>
            <p className="text-base mb-6 max-w-3xl mx-auto font-normal">
              In Web3, trust is everything — but scams and fraud put that trust at risk. The Unmask Protocol is your digital ally, providing powerful tools for identity verification, fraud reporting, and secure evidence storage — all backed by the robust FORTRESS data layer.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 shadow-glow">Get Started</Button>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10" as={Link} to="/about">Learn More</Button>
            </div>
          </div>
        </section>

        {/* New section between Hero and Features - REDUCED TEXT SIZE */}
        <section className="mb-16 relative">
          <div className="glass-morph p-6 rounded-lg border border-blue-500/20 shadow-glow flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-2/3 order-2 md:order-1">
              <h2 className="text-xl font-bold mb-3 text-gradient">Your Shield in the Web3 Landscape</h2>
              <p className="text-sm mb-3 font-normal">
                Unmask Protocol works independently — but when combined with RugHunter, it becomes part of a powerful network built to stop Web3 scams in their tracks.
              </p>
              <p className="text-base font-semibold">
                Expose deception. Enforce accountability. Protect Web3.
              </p>
            </div>
            <div className="w-full md:w-1/3 order-1 md:order-2 flex justify-center">
              <div className="pulse-subtle">
                <img src="/unmask-logo-main.png" alt="RugHunter Logo" className="h-16 w-auto" />
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
              icon={<Eye className="h-10 w-10 text-blue-500" />}
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

        {/* How It Works - UPDATED with adjusted heading */}
        <section className="mb-16 relative z-10">
          <div className="glass-morph p-8 rounded-lg border border-blue-500/20 shadow-glow">
            <h2 className="text-3xl font-bold mb-6 text-center text-gradient">Fraud Detection Process</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left side - Steps with updated descriptions */}
              <div className="space-y-6">
                <StepCard 
                  number="01"
                  icon={<Eye className="h-8 w-8 text-blue-400" />}
                  title="Verify with Confidence"
                  description="Project founders complete a secure identity check, ensuring transparency without exposing sensitive information."
                />
                
                <StepCard 
                  number="02"
                  icon={<Lock className="h-8 w-8 text-purple-400" />}
                  title="Hardened Data Protection"
                  description="Personal data is stored in high-security data vaults with offensive protection measures."
                />
                
                <StepCard 
                  number="03"
                  icon={<FileText className="h-8 w-8 text-orange-400" />}
                  title="Evidence Submission"
                  description="Users submit scam/rug/fraud events with supporting evidence for thorough investigation."
                />
                
                <StepCard 
                  number="04"
                  icon={<Bell className="h-8 w-8 text-yellow-400" />}
                  title="Investigation & Alerts"
                  description="Investigators evaluate evidence and confirm threats, triggering real-time alerts."
                />
              </div>
              
              {/* Right side - Updated Visual Element with FileText icon instead of BarChart3 */}
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
              Unmask Protocol thrives on its own — but when paired with RugHunter's live threat detection system, Web3 becomes a safer place for everyone.
            </p>
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
