'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './authBar.module.css';

export function AuthBar() {
  const pathname = usePathname();
  const isLogin = pathname === '/auth/login';

  return (
    <nav className={styles.bar} aria-label="Автентифікація">
      <Link
        href="/auth/register"
        className={clsx(styles.tab, !isLogin && styles.active)}
      >
        Реєстрація
      </Link>
      <Link
        href="/auth/login"
        className={clsx(styles.tab, isLogin && styles.active)}
      >
        Вхід
      </Link>
    </nav>
  );
}
