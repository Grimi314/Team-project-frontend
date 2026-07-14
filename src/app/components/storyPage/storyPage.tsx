import StoryDetails from '../storyDetails/storyDetails';
import SaveStory from '../saveStory/saveStory';
// import RecommendedStories from "../RecommendedStories/RecommendedStories";

import { Story } from '@/types/story';

type Props = {
  storyId: string;
};

export default function StoryPage({ storyId }: Props) {
  const { data: story } = await api.get(endpoints.stories.byId(storyId));

  return (
    <>
      <StoryDetails story={story} />
      <SaveStory storyId={story.id} />0
      {/* TODO після merge з main перевірити наявність RecommendedStories та розкоментувати його, якщо він є */}
      {/* <RecommendedStories /> */}
    </>
  );
}
