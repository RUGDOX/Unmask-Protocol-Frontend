
/**
 * Utility functions for API requests
 */

const API_BASE_URL = 'https://api.unmask.io'; // Replace with your actual API URL

/**
 * Generic fetch wrapper with error handling
 */
async function fetchWithAuth(endpoint, options = {}) {
  try {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * GET request helper
 */
export const get = (endpoint) => fetchWithAuth(endpoint);

/**
 * POST request helper
 */
export const post = (endpoint, data) => 
  fetchWithAuth(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });

/**
 * PUT request helper
 */
export const put = (endpoint, data) =>
  fetchWithAuth(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

/**
 * DELETE request helper
 */
export const del = (endpoint) =>
  fetchWithAuth(endpoint, {
    method: 'DELETE',
  });
