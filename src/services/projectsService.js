
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
};
