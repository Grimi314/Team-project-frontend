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
  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <h1 className={styles.title}>Статті</h1>

        <ul className={styles.filters}>
          {categories.map((category) => (
            <li key={category}>
              <button className={styles.filterButton} type="button">
                {category}
              </button>
            </li>
          ))}
        </ul>

        <section className={styles.grid}>
          <p>Тут будуть картки статей</p>
        </section>

        <button className={styles.loadMore} type="button">
          Показати ще
        </button>
      </section>
    </main>
  );
}