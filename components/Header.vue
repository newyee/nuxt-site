<script setup lang="ts">
import { algoliasearch } from 'algoliasearch';
import { ref, onMounted, onBeforeUnmount, provide } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import {
  AisInstantSearch,
  AisHits,
  AisConfigure,
  AisPoweredBy,
} from 'vue-instantsearch/vue3/es/index.js';
import { mdiMagnify, mdiClose } from '@mdi/js';
import { useDisplay } from 'vuetify';
// import type { AlgoliaSearchHelper } from 'algoliasearch-helper';

const drawerClicked = ref(false);

const handleDrawerClick = () => {
  emits('mobileDrawerClicked', !props.mobileDrawer);
  console.log('test', !props.mobileDrawer);
};
const props = defineProps<{
  mobileDrawer: boolean;
}>();
const emits = defineEmits<{
  (e: 'mobileDrawerClicked', mobileDrawer: boolean): void;
}>();

const algolia = useAlgoliaRef();
const { locale, setLocale } = useI18n();

const drawer = ref(true);
const shouldShowDrawer = ref(false);

// ウィンドウ幅が1023px未満の場合にナビゲーションドロワーを非表示にする
const handleResize = () => {
  shouldShowDrawer.value = window.innerWidth <= 1023;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
let indexName = '';

switch (locale.value) {
  case 'ja':
    indexName = 'test-ja';
    break;

  case 'en':
    indexName = 'test-en';
    break;
}

const { smAndUp, smAndDown, mdAndUp, xs } = useDisplay();
const searchModalIsVisible = ref(false);
const searchString = ref('');

onMounted(() => {
  document.addEventListener('keydown', onDocumentKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

onBeforeRouteLeave(() => {
  searchModalIsVisible.value = false;
});

// function searchFunction(helper: AlgoliaSearchHelper) {
//   if (helper.state.query) helper.search();
// }

function onDocumentKeydown(e: KeyboardEvent) {
  if (!searchModalIsVisible.value && e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    searchModalIsVisible.value = true;
  } else if (
    searchModalIsVisible.value &&
    ['ArrowDown', 'ArrowUp'].includes(e.key)
  ) {
  }
}
</script>

<template>
  <v-app-bar flat border="b">
    <v-container>
      <v-app-bar-nav-icon
        variant="text"
        v-if="shouldShowDrawer"
        @click="handleDrawerClick()"
      ></v-app-bar-nav-icon>
      <AppThemeToggle />
      <AppLanguageMenu />
      <v-dialog
        v-model="searchModalIsVisible"
        height="700"
        scrollable
        width="500"
      >
        <template #activator="{ props: activatorProps }">
          <AppBtn
            :active="searchModalIsVisible"
            :icon="xs ? mdiMagnify : undefined"
            :prepend-icon="smAndUp ? mdiMagnify : undefined"
            v-bind="activatorProps"
          >
            <span :class="mdAndUp && 'me-n1'">
              <span v-if="smAndUp">Search</span>
              <span
                :class="[
                  smAndDown ? 'border-opacity-0' : 'py-1 px-2 ms-2',
                  'border rounded text-disabled text-caption',
                ]"
              >
                <span v-if="mdAndUp">CTRL+K </span>
              </span>
            </span>
          </AppBtn>
        </template>

        <v-card height="100%">
          <v-toolbar color="primary" class="ps-3 pe-4">
            <v-icon :icon="mdiMagnify" size="x-large" />

            <v-toolbar-title class="ms-2"> Vuetify </v-toolbar-title>

            <v-spacer />

            <v-btn
              class="me-n2"
              :icon="mdiClose"
              size="x-small"
              variant="text"
              @click="searchModalIsVisible = false"
            />
          </v-toolbar>

          <AppTextField
            v-model="searchString"
            :placeholder="`search.looking...`"
            class="flex-grow-0"
            variant="filled"
          />
        </v-card>
      </v-dialog>
    </v-container>
  </v-app-bar>
</template>
<style lang="scss">
.v-container {
  // max-width: 1190px !important;
}
</style>
