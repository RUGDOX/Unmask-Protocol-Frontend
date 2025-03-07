
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="flex justify-between items-center py-6">
      <div className="flex items-center gap-2">
        <img 
          src="/unmask-logo.png" 
          alt="Unmask Protocol Logo" 
          className="h-8 w-8"
          onError={(e) => {
            // Fallback to SVG if PNG is not found
            e.target.onerror = null;
            e.target.src = "/unmask-logo.svg";
            console.log("Logo fallback to SVG");
          }}
        />
        <Link to="/" className="text-2xl font-bold text-gradient">Unmask Protocol</Link>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-white hover:text-blue-400 transition-colors">Home</Link>
        <Link to="/rugid" className="text-white hover:text-blue-400 transition-colors">RugID</Link>
        <Link to="/report" className="text-white hover:text-blue-400 transition-colors">Report</Link>
        <Link to="/register" className="text-white hover:text-blue-400 transition-colors">Register Project</Link>
      </nav>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Desktop CTA Buttons */}
      <div className="hidden md:flex items-center gap-2">
        <Button variant="outline" className="border-blue-500 text-blue-500">Sign In</Button>
        <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-gray-900 p-4 z-50 border-t border-gray-800">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-white hover:text-blue-400 py-2" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/rugid" className="text-white hover:text-blue-400 py-2" onClick={toggleMobileMenu}>RugID</Link>
            <Link to="/report" className="text-white hover:text-blue-400 py-2" onClick={toggleMobileMenu}>Report</Link>
            <Link to="/register" className="text-white hover:text-blue-400 py-2" onClick={toggleMobileMenu}>Register Project</Link>
            <div className="flex flex-col pt-2 space-y-2">
              <Button variant="outline" className="border-blue-500 text-blue-500 w-full">Sign In</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full">Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
