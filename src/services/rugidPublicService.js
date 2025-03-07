
import { get, post } from '../utils/api';

export const rugidPublicService = {
  /**
   * Public search for RugID status
   * Returns only public information, no PII
   */
  searchRugId: async (rugId) => {
    try {
      return await get(`/public/rugid/${rugId}`);
    } catch (error) {
      console.error(`Failed to search RugID ${rugId}:`, error);
      throw error;
    }
  },
  
  /**
   * Get verification status of a RugID
   * Returns only the verification status for public view
   */
  getRugIdStatus: async (rugId) => {
    try {
      return await get(`/public/rugid/${rugId}/status`);
    } catch (error) {
      console.error(`Failed to get status for RugID ${rugId}:`, error);
      throw error;
    }
  },
  
  /**
   * Get public history of status changes
   * Only includes public-facing status changes
   */
  getRugIdStatusHistory: async (rugId) => {
    try {
      return await get(`/public/rugid/${rugId}/history`);
    } catch (error) {
      console.error(`Failed to get status history for RugID ${rugId}:`, error);
      throw error;
    }
  },
  
  /**
   * Report an issue with a RugID
   */
  reportRugIdIssue: async (rugId, issueData) => {
    try {
      return await post(`/public/rugid/${rugId}/report-issue`, issueData);
    } catch (error) {
      console.error(`Failed to report issue for RugID ${rugId}:`, error);
      throw error;
    }
  },
  
  /**
   * Verify RugID signature
   */
  verifyRugIdSignature: async (rugId, signatureData) => {
    try {
      return await post(`/public/rugid/${rugId}/verify-signature`, signatureData);
    } catch (error) {
      console.error(`Failed to verify signature for RugID ${rugId}:`, error);
      throw error;
    }
  },
  
  /**
   * Get public statistics about RugID system
   */
  getRugIdStats: async () => {
    try {
      return await get('/public/rugid/stats');
    } catch (error) {
      console.error('Failed to get RugID statistics:', error);
      throw error;
    }
  }
};
