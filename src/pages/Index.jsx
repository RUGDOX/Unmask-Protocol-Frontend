
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ShieldSection from '../components/home/ShieldSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import InfoSections from '../components/home/InfoSections';
import CTASection from '../components/home/CTASection';

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
        <HeroSection />
        <ShieldSection />
        <FeaturesSection />
        <HowItWorksSection />
        <InfoSections />
        <CTASection />
      </div>
    </div>
  );
};

export default Index;
