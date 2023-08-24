<template>
  <v-menu close-delay="100" location="bottom end" open-delay="60" open-on-hover>
    <template #activator="{ props }">
      <slot name="activator" v-bind="{ props }" />
    </template>

    <AppSheet>
      <AppList nav :items="items" />
    </AppSheet>
  </v-menu>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  items: {
    type: Array as PropType<any>,
    default: () => [],
  },
});
</script>
