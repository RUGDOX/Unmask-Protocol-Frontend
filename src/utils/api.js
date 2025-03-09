
// Base API utility for making HTTP requests

// Get base URL from environment variable or default for development/production
const getBaseUrl = () => {
  // If explicitly set in environment, use that
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Fallback based on environment - this helps in both development and production
  return window.location.origin.includes('localhost') ? 
    'http://localhost:3000/api' : 
    `${window.location.origin}/api`;
};

// Add request timeout
const TIMEOUT_MS = 30000; // 30 seconds

// Create a promise that rejects after specified time
const timeoutPromise = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timed out after ${ms}ms`));
    }, ms);
  });
};

// Perform fetch with timeout
const fetchWithTimeout = (url, options) => {
  return Promise.race([
    fetch(url, options),
    timeoutPromise(TIMEOUT_MS)
  ]);
};

// Handle API response
const handleResponse = async (response) => {
  // Always parse the response, even for error responses
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  let data;
  try {
    data = isJson ? await response.json() : await response.text();
  } catch (e) {
    console.error('Failed to parse response:', e);
    // Return empty data rather than failing completely
    data = isJson ? {} : '';
  }
  
  // If the response isn't successful, throw an error
  if (!response.ok) {
    const error = {
      status: response.status,
      statusText: response.statusText,
      data: data,
    };
    console.error('API error:', error);
    throw error;
  }
  
  return data;
};

// Add authentication header if token exists
const getAuthHeader = () => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('auth_token'));
    if (tokenData && tokenData.value) {
      return { 'Authorization': `Bearer ${tokenData.value}` };
    }
  } catch (error) {
    console.error('Error reading auth token:', error);
  }
  return {};
};

/**
 * Generic function to make API requests
 */
async function request(endpoint, options = {}) {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${endpoint}`;
    
    // Default headers
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...options.headers,
    };
    
    const config = {
      ...options,
      headers,
    };
    
    // Log outgoing request (for development)
    if (import.meta.env.DEV) {
      console.log(`API ${options.method || 'GET'} request:`, url, config);
    }
    
    const response = await fetchWithTimeout(url, config);
    const data = await handleResponse(response);
    
    // Log response (for development)
    if (import.meta.env.DEV) {
      console.log(`API ${options.method || 'GET'} response:`, data);
    }
    
    return data;
  } catch (error) {
    // Enhanced error handling
    console.error('API request failed:', error);
    
    // If error occurred during fetch or parsing
    if (error.status === undefined) {
      throw {
        status: 0,
        statusText: 'Network Error',
        message: error.message || 'Failed to connect to the server',
        original: error,
      };
    }
    
    // If the server returned an error
    throw error;
  }
}

/**
 * GET request
 */
export async function get(endpoint, options = {}) {
  return request(endpoint, {
    ...options,
    method: 'GET',
  });
}

/**
 * POST request
 */
export async function post(endpoint, data, options = {}) {
  return request(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT request
 */
export async function put(endpoint, data, options = {}) {
  return request(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request
 */
export async function del(endpoint, options = {}) {
  return request(endpoint, {
    ...options,
    method: 'DELETE',
  });
}

/**
 * PATCH request
 */
export async function patch(endpoint, data, options = {}) {
  return request(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
