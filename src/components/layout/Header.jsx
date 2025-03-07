
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-blue-500" />
        <Link to="/" className="text-2xl font-bold text-gradient">Unmask Protocol</Link>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-white hover:text-blue-400 transition-colors">Home</Link>
        <Link to="/rugid" className="text-white hover:text-blue-400 transition-colors">RugID</Link>
        <Link to="/report" className="text-white hover:text-blue-400 transition-colors">Report</Link>
        <Link to="/register" className="text-white hover:text-blue-400 transition-colors">Register Project</Link>
      </nav>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" className="hidden sm:inline-flex border-blue-500 text-blue-500">Sign In</Button>
        <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
      </div>
    </header>
  );
};

export default Header;
