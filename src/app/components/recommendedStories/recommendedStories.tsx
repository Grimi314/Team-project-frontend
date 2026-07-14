'use client';

import { useEffect, useState } from 'react';
import css from './recommendedStories.module.css';

import { StoryCard } from '@/app/components/storyCard/storyCard';
import type { NormalizedProfileStory } from '@/lib/api/profile';
import {
  fetchRecommendedStories,
  type RecommendedStory,
} from '@/lib/api/recommendedStories';

type RecommendedStoriesProps = {
  categoryId: string;
};

const normalizeRecommendedStory = (
  story: RecommendedStory,
): NormalizedProfileStory => ({
  id: story._id,
  title: story.title,
  imageUrl: story.img,
  excerpt: story.article,
  rating: story.rating,
  author: {
    id: story.author?._id ?? story.ownerId,
    name: story.author?.name ?? 'Невідомий автор',
    avatarUrl: story.author?.avatarUrl ?? null,
  },
  date: story.date ?? null,
});

export default function RecommendedStories({
  categoryId,
}: RecommendedStoriesProps) {
  const [stories, setStories] = useState<NormalizedProfileStory[]>([]);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const data = await fetchRecommendedStories(categoryId);
        setStories(data.map(normalizeRecommendedStory));
      } catch (error) {
        console.error('Не вдалося завантажити рекомендовані історії:', error);
      }
    };

    loadStories();
  }, [categoryId]);

  return (
    <section className={css.sectionRecommendedStories}>
      <div className="container">
        <h2 className={css.titleStories}>Вам також сподобається</h2>

        <div className={css.storiesList}>
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} tab="saved" />
          ))}
        </div>
      </div>
    </section>
  );
}
