
import { get, post } from '../utils/api';

export const alertsService = {
  /**
   * Get all alerts
   */
  getAlerts: () => get('/alerts'),
  
  /**
   * Get alert by ID
   */
  getAlertById: (id) => get(`/alerts/${id}`),
  
  /**
   * Acknowledge an alert
   */
  acknowledgeAlert: (id) => post(`/alerts/${id}/acknowledge`, {}),
  
  /**
   * Dismiss an alert
   */
  dismissAlert: (id) => post(`/alerts/${id}/dismiss`, {}),
  
  /**
   * Create a new alert (admin only)
   */
  createAlert: (alertData) => post('/alerts', alertData),
};
