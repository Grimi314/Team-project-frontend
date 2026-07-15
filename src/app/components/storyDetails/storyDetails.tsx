import Image from 'next/image';
import Link from 'next/link';

import { AppIcon } from '../icon/appIcon';

import { Story } from '@/types/story';

import styles from './storyDetails.module.css';

type StoryDetailsProps = {
  story: Story;
};

export default function StoryDetails({ story }: StoryDetailsProps) {
  const categoryName =
    typeof story.category === 'string'
      ? story.category
      : (story.category?.category ?? 'Без категорії');

  return (
    <section className={styles.storyDetails}>
      <div className={styles.mainContentWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={story.img}
            alt={story.title}

            width={800}
            height={500}
            className={styles.image}

            priority
          />
        </div>
        <div className={styles.infoWrapper}>
          <Link
            href="/stories" // TODO: перевірити маршрут сторінки всіх історій
            className={styles.backLink}
          >
            <AppIcon icon="icon-chevron_left" className={styles.backIcon} />

            <span className={styles.backText}>Всі статті</span>
          </Link>

          {/* TODO: перевірити коректість змінних story.(title, author, publishedAt, category, description) */}

          <h1 className={styles.title}>{story.title}</h1>

          <div className={styles.content}>
            <div className={styles.meta}>
              <div className={styles.authorBlock}>
                <span className={styles.metaLabel}>Автор статті</span>

                <span className={styles.metaValue}>{story.article}</span>
              </div>

              <div className={styles.dateBlock}>
                <span className={styles.metaLabel}>Опубліковано</span>

                <span className={styles.metaValue}>{story.rate}</span>
              </div>
            </div>

            <div className={styles.categoryWrapper}>
              <span className={styles.category}>{categoryName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.description}>
        <p className={styles.descriptionText}>{story.date}</p>
      </div>
    </section>
  );
}
