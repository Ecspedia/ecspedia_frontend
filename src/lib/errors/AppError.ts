/**
 * Custom application error class for structured error handling
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }

  /**
   * Check if error is an AppError instance
   */
  static isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
  }

  /**
   * Convert to JSON-serializable object
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
      details: this.details,
    };
  }
}

/**
 * Error for network/connectivity issues
 */
export class NetworkError extends AppError {
  constructor(message: string = 'Network error. Please check your connection.') {
    super(message, 0, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

/**
 * Error for authentication issues
 */
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed. Please log in again.') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

/**
 * Error for authorization issues
 */
export class AuthorizationError extends AppError {
  constructor(message: string = 'You do not have permission to access this resource.') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

/**
 * Error for resource not found
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'The requested resource was not found.') {
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

/**
 * Error for validation issues
 */
export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed.', details?: unknown) {
    super(message, 422, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

/**
 * Error for server issues
 */
export class ServerError extends AppError {
  constructor(message: string = 'Server error. Please try again later.') {
    super(message, 500, 'SERVER_ERROR');
    this.name = 'ServerError';
  }
}
