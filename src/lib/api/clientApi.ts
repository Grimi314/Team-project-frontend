import { api } from './axios';
import { TravellersResponse } from '@/app/types/traveller';

export const getTravellers = async (
  perPage: number = 10,
  page: number = 1,
): Promise<TravellersResponse> => {
  const { data } = await api.get<TravellersResponse>('/travellers', {
    params: { perPage, page },
  });

  return data;
};
