import { StoryCard } from '@/app/components/storyCard/storyCard';
import type { NormalizedProfileStory } from '@/lib/api/profile';

import styles from './recomendedStories.module.css';

type RecomendedStoriesProps = {
  stories: NormalizedProfileStory[];
};

export default function RecomendedStories({ stories }: RecomendedStoriesProps) {
  if (!stories.length) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Вам також сподобається</h2>

      <div className={styles.grid}>
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} tab="recommended" />
        ))}
      </div>
    </section>
  );
}
