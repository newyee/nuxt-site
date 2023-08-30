<script setup lang="ts">
const route = useRoute();
const { baseUrl } = useRuntimeConfig().public;
const { locale } = useI18n();

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
</script>

<template>
  <v-app>
    <Header />
    <div class="d-flex flex-0-1-100 main-content">
      <SideMenu />
      <v-main class="pl-0 pr-0 flex-shrink-1">
        <v-container>
          <slot />
          <NavigationLink />
        </v-container>
      </v-main>
      <TableofContents />
    </div>
    <Footer />
  </v-app>
</template>
<style lang="scss">
.test {
}
.v-main {
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
}

.main-content {
  width: 1190px;
  margin: 0 auto;
}

video {
  width: 100%;
}
header {
  width: 100%;
}
footer {
  width: 100%;
}
</style>
