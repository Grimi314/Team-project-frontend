'use client';
import { useAuthStore } from '@/auth/model/authStore';
import { logoutUser } from '@/auth/api/authApi';
import { useEffect } from 'react';

import Link from 'next/link';
import css from './header-modal.module.css';
import { Icon } from '../../icon/icon';
import AuthBlock from '../authBlock';

type HeaderModalType = {
  onClose: () => void;
};

export default function HeaderModal({ onClose }: HeaderModalType) {
  const { user, isAuth, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      logout();
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <div className={css.container}>
      <div className={css.logoButtonContainer}>
        <Link href="/">
          <Icon icon="icon-Company-Logo" className={css.logo} />
        </Link>

        <button className={css.closeButton} onClick={onClose}>
          <Icon className={css.closeIcon} icon="icon-close"></Icon>
        </button>
      </div>
      <ul className={css.navList}>
        <li className={css.navListItem}>
          <Link href="/" prefetch={false}>
            Головна
          </Link>
        </li>
        <li className={css.navListItem}>
          <Link href="/stories" prefetch={false}>
            Статті
          </Link>
        </li>
        <li className={css.navListItem}>
          <Link href=" /travellers" prefetch={false}>
            Еко-Мандрівники
          </Link>
        </li>
      </ul>
      <div className={css.modalWrapper}>
        {isAuth ? (
          <>
            <Link href={'/stories/enw'} className={css.buttonEddStory}>
              Опублікувати статтю
            </Link>
            <div className={css.modalAuthBlock}>
              <AuthBlock />
            </div>
          </>
        ) : (
          <>
            <Link href={'/api/auth'} className={css.buttonLogin}>
              Вхід
            </Link>

            <Link href={'/api/auth'} className={css.buttonRegister}>
              Реєстрація
            </Link>
          </>
        )}
      </div>

      {isAuth && (
        <div className={css.modalAuthBlockTablet}>
          <AuthBlock />
        </div>
      )}
    </div>
  );
}
