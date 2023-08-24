<template>
  <span class="v-app-tooltip-btn d-inline-block">
    <v-btn :aria-label="path" v-bind="$attrs" icon>
      <v-icon :icon="icon" />
      <v-tooltip
        activator="parent"
        class="v-app-tooltip-btn__content"
        location="bottom"
        open-delay="200"
      >
        Languages
      </v-tooltip>
    </v-btn>
  </span>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  path: String,
});
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<style lang="sass">
.v-app-tooltip-btn__content p
  margin: 0
</style>
