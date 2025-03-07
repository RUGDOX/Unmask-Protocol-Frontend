
import { get, post, put, del } from '../utils/api';

export const agentsService = {
  /**
   * Get all agents
   */
  getAgents: async () => {
    try {
      return await get('/agents');
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      throw error;
    }
  },
  
  /**
   * Get agent by ID
   */
  getAgentById: async (id) => {
    try {
      return await get(`/agents/${id}`);
    } catch (error) {
      console.error(`Failed to fetch agent ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Verify agent credentials
   */
  verifyAgentCredentials: async (credentials) => {
    try {
      return await post('/agents/verify', credentials);
    } catch (error) {
      console.error('Failed to verify agent credentials:', error);
      throw error;
    }
  },
  
  /**
   * Assign an investigation to an agent
   */
  assignInvestigation: async (agentId, investigationId) => {
    try {
      return await put(`/agents/${agentId}/assign`, { investigationId });
    } catch (error) {
      console.error(`Failed to assign investigation ${investigationId} to agent ${agentId}:`, error);
      throw error;
    }
  },
  
  /**
   * Get investigations assigned to an agent
   */
  getAssignedInvestigations: async (agentId) => {
    try {
      return await get(`/agents/${agentId}/investigations`);
    } catch (error) {
      console.error(`Failed to fetch investigations for agent ${agentId}:`, error);
      throw error;
    }
  },
  
  /**
   * Agent sign-off on investigation
   */
  signOffInvestigation: async (agentId, investigationId, verificationData) => {
    try {
      return await post(`/agents/${agentId}/signoff/${investigationId}`, verificationData);
    } catch (error) {
      console.error(`Failed to sign off investigation ${investigationId} by agent ${agentId}:`, error);
      throw error;
    }
  },
  
  /**
   * Final verification by second agent or admin
   */
  finalVerification: async (agentId, investigationId, finalVerificationData) => {
    try {
      return await post(`/agents/${agentId}/final-verify/${investigationId}`, finalVerificationData);
    } catch (error) {
      console.error(`Failed to submit final verification for investigation ${investigationId} by agent ${agentId}:`, error);
      throw error;
    }
  },
  
  /**
   * Agent login
   */
  login: async (credentials) => {
    try {
      const response = await post('/agents/login', credentials);
      if (response && response.token) {
        localStorage.setItem('agent_token', response.token);
        localStorage.setItem('agent_id', response.agentId);
        return response;
      }
      throw new Error('Invalid login response');
    } catch (error) {
      console.error('Agent login failed:', error);
      throw error;
    }
  },
  
  /**
   * Create new agent
   */
  createAgent: async (agentData) => {
    try {
      return await post('/agents', agentData);
    } catch (error) {
      console.error('Failed to create agent:', error);
      throw error;
    }
  },
  
  /**
   * Update agent details
   */
  updateAgent: async (agentId, data) => {
    try {
      return await put(`/agents/${agentId}`, data);
    } catch (error) {
      console.error(`Failed to update agent ${agentId}:`, error);
      throw error;
    }
  },
  
  /**
   * Delete agent
   */
  deleteAgent: async (agentId) => {
    try {
      return await del(`/agents/${agentId}`);
    } catch (error) {
      console.error(`Failed to delete agent ${agentId}:`, error);
      throw error;
    }
  },
  
  /**
   * Get agent activity logs
   */
  getAgentActivityLogs: async (agentId) => {
    try {
      return await get(`/agents/${agentId}/activity-logs`);
    } catch (error) {
      console.error(`Failed to fetch activity logs for agent ${agentId}:`, error);
      throw error;
    }
  }
};
