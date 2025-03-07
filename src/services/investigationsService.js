
import { get, post, put, del } from '../utils/api';

export const investigationsService = {
  /**
   * Get all investigations
   */
  getInvestigations: async () => {
    try {
      return await get('/investigations');
    } catch (error) {
      console.error('Failed to fetch investigations:', error);
      throw error;
    }
  },
  
  /**
   * Get investigation by ID
   */
  getInvestigationById: async (id) => {
    try {
      return await get(`/investigations/${id}`);
    } catch (error) {
      console.error(`Failed to fetch investigation ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Create a new investigation
   */
  createInvestigation: async (data) => {
    try {
      return await post('/investigations', data);
    } catch (error) {
      console.error('Failed to create investigation:', error);
      throw error;
    }
  },
  
  /**
   * Update investigation status
   */
  updateInvestigationStatus: async (id, status) => {
    try {
      return await put(`/investigations/${id}/status`, { status });
    } catch (error) {
      console.error(`Failed to update investigation ${id} status:`, error);
      throw error;
    }
  },
  
  /**
   * Create investigation from a report
   */
  createInvestigationFromReport: async (reportId, investigationData) => {
    try {
      return await post(`/investigations/from-report/${reportId}`, investigationData);
    } catch (error) {
      console.error(`Failed to create investigation from report ${reportId}:`, error);
      throw error;
    }
  },
  
  /**
   * Get reports linked to an investigation
   */
  getLinkedReports: async (investigationId) => {
    try {
      return await get(`/investigations/${investigationId}/reports`);
    } catch (error) {
      console.error(`Failed to get reports for investigation ${investigationId}:`, error);
      throw error;
    }
  },
    
  /**
   * Assign investigation to agent
   */
  assignToAgent: async (investigationId, agentId) => {
    try {
      return await put(`/investigations/${investigationId}/assign`, { agentId });
    } catch (error) {
      console.error(`Failed to assign investigation ${investigationId} to agent ${agentId}:`, error);
      throw error;
    }
  },
    
  /**
   * Get investigation package for verification
   */
  getInvestigationPackage: async (investigationId) => {
    try {
      return await get(`/investigations/${investigationId}/package`);
    } catch (error) {
      console.error(`Failed to get package for investigation ${investigationId}:`, error);
      throw error;
    }
  },
    
  /**
   * Submit final verification and prepare for external sharing
   */
  submitFinalVerification: async (investigationId, verificationData) => {
    try {
      return await post(`/investigations/${investigationId}/final-verification`, verificationData);
    } catch (error) {
      console.error(`Failed to submit verification for investigation ${investigationId}:`, error);
      throw error;
    }
  },
    
  /**
   * Send investigation package to external party
   */
  sendInvestigationPackage: async (investigationId, destinationData) => {
    try {
      return await post(`/investigations/${investigationId}/send-package`, destinationData);
    } catch (error) {
      console.error(`Failed to send package for investigation ${investigationId}:`, error);
      throw error;
    }
  },
    
  /**
   * Get audit log for investigation
   */
  getInvestigationAuditLogs: async (investigationId) => {
    try {
      return await get(`/investigations/${investigationId}/audit-logs`);
    } catch (error) {
      console.error(`Failed to get audit logs for investigation ${investigationId}:`, error);
      throw error;
    }
  },
  
  /**
   * Delete an investigation
   */
  deleteInvestigation: async (investigationId) => {
    try {
      return await del(`/investigations/${investigationId}`);
    } catch (error) {
      console.error(`Failed to delete investigation ${investigationId}:`, error);
      throw error;
    }
  },
  
  /**
   * Update investigation details
   */
  updateInvestigation: async (id, data) => {
    try {
      return await put(`/investigations/${id}`, data);
    } catch (error) {
      console.error(`Failed to update investigation ${id}:`, error);
      throw error;
    }
  }
};
