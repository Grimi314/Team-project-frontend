"use client";

import Link from "next/link";
import { useState } from "react";

import { AppIcon } from "@/app/components/icon/appIcon";
import type { NormalizedProfileStory } from "@/lib/api/profile";
import { removeSavedStory, saveStory } from "@/lib/api/savedStories";

import styles from "./storyCard.module.css";

export type StoryCardProps = {
  story: NormalizedProfileStory;
  tab: "saved" | "own" | "recommended";
};

export function StoryCard({ story, tab }: StoryCardProps) {
  const [isSaved, setIsSaved] = useState(tab === "saved");
  const [isLoading, setIsLoading] = useState(false);

  const isOwnStory = tab === "own";

  const actionIcon = isOwnStory ? "icon-edit" : "icon-bookmark";

  const actionLabel = isOwnStory
    ? "Редагувати історію"
    : isSaved
      ? "Видалити зі збережених"
      : "Зберегти історію";

  const handleBookmark = async () => {
    if (isOwnStory || isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      if (isSaved) {
        await removeSavedStory(story.id);
      } else {
        await saveStory(story.id);
      }

      setIsSaved((previous) => !previous);
    } catch (error) {
      console.error("Не вдалося змінити стан збереження:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className={styles.card}>
      {story.imageUrl ? (
        <img className={styles.image} src={story.imageUrl} alt={story.title} />
      ) : (
        <div className={styles.imageFallback}>
          <span>Природні Мандри</span>
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.author}>{story.author.name}</span>
          <span className={styles.dot}>•</span>

          <span className={styles.rating}>
            {story.rating}
            <AppIcon icon="icon-bookmark" className={styles.metaIcon} />
          </span>
        </div>

        <h2 className={styles.title}>{story.title}</h2>

        <div className={styles.actions}>
          <Link className={styles.primaryAction} href={`/stories/${story.id}`}>
            Переглянути статтю
          </Link>

          <button
            type="button"
            className={styles.bookmarkAction}
            aria-label={actionLabel}
            aria-pressed={!isOwnStory ? isSaved : undefined}
            disabled={isLoading}
            onClick={handleBookmark}
          >
            <AppIcon icon={actionIcon} className={styles.actionIcon} />
          </button>
        </div>
      </div>
    </article>
  );
}
