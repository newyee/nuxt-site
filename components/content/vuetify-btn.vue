<script setup lang="ts">
import { mdiNuxt, mdiVuetify } from '@mdi/js';
</script>

<template>
  <div>
    <v-icon :icon="mdiNuxt" />
    <v-btn :prepend-icon="mdiVuetify">Vuetifyボタン</v-btn>
  </div>
</template>
