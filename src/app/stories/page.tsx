'use client';

import { useState } from 'react';
import { Icon } from '@/app/components/icon/icon';
import styles from './storiesPage.module.css';

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

  // Поки немає реальних статей, залиш true.
  // Коли статті закінчаться — заміни на свою логіку.
  const hasMoreArticles = true;

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

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
                  onClick={() => setSelectedCategory(category)}
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

              <Icon
                icon={
                  isDropdownOpen
                    ? 'icon-keyboard_arrow_up'
                    : 'icon-keyboard_arrow_down'
                }
                className={styles.selectIcon}
              />
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
          <p className={styles.placeholder}>Тут будуть картки статей</p>
        </section>

        <button
          className={styles.loadMore}
          type="button"
          disabled={!hasMoreArticles}
        >
          Показати ще
        </button>
      </section>
    </main>
  );
}
