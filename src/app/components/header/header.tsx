'use client';
import { useAuthStore } from '@/auth/model/authStore';
import HeaderModal from './heder-modal/header-modal';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import css from './header.module.css';
import { AppIcon } from '../icon/appIcon';

import AuthBlock from './authBlock';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuth = Boolean(user);

  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isAuthInitialized) {
    return null;
  }

  return isMenuOpen ? (
    <HeaderModal onClose={closeMenu} />
  ) : (
    <header className={css.container}>
      <Link href="/">
        <AppIcon icon="icon-Company-Logo" className={css.logo} />
      </Link>

      <nav className={css.wrapper}>
        <ul className={css.navList}>
          <li className={css.navListItem}>
            <Link className={css.navText} href="/" prefetch={false}>
              Головна
            </Link>
          </li>
          <li className={css.navListItem}>
            <Link className={css.navText} href="/stories" prefetch={false}>
              Статті
            </Link>
          </li>
          <li className={css.navListItem}>
            <Link className={css.navText} href="/travellers" prefetch={false}>
              Еко-Мандрівники
            </Link>
          </li>
          {isAuth && user && (
            <li className={css.navListItem}>
              <Link className={css.navText} href="/profile" prefetch={false}>
                Мій Профіль
              </Link>
            </li>
          )}
        </ul>

        <div className={css.buttonContainer}>
          {isAuth && user ? (
            <>
              <Link href="/stories/new" className={css.buttonEddStory}>
                Опублікувати статтю
              </Link>

              <div className={css.desktopAuthBlock}>
                <AuthBlock />
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={css.buttonLogin}>
                Вхід
              </Link>

              <Link href="/auth/register" className={css.buttonRegister}>
                Реєстрація
              </Link>
            </>
          )}

          <button
            type="button"
            className={css.button}
            onClick={openMenu}
            aria-label="Відкрити меню"
          >
            <AppIcon icon="icon-menu" className={css.menu} />
          </button>
        </div>
      </nav>
    </header>
  );
}
