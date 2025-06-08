// src/lib/api.js

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Utility to build final URLs
function buildUrl(endpoint) {
  return endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;
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
export async function apiRequest(endpoint, method = "GET", data, config = {}) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
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
export const postToAPI = (endpoint, data, config) =>
  apiRequest(endpoint, "POST", data, config);

// Add more shortcuts as needed:
export const getFromAPI = (endpoint, config) =>
  apiRequest(endpoint, "GET", undefined, config);
export const putToAPI = (endpoint, data, config) =>
  apiRequest(endpoint, "PUT", data, config);
export const deleteFromAPI = (endpoint, config) =>
  apiRequest(endpoint, "DELETE", undefined, config);
