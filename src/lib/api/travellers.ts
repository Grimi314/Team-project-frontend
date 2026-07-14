import { api } from './axios';

export type Traveller = {
  _id: string;
  name: string;
  avatarUrl: string | null;
  articlesAmount: number;
};

type TravellersResponse = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  nextPage: boolean;
  previousPage: boolean;
  users: Traveller[];
};

export async function fetchTravellers(
  page = 1,
  perPage = 12,
): Promise<TravellersResponse> {
  const response = await api.get<TravellersResponse>('/travellers', {
    params: {
      page,
      perPage,
    },
  });

  return response.data;
}
