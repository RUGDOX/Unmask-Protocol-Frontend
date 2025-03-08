
import React from 'react';
import { Eye, Lock, FileText, Bell } from 'lucide-react';
import StepCard from './StepCard';

const HowItWorksSection = () => (
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
            description="Verified data is encrypted in layers and securely vaulted for future reference if fraud suspected."
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
);

export default HowItWorksSection;
