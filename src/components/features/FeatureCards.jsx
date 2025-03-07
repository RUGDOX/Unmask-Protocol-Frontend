
import React from 'react';
import { AlertTriangle, BadgeCheck } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      <FeatureCard 
        icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
        title="Report a Scam"
        description="Help protect the community by reporting fraudulent projects"
        content="Have you encountered a suspicious Web3 project or potential scam? Report it to our system so we can investigate and warn others."
        buttonText="Report a Scam"
        linkTo="/report"
        buttonColor="bg-red-600 hover:bg-red-700"
      />
      
      <FeatureCard 
        icon={<BadgeCheck className="h-6 w-6 text-blue-400" />}
        title="Register for RugID"
        description="Project owners: Verify your identity and build trust"
        content="Register your project to receive a verified RugID. This shows your commitment to transparency and helps users identify legitimate projects."
        buttonText="Register Your Project"
        linkTo="/register"
        buttonColor="bg-blue-600 hover:bg-blue-700"
      />
    </div>
  );
};

export default FeatureCards;
