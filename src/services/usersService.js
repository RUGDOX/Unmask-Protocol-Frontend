
import { get, post, put, del } from '../utils/api';

export const usersService = {
  /**
   * Get all users
   */
  getUsers: () => get('/users'),
  
  /**
   * Get user by ID
   */
  getUserById: (id) => get(`/users/${id}`),
  
  /**
   * Create a new user
   */
  createUser: (userData) => post('/users', userData),
  
  /**
   * Update a user
   */
  updateUser: (id, userData) => put(`/users/${id}`, userData),
  
  /**
   * Delete a user
   */
  deleteUser: (id) => del(`/users/${id}`),
  
  /**
   * Verify a user
   */
  verifyUser: (id) => post(`/users/${id}/verify`, {}),
};
