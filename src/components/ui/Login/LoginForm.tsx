"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Errores por campo
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errores
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    let hasError = false;

    // Validación
    if (!email) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setGeneralError(err.message);
      } else {
        setGeneralError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="justify-items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm relative"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">Sign in</h2>

        {/* Email */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring ${
              emailError ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@example.com"
          />
          {emailError && (
            <span className="absolute right-0 top-full mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded-lg shadow-lg">
              {emailError}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring ${
              passwordError ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          {passwordError && (
            <span className="absolute right-0 top-full mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded-lg shadow-lg">
              {passwordError}
            </span>
          )}
        </div>

        {/* Error general (backend) */}
        {generalError && (
          <div className="flex justify-center mb-4">
            <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg shadow-lg">
              {generalError}
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-secondary hover:bg-blue-700 text-white rounded-full py-2 transition"
        >
          {loading ? "Signing in..." : "Continue"}
        </button>

        {/* Enlace para registrarse */}
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/Registro"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </a>
        </div>
      </form>
    </div>
  );
}
