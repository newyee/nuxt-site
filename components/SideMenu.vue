<script setup lang="ts">
import { computed } from 'vue';
import { useLayout } from 'vuetify';

const { mainStyles } = useLayout();
const marginTop = mainStyles.value['--v-layout-top'];
const maxHeight = computed(
  () => `calc(100vh - ${mainStyles.value['--v-layout-top']})`
);
const minWidth = '250px';
const route = useRoute();
const { navigation } = useContent();
const { baseUrl } = useRuntimeConfig().public;
const matchedNavObject = navigation.value.find(
  (navObject: { _path: string }) =>
    navObject._path === `/${route.params.slug[0]}`
);
const isPathMatched = (path: string, itemPath: string): boolean => {
  // パスの末尾を除いて比較するため、route.pathから末尾のスラッシュを取り除く
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
  return normalizedPath.includes(itemPath);
};

const panel = matchedNavObject.children.findIndex((item: { _path: string }) =>
  isPathMatched(route.path, item._path)
);
</script>
<template>
  <client-only>
    <v-navigation-drawer
      permanent
      border="none"
      class="position-sticky"
      :style="{ maxHeight, minWidth, marginTop }"
      style="height: fit-content"
      width="250"
    >
      <v-expansion-panels :modelValue="panel" :multiple="true">
        <v-expansion-panel
          v-for="(item, i) in matchedNavObject.children"
          :key="i"
        >
          <v-expansion-panel-title>{{ item.title }}</v-expansion-panel-title>

          <v-expansion-panel-text
            v-for="(navItem, j) in item.children"
            :key="j"
          >
            <nuxt-link
              :to="`${baseUrl}${navItem._path}`"
              class="text-decoration-none"
              :class="{
                active: `${navItem._path}/` === route.path,
              }"
              >{{ navItem.title }}</nuxt-link
            >
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
  </client-only>
</template>

<style scoped lang="scss">
a {
  color: $color-gray-100;
}
.active {
  background-color: $color-blue;
  color: $color-white;
  font-weight: bold;
  border-radius: 4px;
  padding: 4px 8px;
}
</style>
