// src/lib/endpoints.js

export const ENDPOINTS = {
  CONTACT: '/contact/',
  LOGIN: '/auth/login/',
  REGISTER: '/auth/register/',
  USER: '/user/',
  DEFAULT_CAT: '/api/posts/?catSlug=historic-buildings',
  CATEGORY: slug => `/api/posts/?catSlug=${slug}`,
};
