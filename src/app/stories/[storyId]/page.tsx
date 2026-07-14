import RecommendedStories from "@/app/components/recommendedStories/recommendedStories";
import StoryPage from "@/app/components/storyPage/storyPage";
type Props = {
  params: Promise<{
    storyId: string;
  }>;
};

export default async function Story({ params }: Props) {
  const { storyId } = await params;

  console.log("storyId у page.tsx:", storyId);
  return (
    <div>
      <StoryPage storyId={storyId} />
      <RecommendedStories categoryId="6966a5cdbc1b90f344c2e0be" />
    </div>
  );
}
