'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { paths } from '@/config/paths';
// TODO: Restore emailService - File was moved/deleted
// import { emailService } from '../api/emailServices';
// TODO: Restore AppError - File was moved/deleted
// import { AppError } from '@/lib/errors';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors and messages
    setEmailError('');
    setSuccessMessage('');
    setGeneralError('');

    let hasError = false;

    // Validation
    if (!email) {
      setEmailError('Email is required.');
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format.');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      // TODO: Restore emailService.sendPasswordReset when emailService is restored
      // const response = await emailService.sendPasswordReset(email);
      // if (response.success) {
      //   setSuccessMessage('Password reset email sent! Check your inbox.');
      // } else {
      //   setGeneralError(response.message || 'Failed to send reset email');
      // }
      throw new Error('emailService not available - service file was moved/deleted');
    } catch (err: unknown) {
      // TODO: Restore AppError.isAppError check when AppError is restored
      // if (AppError.isAppError(err)) {
      //   setGeneralError(err.message);
      // } else
      if (err instanceof Error) {
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
        className="relative w-full max-w-sm rounded-xl bg-overlay p-6 shadow-md"
      >
        <h2 className="mb-6 text-center text-xl font-semibold">Forgot Password</h2>

        <p className="mb-6 text-center text-sm text-overlay-secondary">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        {/* Email */}
        <div className="relative mb-4">
          <label className="mb-1 block text-sm font-medium text-primary">Email</label>
          <input
            type="email"
            className={`w-full rounded-lg border border-border bg-background text-primary px-3 py-2 focus:ring focus:outline-none placeholder:text-tertiary 
              ${emailError ? 'border-error focus:ring-error-light' : 'focus:ring-info-light'
              }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@example.com"
            disabled={loading}
          />
          {emailError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-error px-2 py-1 text-xs text-white shadow-lg">
              {emailError}
            </span>
          )}
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="mb-4 flex justify-center">
            <span className="rounded-lg bg-success px-3 py-1 text-sm text-white shadow-lg">
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
          className="bg-brand-secondary w-full rounded-full py-2 text-white transition hover:bg-info-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        {/* Back to login link */}
        <div className="mt-4 text-center text-sm text-primary">
          Remember your password?{' '}
          <Link href={paths.login.getHref()} className="font-medium text-brand-secondary hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
