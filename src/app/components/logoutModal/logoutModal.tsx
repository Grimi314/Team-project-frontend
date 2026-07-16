'use client';

import styles from './logoutModal.module.css';

interface LogoutModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ onClose, onConfirm }: LogoutModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрити"
        >
          ×
        </button>

        <h3 className={styles.title}>Ви точно хочете вийти?</h3>

        <p className={styles.description}>Ми будемо сумувати за вами!</p>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Відмінити
          </button>

          <button
            type="button"
            className={styles.logoutBtn}
            onClick={onConfirm}
          >
            Вийти
          </button>
        </div>
      </div>
    </div>
  );
}
