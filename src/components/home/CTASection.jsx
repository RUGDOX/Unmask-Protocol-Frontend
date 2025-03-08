
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const CTASection = () => (
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
);

export default CTASection;
