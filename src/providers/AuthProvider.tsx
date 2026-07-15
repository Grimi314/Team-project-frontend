'use client';

import { useEffect } from 'react';

import { getCurrentUser } from '@/auth/api/authApi';
import { useAuthStore } from '@/auth/model/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, [setUser]);

  return <>{children}</>;
}
