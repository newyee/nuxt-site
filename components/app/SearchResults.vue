<!--  eslint-disable vue/no-template-shadow -->
<!--  eslint-disable vue/valid-v-for -->
<!--  eslint-disable vue/require-v-for-key -->
<template>
  <v-list ref="rootEl" density="compact" nav bg-color="transparent">
    <template v-for="(group, i) in props.groups">
      <v-divider v-if="i !== 0" class="mb-2 mt-2 ms-2 me-n2" />

      <div class="text-high-emphasis font-weight-black text-uppercase">
        {{ group.name }}
      </div>

      <template v-for="(child, ci) in group.items">
        <v-list-item
          v-if="
            child.items[0]._highlightResult.hierarchy.lvl1.matchLevel === 'full'
          "
          :key="`search-${i}-${ci}`"
          to="aaa"
        >
          <v-list-item-title>
            <div
              class="d-inline-block"
              v-html="child.items[0]._highlightResult.hierarchy.lvl1.value"
            />

            <v-list-item-subtitle class="d-inline-flex ps-1">
              &rsaquo; Home
            </v-list-item-subtitle>
          </v-list-item-title>
        </v-list-item>

        <template v-else>
          <v-list-item :key="`search-${i}-${child.name}`" class="mb-0">
            <v-list-item-title v-html="child.name" />
          </v-list-item>

          <v-list-item
            v-for="(item, it) in child.items"
            :key="`search-${i}-${ci}-${it}-children`"
            :to="item.url"
            class="ps-4 mb-0"
          >
            <v-list-item-subtitle class="text-wrap font-weight-medium" />

            <v-list-item-subtitle
              v-if="item.content"
              class="text-caption text-wrap text-high-emphasis font-weight-regular ps-2"
            />
          </v-list-item>
        </template>
      </template>
    </template>
  </v-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { VList } from 'vuetify/components';

const props = defineProps<{ groups: any[] }>();
</script>

<style lang="sass" scoped>
//.v-list .v-list-item
//  min-height: 0

:deep(mark)
  background: rgb(33, 150, 243, 30%)
  color: inherit
</style>
