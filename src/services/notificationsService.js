
import { get, post, put } from '../utils/api';

export const notificationsService = {
  /**
   * Get all notifications for the current user
   */
  getNotifications: () => get('/notifications'),
  
  /**
   * Mark a notification as read
   */
  markAsRead: (id) => put(`/notifications/${id}/read`, {}),
  
  /**
   * Mark all notifications as read
   */
  markAllAsRead: () => put('/notifications/read-all', {}),
  
  /**
   * Get unread notification count
   */
  getUnreadCount: () => get('/notifications/unread-count'),
  
  /**
   * Create a new notification (admin only)
   */
  createNotification: (data) => post('/notifications', data),
};
