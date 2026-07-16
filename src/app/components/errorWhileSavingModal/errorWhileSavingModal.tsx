'use client';

import { useRouter } from 'next/navigation';
import styles from './errorWhileSavingModal.module.css';

interface ErrorWhileSavingModalProps {
  onClose: () => void;
}

export default function ErrorWhileSavingModal({ onClose }: ErrorWhileSavingModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    onClose();
    router.push('/auth/login');
  };

  const handleRegister = () => {
    onClose();
    router.push('/auth/register');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Закрити">
          ✕
        </button>
        
        <h3 className={styles.title}>Помилка під час збереження</h3>
        
        <p className={styles.description}>
          Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису зареєструйтесь
        </p>
        
        <div className={styles.actions}>
          <button className={styles.loginBtn} onClick={handleLogin}>
            Увійти
          </button>
          <button className={styles.registerBtn} onClick={handleRegister}>
            Зареєструватись
          </button>
        </div>
      </div>
    </div>
  );
}