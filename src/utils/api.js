
// Base API utility using mock data instead of real API calls

// Simulate API delay
const simulateDelay = (min = 300, max = 800) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

/**
 * Mock implementation for GET requests
 */
export async function get(endpoint, options = {}) {
  console.log(`MOCK GET: ${endpoint}`, options);
  await simulateDelay();
  return { success: true, data: [], message: "This is mock data. No actual API call was made." };
}

/**
 * Mock implementation for POST requests
 */
export async function post(endpoint, data, options = {}) {
  console.log(`MOCK POST: ${endpoint}`, data, options);
  await simulateDelay();
  return { success: true, id: "mock-id-123", message: "This is mock data. No actual API call was made." };
}

/**
 * Mock implementation for PUT requests
 */
export async function put(endpoint, data, options = {}) {
  console.log(`MOCK PUT: ${endpoint}`, data, options);
  await simulateDelay();
  return { success: true, message: "This is mock data. No actual API call was made." };
}

/**
 * Mock implementation for DELETE requests
 */
export async function del(endpoint, options = {}) {
  console.log(`MOCK DELETE: ${endpoint}`, options);
  await simulateDelay();
  return { success: true, message: "This is mock data. No actual API call was made." };
}

/**
 * Mock implementation for PATCH requests
 */
export async function patch(endpoint, data, options = {}) {
  console.log(`MOCK PATCH: ${endpoint}`, data, options);
  await simulateDelay();
  return { success: true, message: "This is mock data. No actual API call was made." };
}
