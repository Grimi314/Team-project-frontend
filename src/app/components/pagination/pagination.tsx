import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './pagination.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}
interface PaginationProps {
  onClick: () => void;
  isLoading?: boolean;
  isVisible: boolean;
  className?: string;
}

const Button = ({
  children,
  isLoading,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const buttonClass = `${styles.button} ${className}`;
  return (
    <button
      className={buttonClass}
      disabled={isLoading || disabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? 'Завантаження...' : children}
    </button>
  );
};

export const Pagination = ({
  onClick,
  isLoading = false,
  isVisible,
  className = '',
}: PaginationProps) => {
  if (!isVisible) return null;

  return (
    <div className={`${styles.container} ${className}`}>
      <Button
        onClick={onClick}
        disabled={isLoading}
        className={styles.loadMoreBtn}
      >
        Показати ще
      </Button>
    </div>
  );
};
