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

export function Profile({ tab }: ProfileProps) {
  const router = useRouter();
  const [perPage, setPerPage] = useState(getStoriesPerPage);
  const [profileState, setProfileState] = useState(initialState);

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
          <TravellerInfo
            avatarUrl={profileState.user.avatarUrl}
            name={profileState.user.name}
            storiesCount={profileState.user.storiesCount}
          />
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
