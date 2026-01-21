'use client';

import React from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <button
      className="px-4 py-2 rounded bg-red-500 text-white"
      onClick={handleLogout}>
      Logout
    </button>
  );
}
