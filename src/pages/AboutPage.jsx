
import React from 'react';
import { Shield, Lock, Search, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from "../components/ui/alert";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">About Unmask Protocol</h1>
        
        <div className="space-y-8">
          <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <p className="text-lg leading-relaxed">
              The Unmask Protocol aims to be the backbone of accountability in Web3, enhancing trust, privacy, and security. It works by verifying project owners through identity checks and issues RugIDs, unique digital fingerprints that provide an added layer of security without exposing personal data.
            </p>
          </section>
          
          <Alert className="bg-amber-900/30 border-amber-500/30">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-amber-100">
              Important: While Unmask Protocol significantly reduces risk and acts as a strong deterrent against fraudulent activities, it cannot guarantee complete prevention of all malicious behavior. The system works best when used alongside our other security tools, empowering users with better information to make safer decisions in the Web3 space.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <FeaturePill 
              icon={<Shield className="h-8 w-8 text-blue-500" />} 
              title="Trust & Verification" 
              description="Adding risk reduction through identity verification and issuing unique RugIDs that enhance security measures."
            />
            <FeaturePill 
              icon={<Lock className="h-8 w-8 text-blue-500" />} 
              title="Privacy-First Design" 
              description="Ensuring security and verification without exposing personal data of project creators."
            />
            <FeaturePill 
              icon={<Search className="h-8 w-8 text-blue-500" />} 
              title="Threat Intelligence" 
              description="Integration with FORTRESS, the system's global threat intelligence and data layer."
            />
          </div>
          
          <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <p className="mb-4">
              When a registered project is flagged, Unmask Protocol integrates with FORTRESS, the system's global threat intelligence and data layer, to track reports and assess risks.
            </p>
            <p className="mb-4">
              Encrypted evidence storage, fraud reporting workflows, and secure verification layers ensure that validated threats are escalated to Unmask Agents for further investigation.
            </p>
            <p className="mb-4">
              Built for privacy-first transparency, Unmask enables Web3 to be safer, smarter, and more resilient against scams without compromising user privacy.
            </p>
            <p>
              By combining the RugID system with our comprehensive reporting and verification tools, we return more power to end users in their fight against the prevalence of scams in the Web3 ecosystem.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

// Feature pill component for the about page
const FeaturePill = ({ icon, title, description }) => (
  <div className="bg-gray-900/30 p-5 rounded-lg border border-gray-800 hover:border-blue-800 transition-all flex flex-col items-center text-center">
    <div className="mb-3">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default AboutPage;
