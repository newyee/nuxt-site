export default defineAppConfig({
  docus: {
    title: '',

    description: 'The best place to start your documentation.',

    image:
      'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',

    socials: {
      twitter: '@docus_',
      github: 'nuxtlabs/docus',
    },

    layout: 'default',

    header: {
      title: 'test title',
      logo: false,
      showLinkIcon: false,
      fluid: false,
      exclude: ['/', '/ja', '/en'],
    },

    aside: {
      level: 1,
      root: '/',
      collapsed: false,
      exclude: ['/'],
    },

    main: {
      padded: true,
      fluid: true,
    },

    footer: {
      credits: {
        icon: 'IconDocus',
        text: 'footer',
        href: 'https://docus.dev',
      },
      textLinks: [],
      iconLinks: [],
      fluid: false,
    },

    github: {
      dir: undefined,
      branch: undefined,
      repo: undefined,
      owner: undefined,
      edit: false,
    },
  },
});
