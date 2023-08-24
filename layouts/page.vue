<template>
  <AppMenu key="language-menu" :open-on-hover="false" :items="items">
    <template #activator="{ props }">
      <AppTooltipBtn
        color="medium-emphasis"
        :icon="icon"
        path="languages"
        v-bind="props"
      />
    </template>
  </AppMenu>
</template>

<script setup>
import { mdiTranslate } from '@mdi/js';
const icon = mdiTranslate;
const items = [
  {
    title: 'English',
    value: 'en',
  },
  {
    title: '日本語',
    value: 'ja',
  },
];
</script>
