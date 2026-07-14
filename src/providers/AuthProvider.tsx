'use client';

import { useEffect } from 'react';
import { getCurrentUser } from '@/auth/api/authApi';
import { useAuthStore } from '@/auth/model/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const data = await getCurrentUser();

        setUser(data.user ?? data.data ?? data);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, [setUser]);

  return <>{children}</>;
}
