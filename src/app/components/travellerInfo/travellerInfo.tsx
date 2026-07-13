'use client';

import React from 'react';
import { Icon } from '@/app/components/icon/svgIcon';
import styles from './travellerInfo.module.css';

type TravellerInfoProps = {
  avatarUrl?: string | null;
  name: string;
  storiesCount: number;
  children?: React.ReactNode; // ДОДАНО: підтримка кнопки
  variant?: 'card' | 'profile';
};

export function TravellerInfo({
  avatarUrl,
  name,
  storiesCount,
  children,
  variant = 'profile',
}: TravellerInfoProps) {
  const avatarLabel = name.trim().charAt(0).toUpperCase() || 'М';

  return (
    <div className={`${styles.profile} ${styles[variant]}`}>
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.avatar} src={avatarUrl} alt={name} />
      ) : (
        <div className={styles.avatarFallback} aria-hidden="true">
          {avatarLabel}
        </div>
      )}
      <div className={styles.content}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.meta}>Статей: {storiesCount}</p>
      </div>
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
}
