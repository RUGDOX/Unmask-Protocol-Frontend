
import { get, put } from '../utils/api';

export const modulesService = {
  /**
   * Get all system modules
   */
  getModules: () => get('/modules'),
  
  /**
   * Get module by ID
   */
  getModuleById: (id) => get(`/modules/${id}`),
  
  /**
   * Toggle module status (enable/disable)
   */
  toggleModule: (id, enabled) => put(`/modules/${id}`, { enabled }),
};
