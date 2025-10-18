/**
 * API Configuration
 * Centralized configuration for API requests
 */

/**
 * Get the base URL for API requests
 */
export const getApiBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    console.warn('NEXT_PUBLIC_API_BASE_URL is not defined, using default');
    return 'http://localhost:8080/api';
  }

  return baseUrl;
};

/**
 * Default headers for API requests
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
