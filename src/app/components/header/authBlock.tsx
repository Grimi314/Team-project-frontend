'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { logoutUser } from '@/auth/api/authApi';
import { useAuthStore } from '@/auth/model/authStore';

import { AppIcon } from '../icon/appIcon';
import css from './authBlock.module.css';

export default function AuthBlock() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Помилка виходу:', error);
    } finally {
      clearAuth();
      router.push('/');
      router.refresh();
    }
  };

  if (!user) {
    return null;
  }

  const avatar = user.avatarUrl || '/default.png';

  return (
    <div className={css.authBlokContainer}>
      <Image
        src={avatar}
        alt={user.name ?? 'Аватар користувача'}
        width={32}
        height={32}
        className={css.img}
      />

      <span className={css.name}>{user.name ?? user.email}</span>

      <button
        type="button"
        className={css.buttonLogout}
        onClick={handleLogout}
        aria-label="Вийти з облікового запису"
      >
        <AppIcon className={css.logoutSvg} icon="icon-logout" />
      </button>
    </div>
  );
}
