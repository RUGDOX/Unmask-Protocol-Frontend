import { post, get, put, del } from '../utils/api';

export const reportsService = {
  /**
   * Submit a new scam report
   */
  submitReport: async (reportData) => {
    try {
      return await post('/reports', reportData);
    } catch (error) {
      console.error('Failed to submit report:', error);
      throw error;
    }
  },
  
  /**
   * Get all reports (admin only)
   */
  getReports: async () => {
    try {
      return await get('/reports');
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      throw error;
    }
  },
  
  /**
   * Get report by ID (admin only)
   */
  getReportById: async (id) => {
    try {
      return await get(`/reports/${id}`);
    } catch (error) {
      console.error(`Failed to fetch report ${id}:`, error);
      throw error;
    }
  },

  /**
   * Link a report to an investigation
   */
  linkReportToInvestigation: async (reportId, investigationId) => {
    try {
      return await put(`/reports/${reportId}/link`, { investigationId });
    } catch (error) {
      console.error(`Failed to link report ${reportId} to investigation ${investigationId}:`, error);
      throw error;
    }
  },
  
  /**
   * Get reports that aren't linked to any investigation yet
   */
  getUnlinkedReports: async () => {
    try {
      return await get('/reports/unlinked');
    } catch (error) {
      console.error('Failed to fetch unlinked reports:', error);
      throw error;
    }
  },
  
  /**
   * Get reports by investigation ID
   */
  getReportsByInvestigation: async (investigationId) => {
    try {
      return await get(`/investigations/${investigationId}/reports`);
    } catch (error) {
      console.error(`Failed to fetch reports for investigation ${investigationId}:`, error);
      throw error;
    }
  },
  
  /**
   * Update report status
   */
  updateReportStatus: async (reportId, status) => {
    try {
      return await put(`/reports/${reportId}/status`, { status });
    } catch (error) {
      console.error(`Failed to update report ${reportId} status:`, error);
      throw error;
    }
  },
  
  /**
   * Delete a report
   */
  deleteReport: async (reportId) => {
    try {
      return await del(`/reports/${reportId}`);
    } catch (error) {
      console.error(`Failed to delete report ${reportId}:`, error);
      throw error;
    }
  },
  
  /**
   * Add comment to a report
   */
  addReportComment: async (reportId, comment) => {
    try {
      return await post(`/reports/${reportId}/comments`, { comment });
    } catch (error) {
      console.error(`Failed to add comment to report ${reportId}:`, error);
      throw error;
    }
  },
  
  /**
   * Get comments for a report
   */
  getReportComments: async (reportId) => {
    try {
      return await get(`/reports/${reportId}/comments`);
    } catch (error) {
      console.error(`Failed to fetch comments for report ${reportId}:`, error);
      throw error;
    }
  },
  
  /**
   * Submit report to threat database
   */
  submitToThreatDatabase: async (reportData) => {
    try {
      // This would be your actual API endpoint
      const response = await post('/api/threat-stream', {
        ...reportData,
        timestamp: new Date().toISOString(),
        source: 'unmask-protocol',
        threatType: 'web3-scam',
        // Add any additional fields required by your Fortress data layer
      });

      // Also submit to RugHunter AI endpoint
      await post('/api/rughunter/federated-learning', {
        reportData,
        modelUpdate: true,
      });

      return response;
    } catch (error) {
      console.error('Failed to submit to threat database:', error);
      throw error;
    }
  }
};
