
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main className="py-12 text-center">
          <h1 className="text-4xl font-bold mb-6">Unmask Protocol</h1>
          <p className="text-xl mb-8">Blockchain Security Platform</p>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
