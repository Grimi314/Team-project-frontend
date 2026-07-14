import StoryDetails from '../storyDetails/storyDetails';
import SaveStory from '../saveStory/saveStory';
// import RecommendedStories from "../recommendedStories/recommendedStories";

import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';

import { Story } from '@/types/story';

type Props = {
  storyId: string;
};

export default async function StoryPage({ storyId }: Props) {
  const { data: story } = await api.get<Story>(endpoints.stories.byId(storyId));

  return (
    <>
      <StoryDetails story={story} />

      <SaveStory storyId={story.id} />

      {/* TODO: Після merge з main перевірити наявність RecommendedStories та розкоментувати компонент. */}
      {/* <recommendedStories /> */}
    </>
  );
}
