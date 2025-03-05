
import { get, post, put } from '../utils/api';

export const projectsService = {
  /**
   * Register a new project to get a RugID
   */
  registerProject: (projectData) => post('/projects/register', projectData),
  
  /**
   * Get all registered projects 
   */
  getProjects: () => get('/projects'),
  
  /**
   * Get project by ID
   */
  getProjectById: (id) => get(`/projects/${id}`),
  
  /**
   * Get projects by owner ID
   */
  getProjectsByOwner: (ownerId) => get(`/projects/owner/${ownerId}`),
  
  /**
   * Verify project owner's identity
   */
  verifyProjectOwner: (ownerId, verificationData) => 
    post(`/projects/verify-owner/${ownerId}`, verificationData),
  
  /**
   * Check if owner is eligible for RugID
   * (no existing RugID or blacklist records)
   */
  checkOwnerEligibility: (identityData) => 
    post('/projects/check-eligibility', identityData),
  
  /**
   * Update project status
   */
  updateProjectStatus: (projectId, status) => 
    put(`/projects/${projectId}/status`, { status }),
    
  /**
   * Generate a secure RugID based on user data
   * The RugID follows the format: RID-XX00XX00XX00
   * and is derived from user's Web3 data and PII
   */
  generateRugId: (userData) =>
    post('/projects/generate-rugid', userData),
    
  /**
   * Store user PII in secure data vault with dead man's switch
   */
  securelyStorePII: (userId, piiData) =>
    post(`/projects/secure-pii/${userId}`, piiData),
    
  /**
   * Get minimal project info by RugID (public info only)
   */
  getProjectByRugId: (rugId) =>
    get(`/projects/rid/${rugId}`),
};
