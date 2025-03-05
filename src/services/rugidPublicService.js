
import { get } from '../utils/api';

export const rugidPublicService = {
  /**
   * Public search for RugID status
   * Returns only public information, no PII
   */
  searchRugId: (rugId) => get(`/public/rugid/${rugId}`),
  
  /**
   * Get verification status of a RugID
   * Returns only the verification status for public view
   */
  getRugIdStatus: (rugId) => get(`/public/rugid/${rugId}/status`),
  
  /**
   * Get public history of status changes
   * Only includes public-facing status changes
   */
  getRugIdStatusHistory: (rugId) => get(`/public/rugid/${rugId}/history`),
};
