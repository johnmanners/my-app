// src/utils/api.js

const BASE_URL = 'https://django.cliste.ie';

// Utility to build final URLs
function buildUrl(endpoint) {
  return `${BASE_URL}${endpoint}`;
}

// Standard error handler (customize as needed)
async function handleResponse(res) {
  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    // Error normalization
    const error = new Error(data?.detail || data?.message || res.statusText);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

// Send any HTTP request
export async function apiRequest(endpoint, method = 'GET', data, config = {}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // ...optionally add auth tokens or other headers here
      ...(config.headers || {}),
    },
    ...config,
  };
  if (data) options.body = JSON.stringify(data);

  const res = await fetch(buildUrl(endpoint), options);
  return handleResponse(res);
}

// Convenience POST shortcut
export function postToAPI(endpoint, data, config) {
  return apiRequest(endpoint, 'POST', data, config);
}

// Add more shortcuts as needed:
export function getFromAPI(endpoint, config) {
  return apiRequest(endpoint, 'GET', undefined, config);
}

export function putToAPI(endpoint, data, config) {
  return apiRequest(endpoint, 'PUT', data, config);
}

export function deleteFromAPI(endpoint, config) {
  return apiRequest(endpoint, 'DELETE', undefined, config);
}
