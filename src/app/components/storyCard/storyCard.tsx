"use client";

import Link from "next/link";
import styles from "./StoryCard.module.css";

interface Story {
  _id: string;
  img: string;
  title: string;
  ownerId: string | { name: string };
  rate?: number;
}

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  const authorName = typeof story.ownerId === "object" && story.ownerId !== null 
    ? (story.ownerId as any).name 
    : "Мандрівник";

  const rating = story.rate ?? 0;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={story.img} alt={story.title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.author}>{authorName}</span>
          <span className={styles.dot}>•</span>
          <div className={styles.ratingContainer}>
          <span className={styles.rating}>{rating}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.99973 12.1121L4.82073 13.4721C4.44229 13.6353 4.08312 13.6046 3.74323 13.3803C3.40334 13.156 3.2334 12.8385 3.2334 12.428V2.95298C3.2334 2.6452 3.34601 2.37836 3.57123 2.15248C3.79634 1.92648 4.06223 1.81348 4.3689 1.81348H11.6306C11.9383 1.81348 12.2052 1.92648 12.4311 2.15248C12.6571 2.37836 12.7701 2.6452 12.7701 2.95298V12.428C12.7701 12.8385 12.5995 13.156 12.2582 13.3803C11.917 13.6046 11.5572 13.6353 11.1787 13.4721L7.99973 12.1121ZM7.99973 10.8973L11.6306 12.428V2.95298H4.3689V12.428L7.99973 10.8973ZM7.99973 2.95298H4.3689H11.6306H7.99973Z" fill="black" />
</svg>
          </div>
        </div>

        <h3 className={styles.title}>{story.title}</h3>

        <div className={styles.actions}>
          <Link href={`/articles/${story._id}`} className={styles.viewBtn}>
            Переглянути статтю
          </Link>
          
          <button className={styles.saveBtn} aria-label="Зберегти статтю">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}