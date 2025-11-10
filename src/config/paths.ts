export const paths = {
  home: {
    getHref: () => '/',
  },
  login: {
    getHref: () => '/login',
  },
  register: {
    getHref: () => '/register',
  },
  forgotPassword: {
    getHref: () => '/forgot-password',
  },
  resetPassword: {
    getHref: () => '/reset-password',
  },
  support: {
    getHref: () => '/support',
  },
  travel: {
    getHref: () => '/travel',
  },
  map: {
    getHref: () => '/map',
  },
} as const;
