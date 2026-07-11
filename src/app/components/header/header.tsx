'use client';
import { useAuthStore } from '@/auth/model/authStore';
import { logoutUser } from '@/auth/api/authApi';
import HeaderModal from './heder-modal/header-modal';
import { useState } from 'react';

import Link from 'next/link';
import css from './header.module.css';
import { Icon } from '../icon/icon';

import AuthBlock from './authBlock';

export default function Header() {
  const travellerId = null;

  const { user, isAuth, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      logout();
    }
  };

  return isMenuOpen ? (
    <HeaderModal onClose={closeMenu} />
  ) : (
    <header className={css.container}>
      <Link href="/">
        <Icon icon="icon-Company-Logo" className={css.logo} />
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
          <li className={css.navListItem}>
            <Link
              className={css.navText}
              href={`/traveller/${travellerId}`}
              prefetch={false}
            >
              Мій Профіль
            </Link>
          </li>
        </ul>

        <div className={css.buttonContainer}>
          {isAuth ? (
            <>
              <Link href={'/stories/enw'} className={css.buttonEddStory}>
                Опублікувати статтю
              </Link>

              <div className={css.desktopAuthBlock}>
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

          <button className={css.button} onClick={openMenu}>
            <Icon icon="icon-menu" className={css.menu} />
          </button>
        </div>
      </nav>
    </header>
  );
}
