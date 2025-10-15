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
 * API timeout in milliseconds
 */
export const API_TIMEOUT = 30000; // 30 seconds

/**
 * API request retry configuration
 */
export const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

/**
 * Default headers for API requests
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};
