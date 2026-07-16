export const endpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    current: '/auth/current',
  },

  stories: {
    list: '/',
  popular: '/popular',
  byId: (id: string) => `/stories/${id}`,
  create: '/stories',
  save: (id: string) => `/stories/${id}/saved`,
},

  categories: {
    list: '/categories',
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
