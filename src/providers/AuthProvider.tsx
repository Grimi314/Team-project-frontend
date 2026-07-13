'use client';

import { useEffect } from 'react';
import { getCurrentUser } from '@/auth/api/authApi';
import { useAuthStore } from '@/auth/model/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const checkAuth = async () => {
      const hasCookieToken = document.cookie
        .split(';')
        .some((item) => item.trim().startsWith('token='));
      if (!hasCookieToken) {
        setUser(null);
        return; // Якщо куки немає, запит на сервер навіть не відправляється!
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
