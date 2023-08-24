<script setup lang="ts">
const { prev, next } = useContent();
</script>
<template>
  <!-- prevまたはnextが存在する場合、ナビゲーションリンクを表示 -->
  <client-only>
    <div v-if="prev || next">
      <v-row justify="center" class="mt-6 mb-6">
        <v-btn
          v-if="prev"
          :to="`${prev._path}`"
          class="text-decoration-none mr-5"
        >
          {{ prev.title }}
        </v-btn>
        <v-btn v-if="next" :to="`${next._path}`" class="text-decoration-none">
          {{ next.title }}
        </v-btn>
      </v-row>
    </div>
  </client-only>
</template>
