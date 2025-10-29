import { api } from '@/lib/api';
import { AppError } from '@/lib/errors';

export interface PasswordResetResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const emailService = {
  /**
   * Send password reset email
   * @param email - User's email address
   * @param baseUrl - Base URL for the reset link (optional, defaults to current origin)
   * @returns Promise with success and message
   */
  sendPasswordReset: async (
    email: string,
    baseUrl?: string
  ): Promise<PasswordResetResponse> => {
    try {
      const url = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
      const params = new URLSearchParams({ email, baseUrl: url });

      const response = await api.post<PasswordResetResponse>(
        `/auth/forgot-password?${params.toString()}`
      );
      return response;
    } catch (error) {
      // Re-throw AppError instances and safeguard
      if (AppError.isAppError(error)) {
        throw error;
      }
      // Handle unexpected errors
      throw new AppError('Failed to send password reset email', 500, 'PASSWORD_RESET_ERROR');
    }
  },

  /**
   * Reset password with token
   * @param email - User's email address
   * @param token - Password reset token from email
   * @param newPassword - New password
   * @returns Promise with success and message
   */
  resetPassword: async (
    email: string,
    token: string,
    newPassword: string
  ): Promise<ResetPasswordResponse> => {
    try {
      const params = new URLSearchParams({ email, token, newPassword });
      
      const response = await api.post<ResetPasswordResponse>(
        `/auth/reset-password?${params.toString()}`
      );
      return response;
    } catch (error) {
      // Re-throw AppError instances and safeguard
      if (AppError.isAppError(error)) {
        throw error;
      }
      // Handle unexpected errors
      throw new AppError('Failed to reset password', 500, 'PASSWORD_RESET_ERROR');
    }
  },
};
