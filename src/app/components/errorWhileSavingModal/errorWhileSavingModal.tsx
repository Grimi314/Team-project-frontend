'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

import styles from './errorWhileSavingModal.module.css';

interface ErrorWhileSavingModalProps {
  onClose: () => void;
}

export default function ErrorWhileSavingModal({
  onClose,
}: ErrorWhileSavingModalProps) {
  const router = useRouter();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleLogin = () => {
    onClose();
    router.push('/auth/login');
  };

  const handleRegister = () => {
    onClose();
    router.push('/auth/register');
  };

  return createPortal(
    <div className={styles.overlay} onMouseDown={onClose} role="presentation">
      <div
        className={styles.modal}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="saving-error-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрити"
        >
          ✕
        </button>

        <h3 id="saving-error-title" className={styles.title}>
          Помилка під час збереження
        </h3>

        <p className={styles.description}>
          Щоб зберегти статтю, вам треба увійти. Якщо у вас ще немає облікового
          запису — зареєструйтеся.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.loginBtn}
            onClick={handleLogin}
          >
            Увійти
          </button>

          <button
            type="button"
            className={styles.registerBtn}
            onClick={handleRegister}
          >
            Зареєструватися
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
