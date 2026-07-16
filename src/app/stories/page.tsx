'use client';

import { useEffect, useState } from 'react';
import { StoryCard } from '@/app/components/storyCard/storyCard';
import type { NormalizedProfileStory } from '@/lib/api/profile';
import { getCategories, getStories, type Category } from '@/lib/api/stories';
import styles from './storiesPage.module.css';

export default function StoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] =
    useState('Всі статті');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [stories, setStories] = useState<NormalizedProfileStory[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCategorySelect = (categoryId: string, categoryName: string) => {
    if (categoryId === selectedCategoryId) {
      setIsDropdownOpen(false);
      return;
    }

    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    setPage(1);
    setStories([]);
    setTotalPages(1);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        setError('Не вдалося завантажити категорії');
      }
    };

    void loadCategories();
  }, []);

  useEffect(() => {
    const loadStories = async () => {
      try {
        setIsLoading(true);
        setError('');

        const data = await getStories(page, 6, selectedCategoryId);

        setStories((previousStories) =>
          page === 1 ? data.stories : [...previousStories, ...data.stories],
        );

        setTotalPages(data.pagination.totalPages);
      } catch {
        setError('Не вдалося завантажити статті');
      } finally {
        setIsLoading(false);
      }
    };

    void loadStories();
  }, [page, selectedCategoryId]);

  const hasMoreStories = page < totalPages;

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <h1 className={styles.title}>Статті</h1>

        <div className={styles.filtersWrapper}>
          <ul className={styles.filters}>
            <li>
              <button
                className={`${styles.filterButton} ${
                  selectedCategoryId === '' ? styles.activeFilter : ''
                }`}
                type="button"
                onClick={() => handleCategorySelect('', 'Всі статті')}
              >
                Всі статті
              </button>
            </li>

            {categories.map((category) => (
              <li key={category._id}>
                <button
                  className={`${styles.filterButton} ${
                    selectedCategoryId === category._id
                      ? styles.activeFilter
                      : ''
                  }`}
                  type="button"
                  onClick={() =>
                    handleCategorySelect(category._id, category.category)
                  }
                >
                  {category.category}
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
              onClick={() => setIsDropdownOpen((previous) => !previous)}
              aria-expanded={isDropdownOpen}
              aria-controls="categories-list"
            >
              <span className={styles.dropdownValue}>
                {selectedCategoryName}
              </span>

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
                <li>
                  <button
                    className={`${styles.dropdownOption} ${
                      selectedCategoryId === ''
                        ? styles.dropdownOptionActive
                        : ''
                    }`}
                    type="button"
                    onClick={() => handleCategorySelect('', 'Всі статті')}
                  >
                    Всі статті
                  </button>
                </li>

                {categories.map((category) => (
                  <li key={category._id}>
                    <button
                      className={`${styles.dropdownOption} ${
                        selectedCategoryId === category._id
                          ? styles.dropdownOptionActive
                          : ''
                      }`}
                      type="button"
                      onClick={() =>
                        handleCategorySelect(category._id, category.category)
                      }
                    >
                      {category.category}
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
              <StoryCard key={story.id} story={story} tab="recommended" />
            ))}

          {!error && !isLoading && stories.length === 0 && (
            <p className={styles.placeholder}>Статей не знайдено</p>
          )}
        </section>

        {hasMoreStories && (
          <button
            className={styles.loadMore}
            type="button"
            onClick={() => setPage((previousPage) => previousPage + 1)}
            disabled={isLoading}
          >
            {isLoading ? 'Завантаження...' : 'Показати ще'}
          </button>
        )}
      </section>
    </main>
  );
}
