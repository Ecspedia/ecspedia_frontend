'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { paths } from '@/config/paths';
// TODO: Restore emailService - File was moved/deleted
// import { emailService } from '../api/emailServices';
// TODO: Restore AppError - File was moved/deleted
// import { AppError } from '@/lib/errors';
import { useMutation } from '@apollo/client/react';
import { RESET_PASSWORD_MUTATION } from '@/config/graphql/mutations';

interface ResetPasswordFormProps {
  token: string;
  email?: string;
}

export default function ResetPasswordForm({ token, email = '' }: ResetPasswordFormProps) {
  const router = useRouter();
  const [emailField, setEmailField] = useState(email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [generalError, setGeneralError] = useState('');

  const [resetPasswordMutation] = useMutation(RESET_PASSWORD_MUTATION);

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
      const result = await resetPasswordMutation({
        variables: {
          email: emailField,
          token,
          newPassword: password,
        },
      });

      if (result.data && typeof result.data === 'object' && 'resetPassword' in result.data) {
        const response = result.data.resetPassword as { success: boolean; message: string };
        if (response.success) {
          setSuccessMessage('Password reset successfully! Redirecting to login...');
          // Redirect to login after a short delay to show success message
          setTimeout(() => {
            router.push(`/login?email=${encodeURIComponent(emailField)}`);
          }, 1500);
        } else {
          setGeneralError(response.message || 'Failed to reset password');
        }
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (err: unknown) {
      // Handle GraphQL errors
      if (err && typeof err === 'object' && 'graphQLErrors' in err) {
        const graphQLError = err as { graphQLErrors: Array<{ message: string }> };
        const errorMessage =
          graphQLError.graphQLErrors?.[0]?.message || 'Failed to reset password';
        setGeneralError(errorMessage);
      } else if (err instanceof Error) {
        setGeneralError(err.message || 'Failed to reset password');
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
        <h2 className="mb-6 text-center text-xl font-semibold">Reset Password</h2>

        <p className="mb-6 text-center text-sm text-overlay-secondary">
          Enter your email and new password below.
        </p>

        {/* Email */}
        <div className="relative mb-4">
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            className={`w-full rounded-lg border border-border bg-background text-primary px-3 py-2 focus:ring focus:outline-none placeholder:text-tertiary 
              ${emailError ? 'border-error focus:ring-error-light' : 'focus:ring-info-light'}
              ${email ? 'opacity-60 cursor-not-allowed' : ''}`}
            value={emailField}
            onChange={(e) => setEmailField(e.target.value)}
            placeholder="youremail@example.com"
            disabled={loading || !!email}
            readOnly={!!email}
          />
          {emailError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-error px-2 py-1 text-xs text-white shadow-lg">
              {emailError}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <label className="mb-1 block text-sm font-medium">New Password</label>
          <input
            type="password"
            className={`w-full rounded-lg border border-border bg-background text-primary px-3 py-2 focus:ring focus:outline-none placeholder:text-tertiary 
              ${passwordError ? 'border-error focus:ring-error-light' : 'focus:ring-info-light'
              }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
          />
          {passwordError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-error px-2 py-1 text-xs text-white shadow-lg">
              {passwordError}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative mb-4">
          <label className="mb-1 block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            className={`w-full rounded-lg border border-border bg-background text-primary px-3 py-2 focus:ring focus:outline-none placeholder:text-tertiary 
              ${confirmPasswordError ? 'border-error focus:ring-error-light' : 'focus:ring-info-light'
              }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
          />
          {confirmPasswordError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-error px-2 py-1 text-xs text-white shadow-lg">
              {confirmPasswordError}
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
          {loading ? 'Resetting...' : 'Reset Password'}
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
