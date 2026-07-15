import { api } from './axios';
export type RecommendedStory = {
  _id: string;
  title: string;
  img: string | null;
  article: string;
  category: string;
  ownerId: string;
  author: {
    _id: string;
    name: string;
    avatarUrl: string | null;
  } | null;
  rate: number;
  rating: number;
  date: string;
};

type RecommendedStoriesResponse = {
  data: RecommendedStory[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};



export async function fetchRecommendedStories(
  categoryId: string,
  
): Promise<RecommendedStory[]> {
    console.log('categoryId:', categoryId);
  const response = await api.get<RecommendedStoriesResponse>(
  '/recommended',
    {
      params: {
        category: categoryId,
        page: 1,
        perPage: 3,
      },
    },
  );

  return response.data.data;
}
