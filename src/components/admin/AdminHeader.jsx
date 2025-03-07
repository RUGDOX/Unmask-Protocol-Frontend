
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../ui/button";
import NotificationDropdown from './NotificationDropdown';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader = () => {
  const { logout } = useAuth();
  const [alerts, setAlerts] = useState([]);

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Unmask Protocol Admin Panel</h1>
      <div className="flex items-center gap-4">
        <NotificationDropdown alerts={alerts} />
        <Link to="/">
          <Button variant="outline">
            Return to Dashboard
          </Button>
        </Link>
        <Button variant="ghost" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
