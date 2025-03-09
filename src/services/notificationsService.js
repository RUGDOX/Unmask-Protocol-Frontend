
// Mock notifications service without real backend connections

export const notificationsService = {
  /**
   * Get mock notifications 
   */
  getNotifications: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock notifications
    return [
      { 
        id: 1, 
        title: 'Security Breach Attempt', 
        status: 'urgent',
        read: false,
        timestamp: new Date(Date.now() - 15 * 60000).toISOString() // 15 minutes ago
      },
      { 
        id: 2, 
        title: 'System Update Required', 
        status: 'normal',
        read: false,
        timestamp: new Date(Date.now() - 45 * 60000).toISOString() // 45 minutes ago
      },
      { 
        id: 3, 
        title: 'Unusual Login Pattern', 
        status: 'warning',
        read: false,
        timestamp: new Date(Date.now() - 120 * 60000).toISOString() // 2 hours ago
      }
    ];
  },
  
  /**
   * Mark a notification as read (mock)
   */
  markAsRead: async (id) => {
    console.log(`Mock: Marking notification ${id} as read`);
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  },
  
  /**
   * Mark all notifications as read (mock)
   */
  markAllAsRead: async () => {
    console.log('Mock: Marking all notifications as read');
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },
  
  /**
   * Get unread notification count (mock)
   */
  getUnreadCount: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { count: 3 };
  },
  
  /**
   * Create a new notification (mock)
   */
  createNotification: async (data) => {
    console.log('Mock: Creating notification', data);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id: Date.now(), ...data, success: true };
  },
  
  /**
   * Delete a notification (mock)
   */
  deleteNotification: async (id) => {
    console.log(`Mock: Deleting notification ${id}`);
    await new Promise(resolve => setTimeout(resolve, 400));
    return { success: true };
  },
  
  /**
   * Get notifications by type (mock)
   */
  getNotificationsByType: async (type) => {
    console.log(`Mock: Getting notifications of type ${type}`);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return mock data based on type
    return [
      { 
        id: 1, 
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`, 
        status: type === 'urgent' ? 'urgent' : type === 'warning' ? 'warning' : 'normal',
        read: false,
        timestamp: new Date().toISOString()
      }
    ];
  },
  
  /**
   * Update notification settings (mock)
   */
  updateNotificationSettings: async (settings) => {
    console.log('Mock: Updating notification settings', settings);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, settings };
  },
  
  /**
   * Get notification settings (mock)
   */
  getNotificationSettings: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      emailNotifications: true,
      pushNotifications: false,
      notifyOnUrgent: true,
      notifyOnWarning: true,
      notifyOnNormal: false,
      dailySummary: true
    };
  }
};
