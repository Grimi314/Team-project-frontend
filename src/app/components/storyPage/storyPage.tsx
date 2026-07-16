'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import StoryDetails from '../storyDetails/storyDetails';
import SaveStory from '../saveStory/saveStory';

import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import type { Story } from '@/types/story';

type Props = {
  storyId: string;
};

export default async function StoryPage({ storyId }: Props) {
  try {
    const response = await api.get<{ story: Story }>(
      endpoints.stories.byId(storyId),
    );

    const story = response.data.story;

    return (
      <>
        <StoryDetails story={story} />
        <SaveStory storyId={story._id} />
      </>
    );
  } catch {
    return <p>Не вдалося завантажити історію</p>;
  }

  if (!story) {
    return null;
  }

  return (
    <>
      <StoryDetails story={story} />
      <SaveStory storyId={story._id} currentUser={currentUser} />
    </>
  );
}