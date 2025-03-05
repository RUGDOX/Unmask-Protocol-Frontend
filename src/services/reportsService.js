
import { post, get } from '../utils/api';

export const reportsService = {
  /**
   * Submit a new scam report
   */
  submitReport: (reportData) => post('/reports', reportData),
  
  /**
   * Get all reports (admin only)
   */
  getReports: () => get('/reports'),
  
  /**
   * Get report by ID (admin only)
   */
  getReportById: (id) => get(`/reports/${id}`),
};
