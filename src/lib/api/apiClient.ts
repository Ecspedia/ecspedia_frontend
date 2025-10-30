import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  AppError,
  NetworkError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ServerError,
  ValidationError,
} from '@/lib/errors/AppError';
import { getApiBaseUrl, DEFAULT_HEADERS } from './config';

/**
 * API Error Response structure
 */
interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
  code?: string;
}

/**
 * Create and configure the axios instance
 * @deprecated Use Apollo Client (@/lib/apollo-client) for GraphQL queries instead.
 * This API client is maintained only for legacy REST endpoints (auth, email).
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: getApiBaseUrl(),

    headers: DEFAULT_HEADERS,
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Add authentication token if available
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // Add request timestamp for debugging
      config.metadata = { startTime: new Date() };

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response time in development
      if (process.env.NODE_ENV === 'development' && response.config.metadata) {
        const endTime = new Date();
        const duration = endTime.getTime() - response.config.metadata.startTime.getTime();
        // eslint-disable-next-line no-console
        console.log(
          `[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`
        );
      }

      return response;
    },
    async (error: AxiosError<ApiErrorResponse>) => {
      return Promise.reject(handleApiError(error));
    }
  );

  return client;
};

/**
 * Handle API errors and convert to AppError instances
 */
const handleApiError = (error: AxiosError<ApiErrorResponse>): AppError => {
  // Network error (no response)
  if (!error.response) {
    return new NetworkError();
  }

  const { status, data } = error.response;
  const message = data?.message || error.message;

  // Handle specific status codes
  switch (status) {
    case 400:
      return new ValidationError(message, data?.errors);

    case 401:
      // Clear auth token on authentication error
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      return new AuthenticationError(message);

    case 403:
      return new AuthorizationError(message);

    case 404:
      return new NotFoundError(message);

    case 422:
      return new ValidationError(message, data?.errors);

    case 429:
      return new AppError('Too many requests. Please try again later.', 429, 'RATE_LIMIT');

    case 500:
    case 502:
    case 503:
    case 504:
      return new ServerError(message);

    default:
      return new AppError(message, status);
  }
};

// Create the API client instance
const apiClient = createApiClient();

/**
 * Export the configured API client
 * @deprecated Use Apollo Client (@/lib/apollo-client) for GraphQL queries instead.
 * This is maintained only for legacy REST endpoints (auth, email).
 */
export default apiClient;

/**
 * Export helper methods for common HTTP operations
 * @deprecated Use Apollo Client (@/lib/apollo-client) for GraphQL queries instead.
 * These methods are maintained only for legacy REST endpoints (auth, email).
 */
export const api = {
  /**
   * GET request
   * @deprecated Use Apollo Client with GraphQL queries instead
   */
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[DEPRECATED] api.get is deprecated. Use Apollo Client for GraphQL queries.');
    }
    return apiClient.get<T>(url, config).then((response) => response.data);
  },

  /**
   * POST request
   * @deprecated Use Apollo Client with GraphQL mutations instead (except for auth/email endpoints)
   */
  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    if (process.env.NODE_ENV === 'development' && !url.includes('/auth/')) {
      console.warn('[DEPRECATED] api.post is deprecated. Use Apollo Client for GraphQL mutations.');
    }
    return apiClient.post<T>(url, data, config).then((response) => response.data);
  },

  /**
   * PUT request
   * @deprecated Use Apollo Client with GraphQL mutations instead
   */
  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[DEPRECATED] api.put is deprecated. Use Apollo Client for GraphQL mutations.');
    }
    return apiClient.put<T>(url, data, config).then((response) => response.data);
  },

  /**
   * PATCH request
   * @deprecated Use Apollo Client with GraphQL mutations instead
   */
  patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[DEPRECATED] api.patch is deprecated. Use Apollo Client for GraphQL mutations.'
      );
    }
    return apiClient.patch<T>(url, data, config).then((response) => response.data);
  },

  /**
   * DELETE request
   * @deprecated Use Apollo Client with GraphQL mutations instead
   */
  delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[DEPRECATED] api.delete is deprecated. Use Apollo Client for GraphQL mutations.'
      );
    }
    return apiClient.delete<T>(url, config).then((response) => response.data);
  },
};

// Extend AxiosRequestConfig to include metadata
declare module 'axios' {
  export interface AxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
  }
}
