'use client';

import clsx from 'clsx';
import styles from './loader.module.css';

type LoaderProps = {
  label?: string;
  className?: string;
};

export default function Loader({
  label = 'Завантаження...',
  className,
}: LoaderProps) {
  return (
    <div
      className={clsx(styles.loader, className)}
      role="status"
      aria-live="polite"
    >
      <span className={styles.spinner} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
