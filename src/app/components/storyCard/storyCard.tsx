import Link from 'next/link';
import { AppIcon } from '@/app/components/icon/appIcon';
import type { NormalizedProfileStory } from '@/lib/api/profile';
import styles from './storyCard.module.css';

type StoryCardProps = {
  story: NormalizedProfileStory;
  tab: 'saved' | 'own';
};

export function StoryCard({ story, tab }: StoryCardProps) {
  const actionIcon = tab === 'own' ? 'icon-edit' : 'icon-bookmark';
  const actionLabel =
    tab === 'own' ? 'Редагувати історію' : 'Зберегти історію';

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
            className={styles.bookmarkAction}
            aria-label={actionLabel}
          >
            <AppIcon icon={actionIcon} className={styles.actionIcon} />
          </button>
        </div>
      </div>
    </article>
  );
}
