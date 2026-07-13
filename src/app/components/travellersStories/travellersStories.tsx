import type { NormalizedProfileStory } from '@/lib/api/profile';
import { StoryCard } from '@/app/components/storyCard/storyCard';
import styles from './travellersStories.module.css';

type TravellersStoriesProps = {
  tab: 'saved' | 'own';
  stories: NormalizedProfileStory[];
  hasMore: boolean;
  isLoadingMore: boolean;
  onShowMore: () => void;
};

export function TravellersStories({
  tab,
  stories,
  hasMore,
  isLoadingMore,
  onShowMore,
}: TravellersStoriesProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {stories.map(story => (
          <StoryCard key={story.id} story={story} tab={tab} />
        ))}
      </div>

      {hasMore ? (
        <button
          type="button"
          className={styles.showMoreButton}
          onClick={onShowMore}
          disabled={isLoadingMore}
        >
          Показати ще
        </button>
      ) : null}
    </div>
  );
}
