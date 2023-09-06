<script setup lang="ts">
import { computed } from 'vue';
import { useLayout } from 'vuetify';
import { mdiChevronDown } from '@mdi/js';

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
  <v-card class="mobile-navigation-menu">
    <v-list dense>
      <v-item-group>
        <v-list-item v-for="(item, i) in matchedNavObject.children" :key="i">
          <v-list-item-content>
            <v-list-item-title class="menu-title">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon class="menu-icon" :icon="mdiChevronDown" />
          </v-list-item-action>

          <v-expand-transition>
            <v-list-group
              no-action
              sub-group
              v-model="item.expanded"
              :prepend-icon="
                item.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
              "
              class="submenu-group"
            >
              <v-list-item
                v-for="(navItem, j) in item.children"
                :key="j"
                @click="navigateTo(navItem._path)"
                :class="{ active: `${navItem._path}/` === route.path }"
              >
                {{ navItem.title }}
              </v-list-item>
            </v-list-group>
          </v-expand-transition>
        </v-list-item>
      </v-item-group>
    </v-list>
  </v-card>
</template>

<style scoped lang="scss">
.mobile-navigation-menu {
  width: 250px;
}

.menu-title {
  cursor: pointer;
}

.menu-icon {
  cursor: pointer;
}

.submenu-group {
  padding-left: 16px;
}

.active {
  background-color: $color-blue;
  color: $color-white;
  font-weight: bold;
  border-radius: 4px;
  padding: 4px 8px;
}
</style>
