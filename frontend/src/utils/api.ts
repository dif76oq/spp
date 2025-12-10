const DEFAULT_API_BASE_URL = 'http://localhost:8080/api';

const stripTrailingSlash = (url: string) => url.replace(/\/+$/, '');

const rawApiUrl = stripTrailingSlash(import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL);
const normalizedApiUrl = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

export const API_BASE_URL = normalizedApiUrl;
export const BASE_URL = normalizedApiUrl.endsWith('/api')
  ? normalizedApiUrl.slice(0, -4)
  : normalizedApiUrl;

export const jsonHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

