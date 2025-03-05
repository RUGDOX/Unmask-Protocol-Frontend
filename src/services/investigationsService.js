
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
};
