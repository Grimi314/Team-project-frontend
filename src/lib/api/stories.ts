import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import type {
  NormalizedPagination,
  NormalizedProfileStory,
} from '@/lib/api/profile';

type UnknownRecord = Record<string, unknown>;

export type StoriesResponse = {
  stories: NormalizedProfileStory[];
  pagination: NormalizedPagination;
};

export type Category = {
  _id: string;
  category: string;
};

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null;

const toStringValue = (value: unknown): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
};

const toNumber = (value: unknown, fallback = 0): number => {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
};

const getStoriesArray = (payload: unknown): UnknownRecord[] => {
  if (Array.isArray(payload)) {
    return payload.filter(isRecord);
  }

  if (!isRecord(payload)) {
    return [];
  }

  const possibleArrays = [
    payload.stories,
    payload.articles,
    payload.items,
    payload.data,
  ];

  for (const value of possibleArrays) {
    if (Array.isArray(value)) {
      return value.filter(isRecord);
    }
  }

  if (isRecord(payload.data)) {
    const nestedArrays = [
      payload.data.stories,
      payload.data.articles,
      payload.data.items,
    ];

    for (const value of nestedArrays) {
      if (Array.isArray(value)) {
        return value.filter(isRecord);
      }
    }
  }

  return [];
};

const normalizeStory = (story: UnknownRecord): NormalizedProfileStory => {
  const author =
    (isRecord(story.author) && story.author) ||
    (isRecord(story.ownerId) && story.ownerId) ||
    (isRecord(story.owner) && story.owner) ||
    null;

  const authorName =
    toStringValue(author?.name) ??
    toStringValue(story.authorName) ??
    'Невідомий автор';

  return {
    id:
      toStringValue(story._id) ??
      toStringValue(story.id) ??
      `${authorName}-${toStringValue(story.title) ?? 'story'}`,

    title: toStringValue(story.title) ?? 'Без назви',

    imageUrl:
      toStringValue(story.img) ??
      toStringValue(story.image) ??
      toStringValue(story.imageUrl),

    excerpt:
      toStringValue(story.article) ??
      toStringValue(story.excerpt) ??
      toStringValue(story.description) ??
      '',

    rating: toNumber(story.rate ?? story.rating ?? story.likes, 0),

    author: {
      id:
        toStringValue(author?._id) ??
        toStringValue(author?.id) ??
        authorName,

      name: authorName,

      avatarUrl: toStringValue(author?.avatarUrl),
    },

    date:
      toStringValue(story.date) ??
      toStringValue(story.createdAt),
  };
};

const normalizePagination = (
  payload: unknown,
  page: number,
  perPage: number,
  storiesCount: number,
): NormalizedPagination => {
  const source =
    isRecord(payload) && isRecord(payload.pagination)
      ? payload.pagination
      : isRecord(payload) &&
          isRecord(payload.data) &&
          isRecord(payload.data.pagination)
        ? payload.data.pagination
        : isRecord(payload)
          ? payload
          : null;

  const totalItems = Math.max(
    storiesCount,
    toNumber(source?.totalItems ?? source?.total, storiesCount),
  );

  const totalPages = Math.max(
    1,
    toNumber(
      source?.totalPages,
      totalItems > 0 ? Math.ceil(totalItems / perPage) : 1,
    ),
  );

  const currentPage = Math.max(1, toNumber(source?.page, page));
  const currentPerPage = Math.max(
    1,
    toNumber(source?.perPage, perPage),
  );

  return {
    page: currentPage,
    perPage: currentPerPage,
    totalItems,
    totalPages,
    hasNextPage:
      typeof source?.hasNextPage === 'boolean'
        ? source.hasNextPage
        : currentPage < totalPages,
    hasPreviousPage:
      typeof source?.hasPreviousPage === 'boolean'
        ? source.hasPreviousPage
        : currentPage > 1,
  };
};

export const getStories = async (
  page = 1,
  perPage = 6,
  category?: string,
): Promise<StoriesResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (category) {
  params.append('category', category);
}

  const { data } = await api.get(
    `${endpoints.stories.list}?${params.toString()}`,
  );

  const storiesSource = getStoriesArray(data);
  const stories = storiesSource.map(normalizeStory);
  const pagination = normalizePagination(
    data,
    page,
    perPage,
    stories.length,
  );

  return {
    stories,
    pagination,
  };
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get(endpoints.categories.list);

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .filter(isRecord)
    .map(item => ({
      _id: toStringValue(item._id) ?? '',
      category: toStringValue(item.category) ?? '',
    }))
    .filter(item => item._id && item.category);
};
