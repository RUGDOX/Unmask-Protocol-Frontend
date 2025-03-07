
import { get, post, put, del } from '../utils/api';

export const notificationsService = {
  /**
   * Get all notifications for the current user
   */
  getNotifications: async () => {
    try {
      const data = await get('/notifications');
      return data;
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      
      // Return fallback mock data if the API fails
      const mockNotifications = [
        { 
          id: 1, 
          title: 'Security Breach Attempt', 
          status: 'urgent',
          read: false,
          timestamp: new Date().toISOString()
        },
        { 
          id: 2, 
          title: 'System Update Required', 
          status: 'normal',
          read: false,
          timestamp: new Date().toISOString()
        },
        { 
          id: 3, 
          title: 'Unusual Login Pattern', 
          status: 'warning',
          read: false,
          timestamp: new Date().toISOString()
        }
      ];
      
      console.log('Using fallback notification data');
      return mockNotifications;
    }
  },
  
  /**
   * Mark a notification as read
   */
  markAsRead: async (id) => {
    try {
      return await put(`/notifications/${id}/read`, {});
    } catch (error) {
      console.error(`Failed to mark notification ${id} as read:`, error);
      throw error;
    }
  },
  
  /**
   * Mark all notifications as read
   */
  markAllAsRead: async () => {
    try {
      return await put('/notifications/read-all', {});
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      throw error;
    }
  },
  
  /**
   * Get unread notification count
   */
  getUnreadCount: async () => {
    try {
      return await get('/notifications/unread-count');
    } catch (error) {
      console.error('Failed to get unread notification count:', error);
      throw error;
    }
  },
  
  /**
   * Create a new notification (admin only)
   */
  createNotification: async (data) => {
    try {
      return await post('/notifications', data);
    } catch (error) {
      console.error('Failed to create notification:', error);
      throw error;
    }
  },
  
  /**
   * Delete a notification
   */
  deleteNotification: async (id) => {
    try {
      return await del(`/notifications/${id}`);
    } catch (error) {
      console.error(`Failed to delete notification ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Get notifications by type
   */
  getNotificationsByType: async (type) => {
    try {
      return await get(`/notifications/type/${type}`);
    } catch (error) {
      console.error(`Failed to get notifications of type ${type}:`, error);
      throw error;
    }
  },
  
  /**
   * Update notification settings
   */
  updateNotificationSettings: async (settings) => {
    try {
      return await put('/notifications/settings', settings);
    } catch (error) {
      console.error('Failed to update notification settings:', error);
      throw error;
    }
  },
  
  /**
   * Get notification settings
   */
  getNotificationSettings: async () => {
    try {
      return await get('/notifications/settings');
    } catch (error) {
      console.error('Failed to get notification settings:', error);
      throw error;
    }
  }
};
