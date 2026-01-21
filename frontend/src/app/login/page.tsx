'use client';

import React, { useState } from 'react';
import { login } from '@/api/authApi';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: loginFn } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      loginFn(res.accessToken, res.user);
      router.replace('/');
    } catch (err: unknown) {
      setError(
        err instanceof Error && err.message ? err.message : 'Login failed',
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </button>
        <div className="mt-3 text-center">
          <a href="/register/page" className="text-blue-500 hover:underline">
            Register
          </a>
        </div>
      </form>
    </div>
  );
}
