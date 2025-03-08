
import React from 'react';
import { Eye, Lock, CheckCircle, AlertTriangle } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => (
  <section className="mb-16 relative z-10">
    <h2 className="text-3xl font-bold mb-6 text-center text-gradient">Advanced Threat Detection and Evidence Management</h2>
    <p className="text-center mb-10 max-w-3xl mx-auto">
      The Unmask Protocol provides powerful tools for identity verification, fraud reporting, and secure evidence storage — creating a structured, verifiable path to expose bad actors in Web3.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <FeatureCard 
        icon={<Eye className="h-10 w-10 text-blue-500" />}
        title="Identity Verification Layer"
        description="Project founders submit to secure, encrypted & in-depth identity investigations."
      />
      <FeatureCard 
        icon={<Lock className="h-10 w-10 text-purple-500" />}
        title="Encrypted Data Vault"
        description="Utilizes multiple layers of encryption & game changing threat response mechanisms to secure identity data while maintaining strict access controls."
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
);

export default FeaturesSection;
