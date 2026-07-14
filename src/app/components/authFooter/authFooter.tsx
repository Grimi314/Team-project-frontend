import styles from './authFooter.module.css';

export default function AuthFooter() {
  return (
    <footer className={styles.footer}>

      <p className={styles.desktopText}>© 2025 Природні Мандри</p>
      
      <p className={styles.mobileText}>© 2025 Подорожники</p>
    </footer>
  );
}