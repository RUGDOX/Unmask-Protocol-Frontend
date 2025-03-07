
import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-12">
      <div className="flex items-center gap-4">
        <img 
          src="/unmask-logo.svg" 
          alt="Unmask Protocol Logo" 
          className="h-16 w-auto" 
          onError={(e) => {
            console.error('Logo failed to load, using fallback');
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTEwMCAwQzQ0LjggMCAwIDQ0LjggMCAxMDBDMCAxNTUuMiA0NC44IDIwMCAxMDAgMjAwQzE1NS4yIDIwMCAyMDAgMTU1LjIgMjAwIDEwMEMyMDAgNDQuOCAxNTUuMiAwIDEwMCAwWiIgZmlsbD0id2hpdGUiLz4KICA8cGF0aCBkPSJNNjUgMTI1QzY1IDExNS4xIDczLjEgMTA3IDgzIDEwN0gxMTdDMTI2LjkgMTA3IDEzNSAxMTUuMSAxMzUgMTI1VjE1NUgxNTVWMTI1QzE1NSAxMDQuMCAxMzguMCA4NyAxMTcgODdIODNDNjIuMCA4NyA0NSAxMDQuMCA0NSAxMjVWMTU1SDY1VjEyNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==';
          }}
        />
        <h1 className="text-4xl font-bold">Unmask Protocol</h1>
      </div>
    </header>
  );
};

export default Header;
