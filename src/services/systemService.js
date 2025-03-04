
import { get, post } from '../utils/api';

export const systemService = {
  /**
   * Get system status
   */
  getSystemStatus: () => get('/system/status'),
  
  /**
   * Restart the system
   */
  restartSystem: () => post('/system/restart', {}),
  
  /**
   * Generate system report
   */
  generateReport: () => post('/system/report', {}),
  
  /**
   * Get system logs
   */
  getSystemLogs: () => get('/system/logs'),
  
  /**
   * Update system configuration
   */
  updateConfig: (configData) => post('/system/config', configData),
  
  /**
   * Update security settings
   */
  updateSecuritySettings: (securityData) => post('/system/security', securityData),
  
  /**
   * Sync blockchain data
   */
  syncBlockchain: () => post('/system/blockchain/sync', {}),
};
