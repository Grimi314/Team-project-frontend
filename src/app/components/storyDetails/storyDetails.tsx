import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '../icon/svgIcon';

import { Story } from '@/types/story';

import styles from './storyDetails.module.css';

type StoryDetailsProps = {
  story: Story;
};

export default function StoryDetails({ story }: StoryDetailsProps) {
  return (
    <section className={styles.storyDetails}>
      <div className={styles.mainContentWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={story.image}
            alt={story.title}
            className={styles.image}
            priority
          />
        </div>
        <div className={styles.infoWrapper}>
          <Link
            href="/stories" // TODO: перевірити маршрут сторінки всіх історій
            className={styles.backLink}
          >
            <Icon icon="icon-chevron_left" className={styles.backIcon} />

            <span className={styles.backText}>Всі статті</span>
          </Link>

          {/* TODO: перевірити коректість змінних story.(title, author, publishedAt, category, description) */}

          <h1 className={styles.title}>{story.title}</h1>

          <div className={styles.content}>
            <div className={styles.meta}>
              <div className={styles.authorBlock}>
                <span className={styles.metaLabel}>Автор статті</span>

                <span className={styles.metaValue}>{story.author}</span>
              </div>

              <div className={styles.dateBlock}>
                <span className={styles.metaLabel}>Опубліковано</span>

                <span className={styles.metaValue}>{story.publishedAt}</span>
              </div>
            </div>

            <div className={styles.categoryWrapper}>
              <span className={styles.category}>{story.category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.description}>
        <p>{story.description}</p>
      </div>
    </section>
  );
}
