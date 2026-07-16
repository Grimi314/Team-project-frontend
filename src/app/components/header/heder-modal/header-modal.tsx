'use client';
import { useAuthStore } from '@/auth/model/authStore';
import { useEffect } from 'react';

import Link from 'next/link';
import css from './header-modal.module.css';
import { AppIcon } from '../../icon/appIcon';
import AuthBlock from '../authBlock';

type HeaderModalType = {
  onClose: () => void;
};

export default function HeaderModal({ onClose }: HeaderModalType) {
  const { isAuth } = useAuthStore();

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
    <div className={css.mobileMenu}>
      <div className={css.logoButtonContainer}>
        <Link href="/" onClick={onClose}>
          <AppIcon icon="icon-Company-Logo" className={css.logo} />
        </Link>

        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Закрити меню"
        >
          <AppIcon className={css.closeIcon} icon="icon-close" />
        </button>
      </div>
      <ul className={css.navList}>
        <li className={css.navListItem}>
          <Link
            className={css.navText}
            href="/"
            onClick={onClose}
            prefetch={false}
          >
            Головна
          </Link>
        </li>
        <li className={css.navListItem}>
          <Link
            className={css.navText}
            href="/stories"
            onClick={onClose}
            prefetch={false}
          >
            Статті
          </Link>
        </li>
        <li className={css.navListItem}>
          <Link
            className={css.navText}
            href="/travellers"
            onClick={onClose}
            prefetch={false}
          >
            Еко-Мандрівники
          </Link>
        </li>
        {isAuth && (
          <li className={css.navListItem}>
            <Link
              className={css.navText}
              href="/profile"
              onClick={onClose}
              prefetch={false}
            >
              Мій Профіль
            </Link>
          </li>
        )}
      </ul>
      <div className={css.modalWrapper}>
        {isAuth ? (
          <>
            <Link
              href="/stories/new"
              onClick={onClose}
              className={css.buttonEddStory}
            >
              Опублікувати статтю
            </Link>
            <div className={css.modalAuthBlock}>
              <AuthBlock />
            </div>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              onClick={onClose}
              className={css.buttonLogin}
            >
              Вхід
            </Link>

            <Link
              href="/auth/register"
              onClick={onClose}
              className={css.buttonRegister}
            >
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
