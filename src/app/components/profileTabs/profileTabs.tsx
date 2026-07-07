'use client';

import clsx from 'clsx';
import Link from 'next/link';
import type { ProfileTab } from '@/lib/api/profile';
import styles from './profileTabs.module.css';

type ProfileTabsProps = {
  activeTab: ProfileTab;
};

const tabConfig: Record<ProfileTab, { label: string; href: string }> = {
  saved: {
    label: 'Збережені історії',
    href: '/profile',
  },
  own: {
    label: 'Мої історії',
    href: '/profile/own',
  },
};

export function ProfileTabs({ activeTab }: ProfileTabsProps) {
  return (
    <div className={styles.wrapper} aria-label="Таби профілю">
      {(Object.keys(tabConfig) as ProfileTab[]).map(tab => {
        const currentTab = tabConfig[tab];

        return (
          <Link
            key={tab}
            className={clsx(styles.tab, tab === activeTab && styles.activeTab)}
            href={currentTab.href}
            aria-current={tab === activeTab ? 'page' : undefined}
          >
            {currentTab.label}
          </Link>
        );
      })}
    </div>
  );
}
