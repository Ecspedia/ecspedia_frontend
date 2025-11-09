'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// TODO: Restore User import when userService is restored
// import { User } from '@/types';
// TODO: Restore userService - File was moved/deleted
// import { userService } from '../api/userService';

export default function Register() {
  const _router = useRouter();
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Errores por campo
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errores
    setUsernameError('');
    setEmailError('');
    setPasswordError('');

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
      // TODO: Restore userService.createUser when userService is restored
      // const user: User = { username, email, password };
      // await userService.createUser(user);
      // router.push('/login');
      throw new Error('userService not available - service file was moved/deleted');
    } catch (error) {
      throw error;
    }
    setLoading(false);
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
