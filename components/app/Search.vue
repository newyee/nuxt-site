<!-- eslint-disable vue/attribute-hyphenation  -->
<template>
  <v-dialog v-model="model" height="700" scrollable width="500">
    <template #activator="{ props: activatorProps }">
      <AppBtn
        :active="model"
        :icon="xs ? mdiMagnify : undefined"
        :prepend-icon="smAndUp ? mdiMagnify : undefined"
        v-bind="activatorProps"
      >
        ssss
      </AppBtn>
    </template>

    <!-- <v-card height="100%">
      <v-toolbar color="primary" class="ps-3 pe-4">
        <v-icon :icon="mdiMagnify" size="x-large" />

        <v-toolbar-title class="ms-2"> Vuetify </v-toolbar-title>

        <v-spacer />

        <v-btn
          class="me-n2"
          :icon="mdiClose"
          size="x-small"
          variant="text"
          @click="model = false"
        />
      </v-toolbar>

      <AppTextField
        v-model="searchString"
        :placeholder="`search.looking...`"
        autofocus
        class="flex-grow-0"
        variant="filled"
      />

      <v-card-text class="pa-4">
        <ais-instant-search :search-client="searchClient" index-name="test">
          <ais-configure :hitsPerPage="50" query="searchString" />

          <ais-hits v-slot="{ items }">
            <search-results ref="list" :groups="transformItems(items)" />
          </ais-hits>
        </ais-instant-search>
      </v-card-text>
      <AisPoweredBy class="ms-auto me-4 mb-2" />
    </v-card> -->
  </v-dialog>
</template>

<script setup lang="ts">
// Components
import SearchResults from './SearchResults.vue';
import { mdiMagnify, mdiClose } from '@mdi/js';

// Composables
import { useDisplay } from 'vuetify';
import { useI18n } from 'vue-i18n';
import { onBeforeRouteLeave, useRoute } from 'vue-router';

// Utilities
import {
  AisConfigure,
  AisHits,
  AisInstantSearch,
  AisPoweredBy,
} from 'vue-instantsearch/vue3/es/src/instantsearch.js';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import algoliasearch from 'algoliasearch';
import { AisInstantSearch } from 'vue-instantsearch/vue3/es/index.js';

// Types
import type { AlgoliaSearchHelper } from 'algoliasearch-helper';

const { t } = useI18n();
const { smAndUp, smAndDown, mdAndUp, xs } = useDisplay();
const { query } = useRoute();

const list = ref<InstanceType<typeof SearchResults>>();
const model = ref(true);
const searchString = ref('');
// const searchClient = algoliasearch(
//   'NHT6C0IV19', // docsearch app ID
//   'ffa344297924c76b0f4155384aff7ef2' // vuetify API key
// );

const locale = 'en';

onMounted(() => {
  document.addEventListener('keydown', onDocumentKeydown);
  if (query?.search) {
    searchString.value = query.search as string;
    model.value = true;
  }
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onDocumentKeydown);
});
onBeforeRouteLeave(() => {
  model.value = false;
});

function searchFunction(helper: AlgoliaSearchHelper) {
  if (helper.state.query) helper.search();
}

function onDocumentKeydown(e: KeyboardEvent) {
  if (!model.value && e.key === '/') {
    e.preventDefault();

    model.value = true;
  }
}
</script>

<style scoped>
:deep(.v-field--variant-solo) {
  box-shadow: none;
}
</style>
