
import React from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/layout/Hero';
import FeatureCards from '../components/features/FeatureCards';
import Footer from '../components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Hero />
        <FeatureCards />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
