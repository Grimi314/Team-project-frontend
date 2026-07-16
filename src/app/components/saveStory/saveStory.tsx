'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import { removeSavedStory, saveStory } from '@/lib/api/savedStories';
import type { CurrentUserType } from '@/app/components/storyCard/storyCard';

import ErrorWhileSavingModal from '../errorWhileSavingModal/errorWhileSavingModal';
import styles from './saveStory.module.css';

interface SaveStoryProps {
  storyId: string;
  currentUser: CurrentUserType;
  isUserLoading: boolean;
}

export default function SaveStory({
  storyId,
  currentUser,
  isUserLoading,
}: SaveStoryProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsSaved(currentUser.savedArticles.includes(storyId));
    } else {
      setIsSaved(false);
    }
  }, [currentUser, storyId]);

  const handleSaveAction = async () => {
    if (isLoading || isUserLoading) {
      return;
    }

    if (!currentUser) {
      setShowModal(true);
      return;
    }

    try {
      setIsLoading(true);

      if (isSaved) {
        await removeSavedStory(storyId);
        setIsSaved(false);
        toast.success('Статтю видалено зі збережених');
      } else {
        await saveStory(storyId);
        setIsSaved(true);
        toast.success('Статтю збережено');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setShowModal(true);
        return;
      }

      console.error('Помилка Save Story:', error);
      toast.error('Не вдалося виконати дію');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className={styles.saveStoryContainer}>
        <div className={styles.saveStory}>
          <h3 className={styles.title}>
            {isSaved ? 'Історію збережено' : 'Збережіть собі історію'}
          </h3>

          <p className={styles.description}>
            Вона буде доступна у вашому профілі у розділі збережене
          </p>

          <button
            type="button"
            className={`${styles.button} ${isSaved ? styles.buttonSaved : ''}`}
            onClick={handleSaveAction}
            disabled={isLoading || isUserLoading}
          >
            {isUserLoading
              ? 'Перевірка авторизації'
              : isLoading
                ? 'Завантаження'
                : isSaved
                  ? 'Видалити зі збережених'
                  : 'Зберегти'}
          </button>
        </div>
      </div>

      {showModal && (
        <ErrorWhileSavingModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
