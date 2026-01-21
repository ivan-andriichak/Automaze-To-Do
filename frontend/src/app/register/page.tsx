'use client';

import React, { useState } from 'react';
import { register } from '@/api/authApi';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: loginFn } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(email, password);
      loginFn(res.accessToken, res.user);
      router.replace('/');
      // @ts-expect-error: err type may not have message property
    } catch (err: never) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl mb-4 font-bold text-center">Register</h2>
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
          Register
        </button>
        <div className="mt-3 text-center">
          <a href="/login/page" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
