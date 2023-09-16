import vuetify from 'vite-plugin-vuetify';
import { resolve } from 'pathe';
import fs from 'fs';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    [
      '@nuxtjs/algolia',
      {
        ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME || '',
        apiKey: process.env.ALGOLIA_SEARCH_ONLY_API_KEY,
        applicationId: process.env.ALGOLIA_APPLICATION_ID,
        instantSearch: {
          theme: 'algolia',
        },
      },
    ],
  ],
  content: {
    // sources: {
    //   v1: {
    //     prefix: '/en',
    //     driver: 'fs',
    //     base: resolve(__dirname, 'content/en'),
    //   },
    //   vja: {
    //     prefix: '/ja',
    //     driver: 'fs',
    //     base: resolve(__dirname, 'content/ja'),
    //   },
    // },
    highlight: {
      // コードハイライトを有効化する場合はテーマを設定
      theme: 'github-dark-dimmed',
    },
    documentDriven: true,
  },
  i18n: {
    // lazy: true,
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'ja', file: 'ja.json', name: 'Japanese' },
    ],
    defaultLocale: 'ja',
    langDir: 'lang/',
    strategy: 'no_prefix',
    // vueI18n: './config/vue-i18n.options.ts',
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: 'i18n_redirected',
    //   redirectOn: 'root',  // recommended
    // }
  },

  nitro: {
    prerender: {
      routes: [
        '/',
        '/ja/',
        '/en/',
        '/ja/getting-started/introduction/',
        '/ja/getting-started/installation/',
        '/en/getting-started/introduction/',
        '/en/getting-started/installation/',
      ],
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        // どの言語にも一致しない場合の代替ページ
        // {
        //   rel: 'x-default',
        //   href: `${process.env.NUXT_BASE_URL}/en/`,
        // },
        // {
        //   rel: 'alternate',
        //   hreflang: 'ja',
        //   href: `${process.env.NUXT_BASE_URL}/ja/`,
        // },
        // {
        //   rel: 'alternate',
        //   hreflang: 'en',
        //   href: `${process.env.NUXT_BASE_URL}/en/`,
        // },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'preload',
          as: 'style',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Inconsolata:wght@400;700&family=Noto+Sans+JP:wght@400;700&display=swap',
          onload: 'this.onload=null;this.rel="stylesheet"',
        },
      ],
    },
  },
  css: ['assets/settings.scss'],
  build: {
    transpile: ['vuetify'],
  },
  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins!.push(
        vuetify({
          autoImport: true,
          styles: {
            configFile: 'assets/settings.scss',
          },
        })
      );
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_BASE_URL,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_variables.scss" as *;',
        },
      },
    },
    ssr: {
      noExternal: ['vuetify'],
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
  extends: [],
  // ssr: false,
});

// prerenderのroutesに設定する為に、作成
function getAllRoutes(directory: string): (string | undefined)[] {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  const routes: (string | undefined)[] = [];

  if (fs.existsSync(`${directory}/index.md`)) {
    routes.push('/');
  }

  return routes;
}
