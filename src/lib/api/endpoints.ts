export const endpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    current: '/auth/current',
  },
  stories: {
    list: '/articles',
    popular: '/stories/popular',
    byId: (id: string) => `/articles/${id}`,
    create: '/stories',
    save: (id: string) => `/stories/${id}/save`,
  },
  travellers: {
    list: '/travellers',
    byId: (id: string) => `/travellers/${id}`,
  },
  profile: {
    savedStories: '/profile/saved',
    ownStories: '/profile/stories',
  },
};