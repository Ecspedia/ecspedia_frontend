'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { emailService } from '@/services/emailServices';
import { AppError } from '@/lib/errors';
import { cn } from '@/lib/utils';

interface ResetPasswordFormProps {
  token: string;
  email?: string;
}

export default function ResetPasswordForm({ token, email }: ResetPasswordFormProps) {
  const [emailField, setEmailField] = useState(email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors and messages
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setSuccessMessage('');
    setGeneralError('');

    let hasError = false;

    // Validation
    if (!emailField) {
      setEmailError('Email is required.');
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(emailField)) {
      setEmailError('Invalid email format.');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password.');
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const response = await emailService.resetPassword(emailField, token, password);

      if (response.success) {
        setSuccessMessage('Password reset successfully! You can now sign in with your new password.');
      } else {
        setGeneralError(response.message || 'Failed to reset password');
      }
    } catch (err: unknown) {
      if (AppError.isAppError(err)) {
        setGeneralError(err.message);
      } else if (err instanceof Error) {
        setGeneralError(err.message);
      } else {
        setGeneralError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className={cn("relative w-full max-w-sm rounded-xl p-6 shadow-md bg-overlay")}
      >
        <h2 className="mb-6 text-center text-xl font-semibold">Reset Password</h2>

        <p className="mb-6 text-center text-sm text-gray-600">
          Enter your email and new password below.
        </p>

        {/* Email */}
        <div className="relative mb-4">
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            className={`w-full rounded-lg border px-3 py-2 focus:ring focus:outline-none ${emailError ? 'border-primary focus:ring-primary' : 'focus:ring-primary'
              }`}
            value={emailField}
            onChange={(e) => setEmailField(e.target.value)}
            placeholder="youremail@example.com"
            disabled={loading || !!email}
          />
          {emailError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-primary px-2 py-1 text-xs text-white shadow-lg">
              {emailError}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <label className="mb-1 block text-sm font-medium">New Password</label>
          <input
            type="password"
            className={`w-full rounded-lg border px-3 py-2 focus:ring focus:outline-none ${passwordError ? 'border-primary focus:ring-primary' : 'focus:ring-primary'
              }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
          />
          {passwordError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-primary px-2 py-1 text-xs text-white shadow-lg">
              {passwordError}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative mb-4">
          <label className="mb-1 block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            className={`w-full rounded-lg border px-3 py-2 focus:ring focus:outline-none ${confirmPasswordError ? 'border-primary focus:ring-primary' : 'focus:ring-primary'
              }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
          />
          {confirmPasswordError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-primary px-2 py-1 text-xs text-white shadow-lg">
              {confirmPasswordError}
            </span>
          )}
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="mb-4 flex justify-center">
            <span className="rounded-lg bg-secondary px-3 py-1 text-sm text-white shadow-lg">
              {successMessage}
            </span>
          </div>
        )}

        {/* Error general (backend) */}
        {generalError && (
          <div className="mb-4 flex justify-center">
            <span className="rounded-lg bg-primary px-3 py-1 text-sm text-white shadow-lg">
              {generalError}
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-secondary w-full rounded-full py-2 text-white transition hover:bg-primary disabled:opacity-50"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        {/* Back to login link */}
        <div className="mt-4 text-center text-sm">
          Remember your password?{' '}
          <Link href="/login" className="font-medium text-secondary hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
