
/**
 * Utility functions for API requests
 */
import { authService } from '../services/authService';

// Determine API base URL based on environment
// In production, this will use the environment variable set in Vercel
// In development, it falls back to the local development API or mock server
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
                    (import.meta.env.PROD ? 
                     'https://api.unmask.io' : 
                     'https://api.unmask.io');

// Simple in-memory cache
const apiCache = new Map();
const CACHE_DURATION = 60000; // 1 minute cache duration

/**
 * Generic fetch wrapper with error handling and caching
 */
async function fetchWithAuth(endpoint, options = {}, useCache = false) {
  // Check cache for GET requests if caching is enabled
  const cacheKey = `${options.method || 'GET'}-${endpoint}-${JSON.stringify(options.body || {})}`;
  
  if (useCache && (options.method === undefined || options.method === 'GET')) {
    const cachedResponse = apiCache.get(cacheKey);
    if (cachedResponse && Date.now() < cachedResponse.expiry) {
      console.log(`[API] Using cached response for ${endpoint}`);
      return cachedResponse.data;
    }
  }

  try {
    // Add performance mark for request start
    const perfMark = `api-${Date.now()}-${endpoint.replace(/\//g, '-')}`;
    performance.mark(`${perfMark}-start`);

    // Add auth token if available
    const token = authService.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    // Log API calls in development mode
    if (import.meta.env.DEV) {
      console.log(`[API] ${options.method || 'GET'} request to ${endpoint}`);
    }

    // In development mode, simulate API response for certain endpoints if no real API is available
    if (import.meta.env.DEV && !API_BASE_URL.includes('localhost') && !options.forceReal) {
      const mockResponse = await getMockResponse(endpoint, options.method || 'GET', options.body);
      if (mockResponse !== null) {
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay
        return mockResponse;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Add performance mark for request end and measure
    performance.mark(`${perfMark}-end`);
    performance.measure(`API Call to ${endpoint}`, `${perfMark}-start`, `${perfMark}-end`);
    
    // Log slow requests (over 1s)
    const measure = performance.getEntriesByName(`API Call to ${endpoint}`).pop();
    if (measure && measure.duration > 1000) {
      console.warn(`[API] Slow request to ${endpoint}: ${measure.duration.toFixed(2)}ms`);
    }

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
        return fetchWithAuth(endpoint, options, false); // Don't use cache for retry
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

    // Parse response based on content type
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Handle non-JSON responses
      data = await response.text();
    }

    // Cache the successful response for GET requests if caching is enabled
    if (useCache && (options.method === undefined || options.method === 'GET')) {
      apiCache.set(cacheKey, {
        data,
        expiry: Date.now() + CACHE_DURATION
      });
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Mock response function for development without a real API
 * This can be expanded to handle more endpoints as needed
 */
async function getMockResponse(endpoint, method, body) {
  // Only use mock responses in development
  if (!import.meta.env.DEV) return null;

  // Example mock responses
  if (endpoint === '/auth/profile' && method === 'GET') {
    return {
      username: localStorage.getItem('user_role') === 'admin' ? 'admin' : 'agent',
      email: localStorage.getItem('user_role') === 'admin' ? 'admin@unmask.io' : 'agent@unmask.io',
      firstName: localStorage.getItem('user_role') === 'admin' ? 'Admin' : 'Agent',
      lastName: 'User',
    };
  }

  // More mock endpoints can be added here as needed
  
  // Return null to indicate no mock available, should use real API
  return null;
}

/**
 * Adds retry functionality to API requests
 */
async function fetchWithRetry(endpoint, options = {}, useCache = false, retries = 3, backoff = 300) {
  try {
    return await fetchWithAuth(endpoint, options, useCache);
  } catch (error) {
    if (retries <= 1) throw error;
    
    // Wait for backoff milliseconds
    await new Promise(resolve => setTimeout(resolve, backoff));
    
    // Retry the request with an exponential backoff
    return fetchWithRetry(
      endpoint, 
      options,
      false, // Don't use cache for retries
      retries - 1, 
      backoff * 2
    );
  }
}

/**
 * Clear cache for specific endpoint or all cache if no endpoint provided
 */
function clearCache(endpoint = null) {
  if (endpoint) {
    // Clear specific endpoint cache entries
    for (const key of apiCache.keys()) {
      if (key.includes(endpoint)) {
        apiCache.delete(key);
      }
    }
  } else {
    // Clear entire cache
    apiCache.clear();
  }
}

/**
 * GET request helper with optional caching
 */
export const get = (endpoint, useCache = true, retries = 3) => 
  fetchWithRetry(endpoint, {}, useCache, retries);

/**
 * POST request helper
 */
export const post = (endpoint, data, retries = 3) => 
  fetchWithRetry(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }, false, retries);

/**
 * PUT request helper
 */
export const put = (endpoint, data, retries = 3) =>
  fetchWithRetry(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, false, retries);

/**
 * DELETE request helper
 */
export const del = (endpoint, retries = 3) =>
  fetchWithRetry(endpoint, {
    method: 'DELETE',
  }, false, retries);

/**
 * Handle offline status and reconnection
 */
export const setupOfflineDetection = () => {
  window.addEventListener('online', () => {
    console.log('Back online');
    // Refresh data or notify components to refresh
    window.dispatchEvent(new CustomEvent('app:online'));
    // Clear cache when coming back online to ensure fresh data
    clearCache();
  });

  window.addEventListener('offline', () => {
    console.log('Went offline');
    // Notify user they're offline
    window.dispatchEvent(new CustomEvent('app:offline'));
  });
};

// Initialize offline detection
setupOfflineDetection();

// Export cache utilities
export { clearCache };
