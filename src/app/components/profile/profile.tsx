'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/loader/loader';
import { MessageNoStories } from '@/app/components/messageNoStories/messageNoStories';
import { ProfileTabs } from '@/app/components/profileTabs/profileTabs';
import { TravellerInfo } from '@/app/components/travellerInfo/travellerInfo';
import { TravellersStories } from '@/app/components/travellersStories/travellersStories';
import {
  fetchProfileStories,
  isUnauthorizedError,
  type NormalizedProfileStory,
  type NormalizedProfileUser,
  type ProfileTab,
} from '@/lib/api/profile';
import styles from './profile.module.css';
import { Modal } from '@/app/components/modal/modal';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import { useAuthStore } from '@/auth/model/authStore';
import { updateUserProfile } from '@/auth/api/authApi';

type ProfileProps = {
  tab: ProfileTab;
};

type ProfileState = {
  user: NormalizedProfileUser;
  stories: NormalizedProfileStory[];
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
};

const getStoriesPerPage = () => {
  if (typeof window === 'undefined') {
    return 4;
  }

  return window.innerWidth >= 1280 ? 6 : 4;
};

const fallbackUser: NormalizedProfileUser = {
  id: 'traveller',
  name: 'Мандрівник',
  avatarUrl: null,
  storiesCount: 0,
};

const initialState: ProfileState = {
  user: fallbackUser,
  stories: [],
  page: 1,
  hasMore: false,
  isLoading: true,
  isLoadingMore: false,
};

const getProfileUser = (user: NormalizedProfileUser | null) => {
  if (!user) {
    return fallbackUser;
  }

  return {
    ...fallbackUser,
    ...user,
  };
};

const profileValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Ім’я повинно містити щонайменше 3 символи')
    .max(32, 'Ім’я повинно містити не більше 32 символів')
    .required('Вкажіть ім’я'),
  email: Yup.string().email('Некоректний формат email'),
  avatar: Yup.string().url('Вкажіть коректне посилання').nullable(),
});

export function Profile({ tab }: ProfileProps) {
  const router = useRouter();
  const [perPage, setPerPage] = useState(getStoriesPerPage);
  const [profileState, setProfileState] = useState(initialState);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const handleResize = () => {
      const nextPerPage = getStoriesPerPage();

      setPerPage((currentValue) =>
        currentValue === nextPerPage ? currentValue : nextPerPage,
      );
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadStories = async () => {
      setProfileState((currentState) => ({
        ...currentState,
        stories: [],
        page: 1,
        hasMore: false,
        isLoading: true,
        isLoadingMore: false,
      }));

      try {
        const response = await fetchProfileStories(tab, { page: 1, perPage });

        if (!isMounted) {
          return;
        }

        setProfileState({
          user: getProfileUser(response.user),
          stories: response.stories,
          page: response.pagination.page,
          hasMore: response.pagination.hasNextPage,
          isLoading: false,
          isLoadingMore: false,
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        if (isUnauthorizedError(error)) {
          router.replace('/auth/login');
          return;
        }

        setProfileState((currentState) => ({
          ...currentState,
          stories: [],
          page: 1,
          hasMore: false,
          isLoading: false,
          isLoadingMore: false,
        }));
      }
    };

    void loadStories();

    return () => {
      isMounted = false;
    };
  }, [perPage, router, tab]);

  const isPageLoading = profileState.isLoading;
  const isEmptyState = !isPageLoading && profileState.stories.length === 0;

  const handleShowMore = async () => {
    if (profileState.isLoadingMore || !profileState.hasMore) {
      return;
    }

    setProfileState((currentState) => ({
      ...currentState,
      isLoadingMore: true,
    }));

    try {
      const response = await fetchProfileStories(tab, {
        page: profileState.page + 1,
        perPage,
      });

      setProfileState((currentState) => ({
        ...currentState,
        user: response.user ? getProfileUser(response.user) : currentState.user,
        stories: [...currentState.stories, ...response.stories],
        page: response.pagination.page,
        hasMore: response.pagination.hasNextPage,
        isLoadingMore: false,
      }));
    } catch (error) {
      if (isUnauthorizedError(error)) {
        router.replace('/auth/login');
        return;
      }

      setProfileState((currentState) => ({
        ...currentState,
        isLoadingMore: false,
      }));
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div className={styles.container}>
          {isPageLoading ? (
            <div className={styles.loaderState}>
              <Loader label="Завантажуємо профіль..." />
            </div>
          ) : (
            <TravellerInfo
              avatarUrl={profileState.user.avatarUrl}
              name={profileState.user.name}
              storiesCount={profileState.user.storiesCount}
              onEditProfile={() => setIsEditModalOpen(true)}
            />
          )}

          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          >
            <Formik
              initialValues={{
                name: user?.name ?? profileState.user.name,
                email: user?.email ?? '',
                avatar: user?.avatarUrl ?? '',
              }}
              validationSchema={profileValidationSchema}
              enableReinitialize
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const data: {
                    name?: string;
                    email?: string;
                    avatar?: string | null;
                  } = {};

                  const trimmedName = values.name.trim();
                  const trimmedEmail = values.email.trim();
                  const trimmedAvatar = values.avatar.trim();

                  if (trimmedName && trimmedName !== user?.name) {
                    data.name = trimmedName;
                  }

                  if (trimmedEmail && trimmedEmail !== user?.email) {
                    data.email = trimmedEmail;
                  }

                  if (trimmedAvatar !== (user?.avatarUrl ?? '')) {
                    data.avatar = trimmedAvatar || null;
                  }

                  if (Object.keys(data).length === 0) {
                    toast.error('Немає змін для збереження');
                    setSubmitting(false);
                    return;
                  }

                  const response = await updateUserProfile(data);
                  const updatedUser = response.data;
                  const updatedAvatarUrl =
                    updatedUser.avatarUrl ?? updatedUser.avatar ?? null;

                  setUser({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    avatarUrl: updatedAvatarUrl ?? undefined,
                  });

                  setProfileState((currentState) => ({
                    ...currentState,
                    user: {
                      ...currentState.user,
                      name: updatedUser.name,
                      avatarUrl: updatedAvatarUrl,
                    },
                  }));

                  toast.success(
                    updatedUser.pendingEmail
                      ? 'Профіль оновлено. Підтвердьте новий email у листі.'
                      : 'Профіль успішно оновлено.',
                  );

                  setIsEditModalOpen(false);
                } catch (error) {
                  console.error('Profile update error:', error);
                  toast.error('Не вдалося оновити профіль');
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className={styles.editForm}>
                  <h2 className={styles.editTitle}>Редагування профілю</h2>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="name">
                      Ім’я
                    </label>
                    <Field
                      id="name"
                      className={`${styles.input} ${
                        touched.name && errors.name ? styles.inputError : ''
                      }`}
                      name="name"
                      type="text"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className={styles.error}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="email">
                      Email
                    </label>
                    <Field
                      id="email"
                      className={`${styles.input} ${
                        touched.email && errors.email ? styles.inputError : ''
                      }`}
                      name="email"
                      type="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className={styles.error}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="avatar">
                      Посилання на аватар
                    </label>
                    <Field
                      id="avatar"
                      className={`${styles.input} ${
                        touched.avatar && errors.avatar ? styles.inputError : ''
                      }`}
                      name="avatar"
                      type="url"
                    />
                    <ErrorMessage
                      name="avatar"
                      component="p"
                      className={styles.error}
                    />
                  </div>

                  <button
                    className={styles.saveButton}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Зберігаємо...' : 'Зберегти'}
                  </button>
                </Form>
              )}
            </Formik>
          </Modal>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <ProfileTabs activeTab={tab} />

          {isPageLoading ? (
            <div className={styles.loaderState}>
              <Loader label="Завантажуємо історії..." />
            </div>
          ) : isEmptyState ? (
            <MessageNoStories tab={tab} />
          ) : (
            <TravellersStories
              tab={tab}
              stories={profileState.stories}
              hasMore={profileState.hasMore}
              isLoadingMore={profileState.isLoadingMore}
              onShowMore={() => void handleShowMore()}
            />
          )}
        </div>
      </section>
    </div>
  );
}
