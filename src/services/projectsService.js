
import { get, post, put, del } from '../utils/api';

export const projectsService = {
  /**
   * Register a new project to get a RugID
   */
  registerProject: async (projectData) => {
    try {
      return await post('/projects/register', projectData);
    } catch (error) {
      console.error('Failed to register project:', error);
      throw error;
    }
  },
  
  /**
   * Get all registered projects 
   */
  getProjects: async () => {
    try {
      return await get('/projects');
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  },
  
  /**
   * Get project by ID
   */
  getProjectById: async (id) => {
    try {
      return await get(`/projects/${id}`);
    } catch (error) {
      console.error(`Failed to fetch project ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Get projects by owner ID
   */
  getProjectsByOwner: async (ownerId) => {
    try {
      return await get(`/projects/owner/${ownerId}`);
    } catch (error) {
      console.error(`Failed to fetch projects for owner ${ownerId}:`, error);
      throw error;
    }
  },
  
  /**
   * Verify project owner's identity
   */
  verifyProjectOwner: async (ownerId, verificationData) => {
    try {
      return await post(`/projects/verify-owner/${ownerId}`, verificationData);
    } catch (error) {
      console.error(`Failed to verify owner ${ownerId}:`, error);
      throw error;
    }
  },
  
  /**
   * Check if owner is eligible for RugID
   * (no existing RugID or blacklist records)
   */
  checkOwnerEligibility: async (identityData) => {
    try {
      return await post('/projects/check-eligibility', identityData);
    } catch (error) {
      console.error('Failed to check eligibility:', error);
      throw error;
    }
  },
  
  /**
   * Update project status
   */
  updateProjectStatus: async (projectId, status) => {
    try {
      return await put(`/projects/${projectId}/status`, { status });
    } catch (error) {
      console.error(`Failed to update project ${projectId} status:`, error);
      throw error;
    }
  },
    
  /**
   * Generate a secure RugID based on user data
   * The RugID follows the format: RID-XX00XX00XX00
   * and is derived from user's Web3 data and PII
   */
  generateRugId: async (userData) => {
    try {
      return await post('/projects/generate-rugid', userData);
    } catch (error) {
      console.error('Failed to generate RugID:', error);
      throw error;
    }
  },
    
  /**
   * Store user PII in secure data vault with dead man's switch
   */
  securelyStorePII: async (userId, piiData) => {
    try {
      return await post(`/projects/secure-pii/${userId}`, piiData);
    } catch (error) {
      console.error(`Failed to store PII for user ${userId}:`, error);
      throw error;
    }
  },
    
  /**
   * Get minimal project info by RugID (public info only)
   */
  getProjectByRugId: async (rugId) => {
    try {
      return await get(`/projects/rid/${rugId}`);
    } catch (error) {
      console.error(`Failed to fetch project by RugID ${rugId}:`, error);
      throw error;
    }
  },
    
  /**
   * Assign investigation to unmask agent
   */
  assignInvestigationToAgent: async (rugId, agentId) => {
    try {
      return await post(`/projects/rid/${rugId}/assign-investigation`, { agentId });
    } catch (error) {
      console.error(`Failed to assign investigation for RugID ${rugId} to agent ${agentId}:`, error);
      throw error;
    }
  },
    
  /**
   * Get a project's investigation history
   */
  getProjectInvestigationHistory: async (rugId) => {
    try {
      return await get(`/projects/rid/${rugId}/investigations`);
    } catch (error) {
      console.error(`Failed to fetch investigation history for RugID ${rugId}:`, error);
      throw error;
    }
  },
    
  /**
   * Update the public status of a RugID
   * Only updates the public-facing status in the public datatable
   */
  updatePublicRugIdStatus: async (rugId, statusData) => {
    try {
      return await put(`/projects/rid/${rugId}/public-status`, statusData);
    } catch (error) {
      console.error(`Failed to update public status for RugID ${rugId}:`, error);
      throw error;
    }
  },
    
  /**
   * Get a project's secure vault contents
   * Requires special admin or agent permissions and 
   * generates an audit log entry
   */
  getSecureVaultContents: async (rugId, requestData) => {
    try {
      return await post(`/projects/rid/${rugId}/secure-vault`, requestData);
    } catch (error) {
      console.error(`Failed to access secure vault for RugID ${rugId}:`, error);
      throw error;
    }
  },
    
  /**
   * Log access to sensitive project data
   * Used for audit trail purposes
   */
  logDataAccess: async (rugId, accessData) => {
    try {
      return await post(`/projects/rid/${rugId}/access-log`, accessData);
    } catch (error) {
      console.error(`Failed to log data access for RugID ${rugId}:`, error);
      throw error;
    }
  },
  
  /**
   * Delete a project
   */
  deleteProject: async (projectId) => {
    try {
      return await del(`/projects/${projectId}`);
    } catch (error) {
      console.error(`Failed to delete project ${projectId}:`, error);
      throw error;
    }
  },
  
  /**
   * Update project details
   */
  updateProject: async (projectId, data) => {
    try {
      return await put(`/projects/${projectId}`, data);
    } catch (error) {
      console.error(`Failed to update project ${projectId}:`, error);
      throw error;
    }
  }
};
