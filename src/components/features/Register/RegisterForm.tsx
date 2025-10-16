'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { User } from '@/types/user';
import { userService } from '@/services/userService';

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
      const user: User = { username, email, password };
      const newUser = await userService.createUser(user);
      console.log(newUser);
      router.push('/Login');
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen justify-items-center">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-md"
      >
        <h2 className="mb-6 text-center text-xl font-semibold">Register</h2>

        {/* Username */}
        <div className="relative mb-4">
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            type="text"
            className={`w-full rounded-lg border px-3 py-2 focus:ring focus:outline-none ${
              usernameError ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
            }`}
            value={username}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jorge Bejarano"
          />
          {usernameError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-red-500 px-2 py-1 text-xs text-white shadow-lg">
              {usernameError}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            className={`w-full rounded-lg border px-3 py-2 focus:ring focus:outline-none ${
              emailError ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. youremail@example.com"
          />
          {emailError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-red-500 px-2 py-1 text-xs text-white shadow-lg">
              {emailError}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            className={`w-full rounded-lg border px-3 py-2 focus:ring focus:outline-none ${
              passwordError ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          {passwordError && (
            <span className="absolute top-full right-0 mt-1 rounded-lg bg-red-500 px-2 py-1 text-xs text-white shadow-lg">
              {passwordError}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-secondary w-full rounded-full py-2 text-white transition hover:bg-blue-700"
        >
          {loading ? 'Creating user...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
