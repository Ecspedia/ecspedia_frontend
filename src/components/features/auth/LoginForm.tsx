'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Errores por campo
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errores
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    let hasError = false;

    // Validación
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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      router.push('/dashboard');
    } catch (err: unknown) {
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
    <div className="flex justify-center ">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm rounded-xl border border-border p-6 shadow-md bg-overlay"
      >
        <h2 className="mb-6 text-center text-xl font-semibold text-primary">Sign in</h2>

        {/* Email */}
        <div className="relative mb-4">
          <label className="mb-1 block text-sm font-medium text-primary">Email</label>
          <input
            type="email"
            className={`w-full rounded-lg border border-border bg-background text-primary px-3 py-2 focus:ring focus:outline-none placeholder:text-tertiary ${emailError ? 'border-error focus:ring-error-light' : 'focus:ring-info-light'
              }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@example.com"
          />
          {emailError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-error px-2 py-1 text-xs text-white shadow-lg">
              {emailError}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-1">
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

        {/* Forgot Password Link */}
        <div className="mb-6 text-right">
          <Link href="/forgot-password" className="text-sm text-brand-secondary hover:underline">
            Forgot your password?
          </Link>
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
          {loading ? 'Signing in...' : 'Continue'}
        </button>

        {/* Enlace para registrarse */}
        <div className="mt-4 text-center text-sm text-primary">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-brand-secondary hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
