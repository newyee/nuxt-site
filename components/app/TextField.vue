<template>
  <v-text-field
    placeholder="test"
    base-color="disabled"
    hide-details
    persistent-placeholder
    :prepend-inner-icon="mdiMagnify"
    single-line
    variant="outlined"
  />
</template>

<script setup>
import { mdiMagnify } from '@mdi/js';
</script>
