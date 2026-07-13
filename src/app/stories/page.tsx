'use client';

import { useEffect, useState } from 'react';
import { getStories } from '@/lib/api/stories';
import styles from './storiesPage.module.css';
import type { NormalizedProfileStory } from '@/lib/api/profile';
import { StoryCard } from '@/app/components/storyCard/storyCard';

const categories = [
  'Всі статті',
  'Маршрути',
  'Еко-поради',
  'Природа',
  'Культура',
  'Локальні продукти',
];

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [stories, setStories] = useState<NormalizedProfileStory[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    setStories([]);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const loadStories = async () => {
      try {
        setIsLoading(true);
        setError('');

        const data = await getStories(page, 6, selectedCategory);

        setStories((prev) =>
          page === 1 ? data.stories : [...prev, ...data.stories],
        );
        setTotalPages(data.pagination.totalPages);
      } catch {
        setError('Не вдалося завантажити статті');
      } finally {
        setIsLoading(false);
      }
    };

    loadStories();
  }, [page, selectedCategory]);

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <h1 className={styles.title}>Статті</h1>

        <div className={styles.filtersWrapper}>
          <ul className={styles.filters}>
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`${styles.filterButton} ${
                    selectedCategory === category ? styles.activeFilter : ''
                  }`}
                  type="button"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.mobileDropdown}>
            <span className={styles.selectLabel}>Категорії</span>

            <button
              className={`${styles.dropdownButton} ${
                isDropdownOpen ? styles.dropdownButtonOpen : ''
              }`}
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              aria-controls="categories-list"
            >
              <span className={styles.dropdownValue}>{selectedCategory}</span>

              <svg
                className={styles.selectIcon}
                aria-hidden="true"
                focusable="false"
              >
                <use
                  href={`/icons/sprite.svg#${
                    isDropdownOpen
                      ? 'icon-keyboard_arrow_up'
                      : 'icon-keyboard_arrow_down'
                  }`}
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className={styles.dropdownList} id="categories-list">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className={`${styles.dropdownOption} ${
                        selectedCategory === category
                          ? styles.dropdownOptionActive
                          : ''
                      }`}
                      type="button"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <section className={styles.grid}>
          {error && <p className={styles.placeholder}>{error}</p>}

          {!error &&
            stories.map((story) => (
              <StoryCard key={story.id} story={story} tab="saved" />
            ))}
        </section>

        <button
          className={styles.loadMore}
          type="button"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isLoading || page >= totalPages}
        >
          {isLoading ? 'Завантаження...' : 'Показати ще'}
        </button>
      </section>
    </main>
  );
}
