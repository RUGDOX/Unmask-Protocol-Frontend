
import React, { useState, useEffect, useRef } from 'react';
import { Bell, BellDot } from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

const NotificationDropdown = ({ alerts = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Update notifications when alerts change
    if (alerts && alerts.length > 0) {
      const formattedNotifications = alerts.map(alert => ({
        ...alert,
        read: false,
        timestamp: new Date().toISOString()
      }));
      
      setNotifications(formattedNotifications);
      setUnreadCount(formattedNotifications.length);
    }
  }, [alerts]);

  useEffect(() => {
    // Handle clicks outside the dropdown to close it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    toast.success("All notifications marked as read");
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    
    setNotifications(updatedNotifications);
    setUnreadCount(prev => Math.max(prev - 1, 0));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        className="relative p-2" 
        onClick={toggleDropdown}
        aria-label="Notifications"
      >
        {unreadCount > 0 ? (
          <>
            <BellDot className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          </>
        ) : (
          <Bell className="h-5 w-5" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 border-b hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                    !notification.read ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between">
                    <p className="font-medium">{notification.title}</p>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Status: <span className={`${
                      notification.status === 'urgent' ? 'text-red-500' : 
                      notification.status === 'warning' ? 'text-amber-500' : 'text-blue-500'
                    }`}>
                      {notification.status}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <div className="p-5 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
