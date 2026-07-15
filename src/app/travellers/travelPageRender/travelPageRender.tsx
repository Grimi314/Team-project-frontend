import StoryPage from '@/app/components/storyPage/storyPage';
type Props = {
  params: Promise<{
    storyId: string;
  }>;
};

export default async function Story({ params }: Props) {
  const { storyId } = await params;
  return (
    <div>
      <StoryPage storyId={storyId} />
    </div>
  );
}
