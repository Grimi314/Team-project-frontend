'use client';

import { useState } from 'react';

import styles from './saveStory.module.css';

// TODO (БЕКЕНД)
// import { api } from "@/lib/api/axios";
// import { endpoints } from "@/lib/api/endpoints";

// TODO (БЕКЕНД)
// import { useAuth } from "@/providers/AuthProvider";

// TODO (БЕКЕНД)
// import Loader from "../loader/Loader";

// TODO (БЕКЕНД)
// import ErrorWhileSavingModal from "../errorWhileSavingModal/errorWhileSavingModal";

// TODO (БЕКЕНД)
// import toast from "react-hot-toast";

type SaveStoryProps = {
  storyId: string;
};

export default function SaveStory({ storyId }: SaveStoryProps) {
  /*
   * ======================================================
   * TODO (БЕКЕНД)
   *
   * Видалити всі тимчасові стани нижче.
   *
   * Дані повинні братись:
   *
   * - із контексту авторизації
   * - або React Query
   *
   * ======================================================
   */

  // DELETE
  const [isAuthorized] = useState(true);

  // DELETE
  const [isSaved, setIsSaved] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  /*
   * ======================================================
   * TODO (БЕКЕНД)
   *
   * Якщо користувач не авторизований,
   * показувати загальний ErrorWhileSavingModal.
   *
   * Замість тимчасової змінної:
   *
   * if (!user)
   *
   * ======================================================
   */

  const handleClick = async () => {
    if (!isAuthorized) {
      setShowModal(true);
      return;
    }

    try {
      setIsLoading(true);

      /*
       * =============================================
       * TODO (БЕКЕНД)
       *
       * Якщо історія НЕ збережена:
       *
       * await api.post(
       *    endpoints.stories.save(storyId)
       * );
       *
       * Якщо історія вже збережена:
       *
       * await api.delete(
       *    endpoints.stories.save(storyId)
       * );
       *
       * =============================================
       */

      // DELETE
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // DELETE
      setIsSaved((prev) => !prev);
    } catch (error) {
      /*
       * =============================================
       * TODO (БЕКЕНД)
       *
       * Показати toast:
       *
       * toast.error(error.response.data.message)
       *
       * =============================================
       */

      console.error(error);
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
          {/*
           * TODO (БЕКЕНД)
           *
           * Під час запиту показати Loader
           */}

          {isLoading
            ? // <Loader />
              'Завантаження...'
            : isSaved
              ? 'Видалити зі збережених'
              : 'Зберегти'}
        </button>
      </section>

      {/*
       * TODO (БЕКЕНД)
       *
       * Підключити готовий модальний компонент.
       */}

      {showModal && (
        // <errorWhileSavingModal
        //    onClose={() => setShowModal(false)}
        // />
        <></>
      )}
    </>
  );
}
