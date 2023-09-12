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
  <v-app>
    <div v-if="mobileDrawer" class="responsive-side-menu-wrapper">
      <ResponsiveSideMenu></ResponsiveSideMenu>
    </div>
    <Header
      :mobileDrawer="mobileDrawer"
      @mobileDrawerClicked="handleMobileDrawerClicked"
    />

    <div class="responsive-toc-wrapper" v-if="mobileLayout">
      <ResponsiveTableOfContents></ResponsiveTableOfContents>
    </div>
    <v-container>
      <div class="d-flex flex-0-1-100">
        <SideMenu v-if="shouldShowDrawer" />
        <v-main
          class="pl-0 pr-0 flex-shrink-1"
          :class="{ 'v-main-border': !mobileLayout }"
        >
          <slot />
          <NavigationLink />
        </v-main>
        <TableofContents v-if="shouldShowDrawer" />
      </div>
    </v-container>
    <Footer />
  </v-app>
</template>
<style lang="scss">
// .v-container {
//   margin: 0 auto !important;
//   padding: 0 !important;
// }

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
.responsive-side-menu-wrapper {
  position: fixed;
  z-index: 1100;
  height: 100%;
}
.responsive-toc-wrapper {
  position: sticky;
  top: 64px;
  z-index: 1000;
  background-color: $bg-color-white !important;
  backdrop-filter: saturate(200%) blur(20px);
  border-bottom: 1px solid $border-color-gray;
}
.v-navigation-drawer {
  z-index: 0 !important;
}
</style>
