
// Base API utility using mock data instead of real API calls

// Simulate API delay
const simulateDelay = (min = 300, max = 800) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Mock data generator functions
const generateMockReports = () => {
  return [
    { 
      id: '1', 
      title: 'Suspicious Contract Activity', 
      description: 'Contract is draining funds unexpectedly',
      status: 'open',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    { 
      id: '2', 
      title: 'Fake Token Website', 
      description: 'Website mimicking popular token to steal funds',
      status: 'investigating',
      createdAt: new Date(Date.now() - 7200000).toISOString()
    },
    { 
      id: '3', 
      title: 'Phishing Attempt', 
      description: 'Discord account hijacking to steal wallet access',
      status: 'closed',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];
};

const generateMockInvestigations = () => {
  return [
    {
      id: '1',
      title: 'NFT Rug Pull Investigation',
      status: 'active',
      assignedTo: '2',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '2',
      title: 'Token Contract Security Audit',
      status: 'pending',
      assignedTo: null,
      createdAt: new Date(Date.now() - 172800000).toISOString()
    }
  ];
};

/**
 * Mock implementation for GET requests
 */
export async function get(endpoint, options = {}) {
  console.log(`MOCK GET: ${endpoint}`, options);
  await simulateDelay();
  
  // Return different mock data based on endpoint
  if (endpoint.includes('/reports')) {
    return { success: true, data: generateMockReports() };
  } else if (endpoint.includes('/investigations')) {
    return { success: true, data: generateMockInvestigations() };
  }
  
  return { success: true, data: [], message: "This is mock data. No actual API call was made." };
}

/**
 * Mock implementation for POST requests
 */
export async function post(endpoint, data, options = {}) {
  console.log(`MOCK POST: ${endpoint}`, data, options);
  await simulateDelay();
  return { 
    success: true, 
    id: "mock-id-" + Date.now(), 
    data,
    message: "This is mock data. No actual API call was made." 
  };
}

/**
 * Mock implementation for PUT requests
 */
export async function put(endpoint, data, options = {}) {
  console.log(`MOCK PUT: ${endpoint}`, data, options);
  await simulateDelay();
  return { 
    success: true, 
    data,
    message: "This is mock data. No actual API call was made." 
  };
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
  return { 
    success: true, 
    data,
    message: "This is mock data. No actual API call was made." 
  };
}
