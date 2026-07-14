import StoryPage from '@/app/components/storyPage/storyPage';

type Props = {
  params: Promise<{
    storyId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { storyId } = await params;

  return <StoryPage storyId={storyId} />;
}
