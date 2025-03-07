
import React from 'react';

const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      <div className="p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Report a Scam</h3>
        <p>Help protect the community by reporting fraudulent projects</p>
      </div>
      
      <div className="p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Register for RugID</h3>
        <p>Project owners: Verify your identity and build trust</p>
      </div>
    </div>
  );
};

export default FeatureCards;
