'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { AppIcon } from '@/app/components/icon/appIcon';
import type { NormalizedProfileStory } from '@/lib/api/profile';
import { removeSavedStory, saveStory } from '@/lib/api/savedStories';

import styles from './storyCard.module.css';

export type CurrentUserType = {
  _id: string;
  name: string;
  savedArticles: string[];
} | null;

export type StoryCardProps = {
  story: NormalizedProfileStory;
  tab: 'saved' | 'own' | 'recommended' | 'user'; 
  initialIsSaved?: boolean; 
  currentUser: CurrentUserType;
};

export function StoryCard({ story, tab, initialIsSaved, currentUser }: StoryCardProps) {
  const router = useRouter(); 
  const [isSaved, setIsSaved] = useState(initialIsSaved !== undefined ? initialIsSaved : tab === 'saved');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialIsSaved !== undefined) {
      setIsSaved(initialIsSaved);
    }
  }, [initialIsSaved]);

  const isOwnStory = tab === 'own';
  const actionIcon = isOwnStory ? 'icon-edit' : 'icon-bookmark';

  const actionLabel = isOwnStory
    ? 'Редагувати історію'
    : isSaved
      ? 'Видалити зі збережених'
      : 'Зберегти історію';

  const handleBookmark = async () => {
    if (isOwnStory || isLoading) {
      return;
    }

    if (!currentUser) {
      router.push('/auth/login');
      return;
    }

    try {
      setIsLoading(true);

      if (isSaved) {
        await removeSavedStory(story.id);
        setIsSaved(false); 
        toast.success('Статтю видалено зі збережених');
      } else {
        await saveStory(story.id);
        setIsSaved(true); 
        toast.success('Статтю збережено');
      }
    } catch (error) {
      console.error('Не вдалося змінити стан збереження на бекенді:', error);
      toast.error('Не вдалося змінити стан збереження');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className={styles.card}>
      {story.imageUrl ? (
        <img className={styles.image} src={story.imageUrl} alt={story.title} />
      ) : (
        <div className={styles.imageFallback}>
          <span>Природні Мандри</span>
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.author}>{story.author.name}</span>
          <span className={styles.dot}>•</span>

          <span className={styles.rating}>
            {story.rating}
            <AppIcon icon="icon-bookmark" className={styles.metaIcon} />
          </span>
        </div>

        <h2 className={styles.title}>{story.title}</h2>

        <div className={styles.actions}>
          <Link className={styles.primaryAction} href={`/stories/${story.id}`}>
            Переглянути статтю
          </Link>

          <button
            type="button"
            className={`${styles.bookmarkAction} ${!isOwnStory && isSaved ? styles.activeBookmark : ''}`}
            aria-label={actionLabel}
            aria-pressed={!isOwnStory ? isSaved : undefined}
            disabled={isLoading}
            onClick={handleBookmark}
          >
            <AppIcon icon={actionIcon} className={styles.actionIcon} />
          </button>
        </div>
      </div>
    </article>
  );
}