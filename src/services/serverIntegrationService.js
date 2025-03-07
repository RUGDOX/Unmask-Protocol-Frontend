
import { post, get, put } from '../utils/api';

/**
 * Service to interact with the Unmask Protocol backend Express server
 */
export const serverIntegrationService = {
  /**
   * Submit evidence to the backend
   */
  submitEvidence: async (evidenceData) => {
    try {
      return await post('/api/evidence', evidenceData);
    } catch (error) {
      console.error('Failed to submit evidence:', error);
      throw error;
    }
  },
  
  /**
   * Request unmasking for a specific evidence
   */
  requestUnmasking: async (evidenceId) => {
    try {
      return await post('/api/unmask/request', { evidenceId });
    } catch (error) {
      console.error('Failed to request unmasking:', error);
      throw error;
    }
  },
  
  /**
   * Approve an unmasking request
   */
  approveUnmasking: async (requestId) => {
    try {
      return await post(`/api/unmask/approve/${requestId}`);
    } catch (error) {
      console.error(`Failed to approve unmasking request ${requestId}:`, error);
      throw error;
    }
  },
  
  /**
   * Register a project owner with identity verification
   */
  registerProjectOwner: async (ownerData) => {
    try {
      return await post('/api/project-owner/register', ownerData);
    } catch (error) {
      console.error('Failed to register project owner:', error);
      throw error;
    }
  },
  
  /**
   * Check verification status of a project owner
   */
  checkVerificationStatus: async (rugId) => {
    try {
      return await get(`/api/project-owner/verification-status/${rugId}`);
    } catch (error) {
      console.error(`Failed to check verification status for RugID ${rugId}:`, error);
      throw error;
    }
  },
  
  /**
   * User authentication with the backend
   */
  authenticateUser: async (credentials) => {
    try {
      return await post('/api/auth/login', credentials);
    } catch (error) {
      console.error('Failed to authenticate user:', error);
      throw error;
    }
  },
  
  /**
   * Submit report data to both the main system and threat database
   * - integrates with reportsService to send data to both systems
   */
  submitUnifiedReport: async (reportData) => {
    try {
      // Import reportsService dynamically to avoid circular dependencies
      const { reportsService } = await import('./reportsService');
      
      // First submit to main reporting system
      const mainResponse = await reportsService.submitReport(reportData);
      
      // Then submit to backend threat database
      const backendResponse = await post('/api/threat-stream/external', {
        ...reportData,
        source: 'unmask-protocol-frontend',
        timestamp: new Date().toISOString()
      });
      
      // Also ensure it's submitted to the RugHunter and threat stream endpoints
      await reportsService.submitToThreatDatabase(reportData);
      
      return {
        mainResponse,
        backendResponse
      };
    } catch (error) {
      console.error('Failed to submit unified report:', error);
      throw error;
    }
  }
};
