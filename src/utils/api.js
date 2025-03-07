
/**
 * Utility functions for API requests
 */
import { authService } from '../services/authService';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.unmask.io'; // Replace with your actual API URL

/**
 * Generic fetch wrapper with error handling
 */
async function fetchWithAuth(endpoint, options = {}) {
  try {
    // Add auth token if available
    const token = authService.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Check if there was a network error
    if (!response) {
      throw new Error('Network error - unable to connect to server');
    }

    if (response.status === 401) {
      // Handle unauthorized (token expired, etc.)
      // Try to refresh token once
      const refreshed = await authService.refreshToken();
      if (refreshed) {
        // Retry the request with new token
        return fetchWithAuth(endpoint, options);
      } else {
        // If refresh failed, clear auth and redirect
        authService.clearAuthData();
        window.location.href = '/login?session=expired';
        throw new Error('Authentication expired. Please login again.');
      }
    }

    if (response.status === 403) {
      // Handle forbidden
      throw new Error('You do not have permission to access this resource');
    }

    if (!response.ok) {
      let errorMessage = `API error: ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If parsing JSON fails, use default error message
      }
      
      throw new Error(errorMessage);
    }

    // If response status is 204 No Content
    if (response.status === 204) {
      return null;
    }

    // Parse JSON response
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // Handle non-JSON responses
      return await response.text();
    }
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Adds retry functionality to API requests
 */
async function fetchWithRetry(endpoint, options = {}, retries = 3, backoff = 300) {
  try {
    return await fetchWithAuth(endpoint, options);
  } catch (error) {
    if (retries <= 1) throw error;
    
    // Wait for backoff milliseconds
    await new Promise(resolve => setTimeout(resolve, backoff));
    
    // Retry the request with an exponential backoff
    return fetchWithRetry(
      endpoint, 
      options,
      retries - 1, 
      backoff * 2
    );
  }
}

/**
 * GET request helper
 */
export const get = (endpoint, retries = 3) => fetchWithRetry(endpoint, {}, retries);

/**
 * POST request helper
 */
export const post = (endpoint, data, retries = 3) => 
  fetchWithRetry(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }, retries);

/**
 * PUT request helper
 */
export const put = (endpoint, data, retries = 3) =>
  fetchWithRetry(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, retries);

/**
 * DELETE request helper
 */
export const del = (endpoint, retries = 3) =>
  fetchWithRetry(endpoint, {
    method: 'DELETE',
  }, retries);

/**
 * Handle offline status and reconnection
 */
export const setupOfflineDetection = () => {
  window.addEventListener('online', () => {
    console.log('Back online');
    // Refresh data or notify components to refresh
    window.dispatchEvent(new CustomEvent('app:online'));
  });

  window.addEventListener('offline', () => {
    console.log('Went offline');
    // Notify user they're offline
    window.dispatchEvent(new CustomEvent('app:offline'));
  });
};

// Initialize offline detection
setupOfflineDetection();
