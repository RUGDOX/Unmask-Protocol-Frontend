
import { get, post, put } from '../utils/api';

export const investigationsService = {
  /**
   * Get all investigations
   */
  getInvestigations: () => get('/investigations'),
  
  /**
   * Get investigation by ID
   */
  getInvestigationById: (id) => get(`/investigations/${id}`),
  
  /**
   * Create a new investigation
   */
  createInvestigation: (data) => post('/investigations', data),
  
  /**
   * Update investigation status
   */
  updateInvestigationStatus: (id, status) => put(`/investigations/${id}`, { status }),
  
  /**
   * Create investigation from a report
   */
  createInvestigationFromReport: (reportId, investigationData) => 
    post(`/investigations/from-report/${reportId}`, investigationData),
  
  /**
   * Get reports linked to an investigation
   */
  getLinkedReports: (investigationId) => 
    get(`/investigations/${investigationId}/reports`),
    
  /**
   * Assign investigation to agent
   */
  assignToAgent: (investigationId, agentId) => 
    put(`/investigations/${investigationId}/assign`, { agentId }),
    
  /**
   * Get investigation package for verification
   */
  getInvestigationPackage: (investigationId) => 
    get(`/investigations/${investigationId}/package`),
    
  /**
   * Submit final verification and prepare for external sharing
   */
  submitFinalVerification: (investigationId, verificationData) => 
    post(`/investigations/${investigationId}/final-verification`, verificationData),
    
  /**
   * Send investigation package to external party
   */
  sendInvestigationPackage: (investigationId, destinationData) => 
    post(`/investigations/${investigationId}/send-package`, destinationData),
    
  /**
   * Get audit log for investigation
   */
  getInvestigationAuditLogs: (investigationId) => 
    get(`/investigations/${investigationId}/audit-logs`),
};
