'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client/react';
import { REGISTER_USER_MUTATION } from '@/config/graphql/global.mutations';

export default function Register() {
  const router = useRouter();
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Errores por campo
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const [registerMutation] = useMutation(REGISTER_USER_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errores
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    // Validación
    let hasError = false;

    if (!username) {
      setUsernameError('Username is required.');
      hasError = true;
    } else if (username.length < 3 || username.length > 50) {
      setUsernameError('Username must be 3-50 characters.');
      hasError = true;
    }

    if (!email) {
      setEmailError('Email is required.');
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
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

    if (hasError) return;

    setLoading(true);

    try {
      const result = await registerMutation({
        variables: {
          userRegistrationDto: {
            username,
            email,
            password,
          },
        },
      });

      if (result.data && typeof result.data === 'object' && 'registerUser' in result.data) {
        // Registration successful, redirect to login
        router.push('/login');
      } else {
        throw new Error('Registration failed');
      }
    } catch (err: unknown) {
      // Handle GraphQL errors
      if (err && typeof err === 'object' && 'graphQLErrors' in err) {
        const graphQLError = err as { graphQLErrors: Array<{ message: string }> };
        const errorMessage =
          graphQLError.graphQLErrors?.[0]?.message || 'Registration failed';
        setGeneralError(errorMessage);
      } else if (err instanceof Error) {
        setGeneralError(err.message || 'Registration failed');
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
        className="relative w-full max-w-sm rounded-xl border border-border p-6 shadow-md bg-overlay"
      >
        <h2 className="mb-6 text-center text-xl font-semibold text-primary">Register</h2>

        {/* Username */}
        <div className="relative mb-4">
          <label className="mb-1 block text-sm font-medium text-primary">Name</label>
          <input
            type="text"
            className={`w-full rounded-lg border border-border bg-background text-primary px-3 py-2 focus:ring focus:outline-none placeholder:text-tertiary ${usernameError ? 'border-error focus:ring-error-light' : 'focus:ring-info-light'
              }`}
            value={username}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jorge Bejarano"
          />
          {usernameError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-error px-2 py-1 text-xs text-white shadow-lg">
              {usernameError}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <label className="mb-1 block text-sm font-medium text-primary">Email</label>
          <input
            type="email"
            className={`w-full rounded-lg border border-border bg-background text-primary px-3 py-2 focus:ring focus:outline-none placeholder:text-tertiary ${emailError ? 'border-error focus:ring-error-light' : 'focus:ring-info-light'
              }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. tuemailbakan@gmail.com"
          />
          {emailError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-error px-2 py-1 text-xs text-white shadow-lg">
              {emailError}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <label className="mb-1 block text-sm font-medium text-primary">Password</label>
          <input
            type="password"
            className={`w-full rounded-lg border border-border bg-background text-primary px-3 py-2 focus:ring focus:outline-none placeholder:text-tertiary ${passwordError ? 'border-error focus:ring-error-light' : 'focus:ring-info-light'
              }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          {passwordError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-error px-2 py-1 text-xs text-white shadow-lg">
              {passwordError}
            </span>
          )}
        </div>

        {/* Error general (backend) */}
        {generalError && (
          <div className="mb-4 flex justify-center">
            <span className="rounded-lg bg-error px-3 py-1 text-sm text-white shadow-lg">
              {generalError}
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-brand-secondary w-full rounded-full py-2 text-white transition hover:bg-info-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating user...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
