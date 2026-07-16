import axios from 'axios';
import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';

export type ProfileTab = 'saved' | 'own';

type UnknownRecord = Record<string, unknown>;

export type NormalizedProfileUser = {
  id: string;
  name: string;
  avatarUrl: string | null;
  storiesCount: number;
};

export type NormalizedProfileStory = {
  id: string;
  title: string;
  imageUrl: string | null;
  excerpt: string;
  rating: number;
  author: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  date: string | null;
};

export type NormalizedPagination = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ProfileStoriesResponse = {
  user: NormalizedProfileUser | null;
  stories: NormalizedProfileStory[];
  pagination: NormalizedPagination;
};

const getProfileStoriesEndpoint = (tab: ProfileTab, userId: string) =>
  tab === 'own'
    ? endpoints.profile.ownStories(userId)
    : endpoints.profile.savedStories;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null;

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
};

const toStringValue = (value: unknown) => {
  if (typeof value === 'string') {
    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : null;
  }

  return null;
};

const toArrayOfRecords = (value: unknown): UnknownRecord[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isRecord);
};

const pickNestedRecord = (
  source: UnknownRecord | null,
  keys: string[],
): UnknownRecord | null => {
  if (!source) {
    return null;
  }

  for (const key of keys) {
    const value = source[key];

    if (isRecord(value)) {
      return value;
    }
  }

  return null;
};

const pickStoriesArray = (payload: unknown): UnknownRecord[] => {
  if (Array.isArray(payload)) {
    return toArrayOfRecords(payload);
  }

  if (!isRecord(payload)) {
    return [];
  }

  const directCandidates = [
    payload.articles,
    payload.stories,
    payload.savedStories,
    payload.items,
    payload.data,
  ];

  for (const candidate of directCandidates) {
    const stories = toArrayOfRecords(candidate);

    if (stories.length > 0) {
      return stories;
    }
  }

  if (isRecord(payload.data)) {
    const nestedCandidates = [
      payload.data.articles,
      payload.data.stories,
      payload.data.savedStories,
      payload.data.items,
      payload.data.data,
    ];

    for (const candidate of nestedCandidates) {
      const stories = toArrayOfRecords(candidate);

      if (stories.length > 0) {
        return stories;
      }
    }
  }

  return [];
};

const normalizePagination = (
  payload: unknown,
  page: number,
  perPage: number,
  storiesCount: number,
): NormalizedPagination => {
  const paginationSource = isRecord(payload)
    ? pickNestedRecord(payload, ['pagination']) ?? payload
    : null;

  const totalItems = Math.max(
    storiesCount,
    toNumber(paginationSource?.totalItems, storiesCount),
  );
  const totalPages = Math.max(
    1,
    toNumber(
      paginationSource?.totalPages,
      totalItems > 0 ? Math.ceil(totalItems / perPage) : 1,
    ),
  );
  const currentPage = Math.max(1, toNumber(paginationSource?.page, page));
  const currentPerPage = Math.max(1, toNumber(paginationSource?.perPage, perPage));

  return {
    page: currentPage,
    perPage: currentPerPage,
    totalItems,
    totalPages,
    hasNextPage:
      typeof paginationSource?.hasNextPage === 'boolean'
        ? paginationSource.hasNextPage
        : currentPage < totalPages,
    hasPreviousPage:
      typeof paginationSource?.hasPreviousPage === 'boolean'
        ? paginationSource.hasPreviousPage
        : currentPage > 1,
  };
};

const normalizeUser = (
  userLike: UnknownRecord | null,
  fallbackStoriesCount: number,
): NormalizedProfileUser | null => {
  if (!userLike) {
    return null;
  }

  const name = toStringValue(userLike.name) ?? 'Мандрівник';
  const savedArticles = Array.isArray(userLike.savedArticles)
    ? userLike.savedArticles.length
    : 0;
  const rawStoriesCount =
    userLike.articlesAmount ??
    userLike.storiesCount ??
    userLike.totalStories ??
    savedArticles;
  const storiesCount =
    rawStoriesCount === undefined
      ? fallbackStoriesCount
      : toNumber(rawStoriesCount, fallbackStoriesCount);

  return {
    id: toStringValue(userLike._id) ?? toStringValue(userLike.id) ?? name,
    name,
    avatarUrl: toStringValue(userLike.avatarUrl),
    storiesCount: Math.max(0, storiesCount),
  };
};

const normalizeStory = (
  storyLike: UnknownRecord,
  fallbackUser: NormalizedProfileUser | null,
): NormalizedProfileStory => {
  const authorSource =
    pickNestedRecord(storyLike, ['author', 'ownerId', 'owner']) ?? null;
  const authorName =
    toStringValue(authorSource?.name) ??
    toStringValue(storyLike.authorName) ??
    fallbackUser?.name ??
    'Невідомий автор';

  return {
    id:
      toStringValue(storyLike._id) ??
      toStringValue(storyLike.id) ??
      `${authorName}-${toStringValue(storyLike.title) ?? 'story'}`,
    title: toStringValue(storyLike.title) ?? 'Без назви',
    imageUrl:
      toStringValue(storyLike.img) ??
      toStringValue(storyLike.image) ??
      toStringValue(storyLike.imageUrl),
    excerpt:
      toStringValue(storyLike.article) ??
      toStringValue(storyLike.excerpt) ??
      '',
    rating: toNumber(
      storyLike.rate ?? storyLike.rating ?? storyLike.likes,
      0,
    ),
    author: {
      id:
        toStringValue(authorSource?._id) ??
        toStringValue(authorSource?.id) ??
        authorName,
      name: authorName,
      avatarUrl:
        toStringValue(authorSource?.avatarUrl) ??
        fallbackUser?.avatarUrl ??
        null,
    },
    date: toStringValue(storyLike.date),
  };
};

const pickUserSource = (payload: unknown): UnknownRecord | null => {
  if (isRecord(payload)) {
    const directUser =
      pickNestedRecord(payload, ['user', 'profile', 'currentUser', 'traveller']) ??
      null;

    if (directUser) {
      return directUser;
    }

    if (isRecord(payload.data)) {
      const nestedUser = pickNestedRecord(payload.data, [
        'user',
        'profile',
        'currentUser',
        'traveller',
      ]);

      if (nestedUser) {
        return nestedUser;
      }
    }
  }

  return null;
};

export async function fetchProfileStories(
  tab: ProfileTab,
  options: { page: number; perPage: number },
): Promise<ProfileStoriesResponse> {
  const currentUserResponse = await api.get(endpoints.profile.currentUser);
  const currentUser = normalizeUser(
    isRecord(currentUserResponse.data) ? currentUserResponse.data : null,
    0,
  );

  if (!currentUser) {
    throw new Error('Current user is missing');
  }

  const response = await api.get(getProfileStoriesEndpoint(tab, currentUser.id), {
    params: {
      page: options.page,
      perPage: options.perPage,
    },
  });

  const storiesSource = pickStoriesArray(response.data);
  const userSource = pickUserSource(response.data);
  const pagination = normalizePagination(
    response.data,
    options.page,
    options.perPage,
    storiesSource.length,
  );
  const user = normalizeUser(userSource, pagination.totalItems) ?? currentUser;
  const storyFallbackUser = tab === 'own' ? user : null;
  const stories = storiesSource.map(story =>
    normalizeStory(story, storyFallbackUser),
  );

  return {
    user,
    stories,
    pagination,
  };
}

export function isUnauthorizedError(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  const status = error.response?.status;

  return status === 401 || status === 403;
}
