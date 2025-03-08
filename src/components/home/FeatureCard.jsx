
import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-all duration-300 shimmer shadow-glow glass-morph">
    <div className="mb-4 animate-float">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default FeatureCard;
