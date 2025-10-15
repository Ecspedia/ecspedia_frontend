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
import { getApiBaseUrl, API_TIMEOUT, DEFAULT_HEADERS } from './config';

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
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: API_TIMEOUT,
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
        console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`);
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

/**
 * Retry logic for failed requests
 * Currently not in use but available for future implementation
 */
// const retryRequest = async (
//   client: AxiosInstance,
//   config: AxiosRequestConfig,
//   retryCount: number = 0
// ): Promise<AxiosResponse> => {
//   try {
//     return await client.request(config);
//   } catch (error) {
//     if (retryCount >= RETRY_CONFIG.maxRetries) {
//       throw error;
//     }

//     if (AppError.isAppError(error) && RETRY_CONFIG.retryableStatuses.includes(error.statusCode)) {
//       // Wait before retrying
//       await new Promise((resolve) => setTimeout(resolve, RETRY_CONFIG.retryDelay * (retryCount + 1)));
//       return retryRequest(client, config, retryCount + 1);
//     }

//     throw error;
//   }
// };

// Create the API client instance
const apiClient = createApiClient();

/**
 * Export the configured API client
 */
export default apiClient;

/**
 * Export helper methods for common HTTP operations
 */
export const api = {
  /**
   * GET request
   */
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.get<T>(url, config).then((response) => response.data);
  },

  /**
   * POST request
   */
  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.post<T>(url, data, config).then((response) => response.data);
  },

  /**
   * PUT request
   */
  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.put<T>(url, data, config).then((response) => response.data);
  },

  /**
   * PATCH request
   */
  patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.patch<T>(url, data, config).then((response) => response.data);
  },

  /**
   * DELETE request
   */
  delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
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
