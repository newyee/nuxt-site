import type { RouterConfig } from '@nuxt/schema';
const HEADER_OFFSET = -80;

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    console.log(to.hash);
    if (to.hash) {
      const element = document.querySelector(to.hash);
      if (element) {
        window.scrollTo({
          top: element.offsetTop + HEADER_OFFSET,
          behavior: 'smooth',
        });
      }
    }
  },
};
