
import { post, get, put } from '../utils/api';

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

  /**
   * Link a report to an investigation
   */
  linkReportToInvestigation: (reportId, investigationId) => 
    put(`/reports/${reportId}/link`, { investigationId }),
  
  /**
   * Get reports that aren't linked to any investigation yet
   */
  getUnlinkedReports: () => get('/reports/unlinked'),
  
  /**
   * Get reports by investigation ID
   */
  getReportsByInvestigation: (investigationId) => 
    get(`/investigations/${investigationId}/reports`),
};
