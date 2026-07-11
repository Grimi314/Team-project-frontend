import Link from 'next/link';
import { Icon } from '@/app/components/icon/svgIcon';
import styles from './authLayout.module.css';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Природні Мандри — на головну"
        >
          <Icon icon="icon-company-logo" className={styles.logoIcon} />
        </Link>
      </header>

      <main className={styles.content}>{children}</main>

      <footer className={styles.footer}>
        <p className={styles.copyright}>© 2025 Природні Мандри</p>
      </footer>
    </div>
  );
}
