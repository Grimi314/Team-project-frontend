'use client';

import { useState } from 'react';

import { useAuthStore } from '@/auth/model/authStore';
import { removeSavedStory, saveStory } from '@/lib/api/savedStories';

import styles from './saveStory.module.css';

type SaveStoryProps = {
  storyId: string;
};

export default function SaveStory({ storyId }: SaveStoryProps) {
  const isAuthorized = useAuthStore((state) => state.isAuth);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleClick = async () => {
    if (!isAuthorized) {
      setFeedbackMessage('Увійдіть, щоб зберегти історію');
      return;
    }

    try {
      setIsLoading(true);
      setFeedbackMessage('');

      if (isSaved) {
        await removeSavedStory(storyId);
      } else {
        await saveStory(storyId);
      }

      setIsSaved((prev) => !prev);
    } catch {
      setFeedbackMessage('Не вдалося змінити стан збереження');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className={styles.saveStory}>
        <h2 className={styles.title}>Збережіть собі історію</h2>

        <p className={styles.description}>
          Вона буде доступна у вашому профілі у розділі збережене
        </p>

        <button
          type="button"
          onClick={handleClick}
          disabled={isLoading}
          className={styles.button}
        >
          {isLoading
            ? 'Завантаження...'
            : isSaved
              ? 'Видалити зі збережених'
              : 'Зберегти'}
        </button>
      </section>

      {feedbackMessage && (
        <p className={styles.message}>{feedbackMessage}</p>
      )}
    </>
  );
}
