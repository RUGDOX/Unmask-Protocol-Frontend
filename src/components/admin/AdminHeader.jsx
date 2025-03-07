
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../ui/button";
import NotificationDropdown from './NotificationDropdown';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader = () => {
  const { logout } = useAuth();

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <img 
          src="/unmask-logo.svg" 
          alt="Unmask Protocol Logo" 
          className="h-10 w-auto" 
        />
        <h1 className="text-3xl font-bold text-gradient">Admin Panel</h1>
      </div>
      <div className="flex items-center gap-4">
        <NotificationDropdown />
        <Link to="/">
          <Button variant="outline" className="border-blue-500/20 text-blue-100 hover:bg-blue-900/30">
            Return to Dashboard
          </Button>
        </Link>
        <Button variant="ghost" onClick={logout} className="border-red-500/20 text-red-100 hover:bg-red-900/30">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
