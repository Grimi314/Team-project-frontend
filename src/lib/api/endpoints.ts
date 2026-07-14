export const endpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    current: '/auth/current',
  },

  stories: {
    list: '/stories',
    popular: '/popular',
    recommended: '/recommended',
    byId: (id: string) => `/stories/${id}`,
    create: '/stories',
    save: (id: string) => '/stories/' + id + '/saved',
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
