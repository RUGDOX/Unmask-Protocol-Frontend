
import { get, post, put } from '../utils/api';

export const agentsService = {
  /**
   * Get all agents
   */
  getAgents: () => get('/agents'),
  
  /**
   * Get agent by ID
   */
  getAgentById: (id) => get(`/agents/${id}`),
  
  /**
   * Verify agent credentials
   */
  verifyAgentCredentials: (credentials) => 
    post('/agents/verify', credentials),
  
  /**
   * Assign an investigation to an agent
   */
  assignInvestigation: (agentId, investigationId) => 
    put(`/agents/${agentId}/assign`, { investigationId }),
  
  /**
   * Get investigations assigned to an agent
   */
  getAssignedInvestigations: (agentId) => 
    get(`/agents/${agentId}/investigations`),
  
  /**
   * Agent sign-off on investigation
   */
  signOffInvestigation: (agentId, investigationId, verificationData) => 
    post(`/agents/${agentId}/signoff/${investigationId}`, verificationData),
  
  /**
   * Final verification by second agent or admin
   */
  finalVerification: (agentId, investigationId, finalVerificationData) => 
    post(`/agents/${agentId}/final-verify/${investigationId}`, finalVerificationData),
  
  /**
   * Agent login
   */
  login: (credentials) => post('/agents/login', credentials),
};
