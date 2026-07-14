import clsx from 'clsx';
import Link from 'next/link';
import type { ProfileTab } from '@/lib/api/profile';
import styles from './messageNoStories.module.css';

type MessageNoStoriesProps = {
  tab: ProfileTab | 'user';
};

const messageConfig: Record<
  ProfileTab | 'user',
  { title: string; ctaLabel: string; href: string }
> = {
  saved: {
    title:
      'У вас ще немає збережених історій, мерщій збережіть вашу першу історію!',
    ctaLabel: 'До історій',
    href: '/stories',
  },
  own: {
    title:
      'У вас ще немає власних історій, мерщій створіть вашу першу історію!',
    ctaLabel: 'Створити історію',
    href: '/addStory',
  },
  user: {
    title: 'Цей користувач ще не публікував історій',
    ctaLabel: 'Назад до історій',
    href: '/stories',
  },
};

export function MessageNoStories({ tab }: MessageNoStoriesProps) {
  const currentMessage = messageConfig[tab];

  return (
    <div className={styles.message}>
      <p className={styles.title}>{currentMessage.title}</p>
      <Link
        className={clsx(
          styles.action,
          tab === 'saved' ? styles.savedAction : styles.ownAction,
        )}
        href={currentMessage.href}
      >
        {currentMessage.ctaLabel}
      </Link>
    </div>
  );
}
