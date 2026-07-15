import StoryDetails from '../storyDetails/storyDetails';
import SaveStory from '../saveStory/saveStory';
// import RecommendedStories from "../recommendedStories/recommendedStories";

import { api } from '@/lib/api/axios';

import axios from 'axios';

type Props = {
  storyId: string;
};

export default async function StoryPage({ storyId }: Props) {
  try {
    const response = await api.get(
      `https://team-project-backend-ezbf.onrender.com/stories/${storyId}`,
    );

    console.log('Backend response:', response.data);

    const story = response.data.story;

    return (
      <>
        <StoryDetails story={story} />
        <SaveStory storyId={story._id} />
      </>
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Status:', error.response?.status);
      console.log('Backend error:', error.response?.data);
      console.log('Request URL:', error.config?.url);
    }
  }
}
