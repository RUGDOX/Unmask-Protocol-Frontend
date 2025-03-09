
// Simplified auth service without real backend connections

// Token refresh timing constants (not actually used in mock version)
const TOKEN_REFRESH_INTERVAL = 1000 * 60 * 14; // 14 minutes (assuming 15 min token lifespan)
const TOKEN_EXPIRY_THRESHOLD = 1000 * 60 * 1; // 1 minute before actual expiry

// Simplified mock authentication service
export const authService = {
  /**
   * Mock login - accepts any credentials
   */
  login: async (credentials) => {
    console.log('Mock login with credentials:', credentials);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Always succeed with mock data
    const response = {
      token: 'mock_jwt_token_' + Date.now(),
      expiresIn: 900, // 15 minutes
      id: credentials.username === 'admin' ? '1' : '2',
      role: credentials.username === 'admin' ? 'admin' : 'agent',
    };
    
    // Store auth data
    authService.saveAuthData(response);
    
    return response;
  },
  
  /**
   * Save authentication data to local storage
   */
  saveAuthData: (authData) => {
    if (!authData || !authData.token) return;
    
    // Store token with expiry time calculation
    const tokenData = {
      value: authData.token,
      expiry: Date.now() + (authData.expiresIn || 900) * 1000, // Default 15 minutes if not specified
    };
    
    localStorage.setItem('auth_token', JSON.stringify(tokenData));
    localStorage.setItem('user_role', authData.role);
    localStorage.setItem('user_id', authData.id);
  },
  
  /**
   * Get token if valid, otherwise return null
   */
  getToken: () => {
    try {
      const tokenData = JSON.parse(localStorage.getItem('auth_token'));
      
      if (!tokenData) return null;
      
      // Check if token is expired
      if (Date.now() > tokenData.expiry) {
        authService.clearAuthData();
        return null;
      }
      
      return tokenData.value;
    } catch (error) {
      console.error('Error retrieving token:', error);
      authService.clearAuthData();
      return null;
    }
  },
  
  /**
   * Setup automatic token refresh (simplified mock version)
   */
  setupTokenRefresh: () => {
    console.log('Mock token refresh setup (not actually doing anything)');
    // No actual token refresh in mock version
  },
  
  /**
   * Clear auth data from local storage
   */
  clearAuthData: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
  },
  
  /**
   * Mock logout 
   */
  logout: () => {
    console.log('Mock logout');
    authService.clearAuthData();
  },
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!authService.getToken();
  },
  
  /**
   * Get current user role
   */
  getUserRole: () => {
    return localStorage.getItem('user_role') || '';
  },
  
  /**
   * Check if current user has specific role
   */
  hasRole: (role) => {
    const userRole = localStorage.getItem('user_role');
    return userRole === role;
  },
  
  /**
   * Get current user ID
   */
  getUserId: () => {
    return localStorage.getItem('user_id');
  },
  
  /**
   * Get current user profile (mock)
   */
  getUserProfile: async () => {
    console.log('Mock get user profile');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock profile based on stored role
    const role = localStorage.getItem('user_role');
    const userId = localStorage.getItem('user_id');
    
    return {
      id: userId || '1',
      username: role === 'admin' ? 'admin_user' : 'agent_user',
      email: role === 'admin' ? 'admin@example.com' : 'agent@example.com',
      role: role || 'user',
      firstName: role === 'admin' ? 'Admin' : 'Agent',
      lastName: 'User',
      createdAt: new Date().toISOString(),
    };
  },
  
  /**
   * Mock refresh token
   */
  refreshToken: async () => {
    console.log('Mock token refresh');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Always succeed with mock data
    const response = {
      token: 'mock_refreshed_jwt_token_' + Date.now(),
      expiresIn: 900, // 15 minutes
      id: localStorage.getItem('user_id') || '1',
      role: localStorage.getItem('user_role') || 'user',
    };
    
    authService.saveAuthData(response);
    return true;
  }
};
