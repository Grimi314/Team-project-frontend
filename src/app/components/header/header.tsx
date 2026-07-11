'use client';
import { useAuthStore } from '@/auth/model/authStore';
import { logoutUser } from '@/auth/api/authApi';

import Link from 'next/link';
import css from './header.module.css';
import { AppIcon } from '../icon/appIcon';

import AuthBlock from './authBlock';

export default function Header() {
  const travellerId = null;

  const { user, isAuth, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      logout();
    }
  };

  return (
    <header className={css.container}>
      <Link href="/">
        <AppIcon icon="icon-Company-Logo" className={css.logo} />
      </Link>

      <nav className={css.wrapper}>
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
          <li className={css.navListItem}>
            <Link href={`/traveller/${travellerId}`} prefetch={false}>
              Мій Профіль
            </Link>
          </li>
        </ul>

        <div className={css.buttonContainer}>
          {true ? (
            <>
              <Link href={'/stories/enw'} className={css.buttonEddStory}>
                Опублікувати статтю
              </Link>

              <button className={css.button}>
                <AppIcon icon="icon-menu" className={css.menu} />
              </button>

              <AuthBlock />
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
      </nav>
    </header>
  );
}
