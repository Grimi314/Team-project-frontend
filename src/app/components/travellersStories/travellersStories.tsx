import type { NormalizedProfileStory } from '@/lib/api/profile';
import { StoryCard } from '@/app/components/storyCard/storyCard';
import styles from './travellersStories.module.css';

type CurrentUserType = {
  _id: string;
  name: string;
  savedArticles: string[];
} | null;

type TravellersStoriesProps = {
  tab: 'saved' | 'own' | 'recommended' | 'user';
  stories: NormalizedProfileStory[];
  hasMore: boolean;
  isLoadingMore: boolean;
  onShowMore: () => void;
  currentUser?: CurrentUserType;
};

export function TravellersStories({
  tab,
  stories,
  hasMore,
  isLoadingMore,
  onShowMore,
  currentUser,
}: TravellersStoriesProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {stories.map(story => {
          const isStorySaved = currentUser?.savedArticles?.includes(story.id) || false;

          return (
            <StoryCard
              key={story.id}
              story={story}
              tab={tab}
              initialIsSaved={isStorySaved}
              currentUser={currentUser}
            />
          );
        })}
      </div>
      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <button
            type="button"
            className={styles.showMoreButton || styles.primaryAction}
            disabled={isLoadingMore}
            onClick={onShowMore}
            style={{
              padding: '12px 24px',
              backgroundColor: '#4a9849',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {isLoadingMore ? 'Завантаження...' : 'Показати ще'}
          </button>
        </div>
      )}
    </div>
  );
}