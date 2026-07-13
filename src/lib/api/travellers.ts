import { api } from './axios';
import { endpoints } from './endpoints';

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

export async function fetchTravellers(): Promise<Traveller[]> {
  const response = await api.get<TravellersResponse>(
    endpoints.travellers.list,
    {
      params: {
        page: 1,
        perPage: 12,
      },
    },
  );

  return response.data.users;
}
