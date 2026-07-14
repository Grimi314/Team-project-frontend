import { api } from './axios';
import { endpoints } from './endpoints';

export async function saveStory(storyId: string) {
  const response = await api.post(endpoints.stories.save(storyId));

  return response.data;
}

export async function removeSavedStory(storyId: string) {
  const response = await api.delete(endpoints.stories.save(storyId));

  return response.data;
}
