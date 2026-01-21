'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthState {
  user: { email: string } | null;
  accessToken: string | null;
}

interface AuthContextType extends AuthState {
  login: (token: string, user: never) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userRaw = localStorage.getItem('user');
    if (token) setAccessToken(token);
    if (userRaw) setUser(JSON.parse(userRaw));
  }, []);

  const login = (token: string, user: never) => {
    setAccessToken(token);
    setUser(user);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
