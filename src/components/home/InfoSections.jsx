
import React from 'react';

const InfoSections = () => (
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
);

export default InfoSections;
