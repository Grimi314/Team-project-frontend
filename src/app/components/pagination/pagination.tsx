"use client";

import styles from "./Pagination.module.css";

interface PaginationProps {
  onLoadMore: () => void;
  isLoading: boolean;
}

export default function Pagination({ onLoadMore, isLoading }: PaginationProps) {
  return (
    <div className={styles.loadMoreWrapper}>
      <button 
        onClick={onLoadMore} 
        className={styles.loadMoreBtn}
        disabled={isLoading}
      >
        {isLoading ? "Завантаження..." : "Показати ще"}
      </button>
    </div>
  );
}