import ja from '../lang/ja.json';
import en from '../lang/en.json';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ja',
  globalInjection: true,
  messages: {
    en,
    ja,
  },
}));
