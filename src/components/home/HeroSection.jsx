
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const HeroSection = () => (
  <section className="text-center mb-12 relative">
    <div className="binary-particles-bg glass-morph p-8 rounded-lg border border-blue-500/20 shadow-glow">
      <h1 className="text-3xl font-bold mb-4 text-gradient">Unmask the Threats. Enforce Accountability.</h1>
      <p className="text-base mb-5 max-w-3xl mx-auto font-normal">
        Web3's rapid growth has enabled innovation — but also opened the door to deception and fraud. The Unmask Protocol is a powerful framework designed to identify malicious actors, provide secure evidence storage, and empower trusted accountability — all while preserving user privacy.
      </p>
      <p className="text-base mb-5 font-semibold text-blue-400">
        Data-Driven. Privacy-Preserving. Built for Web3.
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <Button className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 shadow-glow">Get Started</Button>
        <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10" as={Link} to="/about">Learn More</Button>
      </div>
    </div>
  </section>
);

export default HeroSection;
