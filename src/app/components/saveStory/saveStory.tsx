'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { saveStory, removeSavedStory } from '@/lib/api/savedStories';
import type { CurrentUserType } from '@/app/components/storyCard/storyCard';
import styles from './saveStory.module.css';
import ErrorWhileSavingModal from '../errorWhileSavingModal/errorWhileSavingModal';

interface SaveStoryProps {
  storyId: string;
  currentUser: CurrentUserType;
}

export default function SaveStory({ storyId, currentUser }: SaveStoryProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.savedArticles) {
      setIsSaved(currentUser.savedArticles.includes(storyId));
    }
  }, [currentUser, storyId]);

  const handleSaveAction = async () => {
    if (isLoading) return;

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
      console.error('Помилка при зміні стану збереження:', error);
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
            {isSaved
              ? 'Вона доступна у вашому профілі у розділі збережене'
              : 'Вона буде доступна у вашому профілі у розділі збережене'}
          </p>
          <button
            type="button"
            className={`${styles.button} ${isSaved ? styles.buttonSaved : ''}`}
            onClick={handleSaveAction}
            disabled={isLoading}
          >
            {isLoading
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
