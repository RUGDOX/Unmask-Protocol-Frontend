
import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-blue-500/20 pt-6 mt-12 text-center text-sm text-blue-200">
      <p>© {new Date().getFullYear()} Unmask Protocol</p>
    </footer>
  );
};

export default Footer;
