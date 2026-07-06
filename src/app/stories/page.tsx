'use client';

import { useState } from 'react';
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

          <label className={styles.selectLabel} htmlFor="category">
            Категорії
          </label>

          <select
            className={styles.categorySelect}
            id="category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <section className={styles.grid}>
          <p className={styles.placeholder}>Тут будуть картки статей</p>
        </section>

        <button className={styles.loadMore} type="button">
          Показати ще
        </button>
      </section>
    </main>
  );
}