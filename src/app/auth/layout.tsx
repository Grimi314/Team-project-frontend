import Link from 'next/link';
import { Icon } from '@/app/components/icon/svgIcon';
import styles from './authLayout.module.css';
import AuthHeader from '../components/authHeader/authHeader';


export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles.page}>

      <AuthHeader/>

      <main className={styles.content}>{children}</main>

      <footer className={styles.footer}>
        <p className={styles.copyright}>© 2025 Природні Мандри</p>
      </footer>
    </div>
  );
}