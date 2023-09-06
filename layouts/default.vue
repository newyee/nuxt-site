<script setup lang="ts">
import { inject } from 'vue';

const route = useRoute();
const { baseUrl } = useRuntimeConfig().public;
const { locale } = useI18n();
const shouldShowDrawer = ref(false);
const mobileLayout = ref(false);

const handleResize = () => {
  shouldShowDrawer.value = window.innerWidth >= 1023;
  mobileLayout.value = window.innerWidth <= 1023;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
  console.log('mobileLayout', mobileLayout.value);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

let redirectPath = route.path.endsWith('/')
  ? route.path.slice(0, -1)
  : route.path;

if (redirectPath.startsWith('/en')) {
  locale.value = 'en';
} else if (redirectPath.startsWith('/ja')) {
  locale.value = 'ja';
}

if (process.client) {
  switch (redirectPath) {
    case '':
      navigateTo(redirectPath + '/ja', { replace: true });
      break;
  }
}

let ogLocale = '';
if (redirectPath.startsWith('/ja')) {
  ogLocale = 'ja_JP';
} else if (redirectPath.startsWith('/en')) {
  ogLocale = 'en_US';
}

useSeoMeta({
  ogLocale,
  ogUrl: baseUrl + route.path,
  ogType: 'website',
  ogSiteName: '',
  ogImage: baseUrl + '/images/social-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 627,
  ogImageType: 'image/png',
  // ogTitle: () => page.value?.head.title,
  twitterCard: 'summary_large_image',
  // twitterDescription: () => page.value?.description,
  twitterImage: baseUrl + '/images/social-image.jpg',
  twitterSite: '',
  // twitterTitle: () => page.value?.head.title,
});
const mobileDrawer = ref(false);
watch(mobileDrawer, (newVal, oldVal) => {
  console.log('mobileDrawer changed from', oldVal, 'to', newVal);
});
function handleMobileDrawerClicked(newValue: boolean) {
  mobileDrawer.value = newValue;
  console.log('変更');
}
</script>

<template>
  <div id="app">
    <v-app>
      <Header
        :mobileDrawer="mobileDrawer"
        @mobileDrawerClicked="handleMobileDrawerClicked"
      />
      <div class="header-border"></div>

      <div class="responsive-toc-wrapper" v-if="mobileLayout">
        <ResponsiveTableOfContents></ResponsiveTableOfContents>
      </div>
      <div class="d-flex flex-0-1-100">
        <SideMenu v-if="shouldShowDrawer" />
        <v-main
          class="pl-0 pr-0 flex-shrink-1"
          :class="{ 'v-main-border': !mobileLayout }"
        >
          <div v-if="mobileDrawer">
            <ResponsiveSideMenu></ResponsiveSideMenu>
          </div>
          <v-container>
            <slot />
            <NavigationLink />
          </v-container>
        </v-main>
        <TableofContents v-if="shouldShowDrawer" />
      </div>
      <div class="footer-border"></div>
      <Footer />
    </v-app>
  </div>
</template>
<style lang="scss">
#app {
  max-width: 1190px !important;
  margin: 0 auto !important;
}
.test {
}
.v-main-border {
  border-left: 1px solid $border-color-gray;
  border-right: 1px solid $border-color-gray;
}
video {
  width: 100%;
}
// headerの背景色はresponsive-toc-wrapperのbackground-colorに設定されている
header {
  position: sticky !important;
  backdrop-filter: saturate(200%) blur(20px);
}
@media (max-width: 1023px) {
  header {
    background: none !important;
  }
}
.responsive-toc-wrapper {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: $bg-color-white !important;
  backdrop-filter: saturate(200%) blur(20px);
  border-bottom: 1px solid $border-color-gray;
}
.footer-border {
  border-top: 1px solid #e0e0e0;
  margin-top: 1px;
  position: fixed;
  z-index: 2000;
  left: 0;
  right: 0;
  bottom: 127px;
}
</style>
