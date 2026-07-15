'use client';

import { useEffect } from 'react';

import { getCurrentUser } from '@/auth/api/authApi';
import { useAuthStore } from '@/auth/model/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getCurrentUser();

        const user =
          response.data?.user ?? response.user ?? response.data ?? response;

        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setAuthInitialized(true);
      }
    };

    checkAuth();
  }, [setUser, setAuthInitialized]);

  return <>{children}</>;
}
