'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import StoryDetails from '../storyDetails/storyDetails';
import SaveStory from '../saveStory/saveStory';
import { api } from '@/lib/api/axios';
import type { Story } from '@/types/story';
import type { CurrentUserType } from '@/app/components/storyCard/storyCard';
import Loader from '../loader/loader';
type CurrentUser = Exclude<CurrentUserType, null>;

type Props = {
  storyId: string;
};

export default function StoryPage({ storyId }: Props) {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(null);
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await api.get<CurrentUser>(
          'https://team-project-backend-ezbf.onrender.com/users/me',
        );
        setCurrentUser(data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status !== 401) {
          console.error('Помилка отримання користувача:', error.response?.data);
        }

        setCurrentUser(null);
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<{ story: Story }>(
          `https://team-project-backend-ezbf.onrender.com/stories/${storyId}`,
        );
        setStory(response.data.story);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('Status:', error.response?.status);
          console.log('Backend error:', error.response?.data);
          console.log('Request URL:', error.config?.url);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (storyId) {
      fetchStory();
    }
  }, [storyId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!story) {
    return null;
  }

  return (
    <>
      <StoryDetails story={story} />
      <SaveStory
        storyId={story._id}
        currentUser={currentUser}
        isUserLoading={isUserLoading}
      />
    </>
  );
}
