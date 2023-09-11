<template>
  <v-card class="" width="300">
    <v-list v-model:opened="open" open-strategy="multiple">
      <v-list-item :prepend-icon="mdiClose"></v-list-item>

      <v-list-group value="Admin">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Admin"></v-list-item>
        </template>

        <v-list-item
          v-for="([title], i) in admins"
          :key="i"
          :title="title"
          :value="title"
          color="blue"
        ></v-list-item>
      </v-list-group>

      <v-list-group value="Actions">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Actions"></v-list-item>
        </template>

        <v-list-item
          v-for="([title, icon], i) in cruds"
          :key="i"
          :value="title"
          :title="title"
          :prepend-icon="icon"
        ></v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>
<script setup>
import { mdiClose, mdiAccountMultipleOutline } from '@mdi/js';

const open = ref(['Admin']);

const admins = [
  ['Management', 'mdi-account-multiple-outline'],
  ['Settings', 'mdi-cog-outline'],
];

const cruds = [
  ['Create', 'mdi-plus-outline'],
  ['Read', 'mdi-file-outline'],
  ['Update', 'mdi-update'],
  ['Delete', 'mdi-delete'],
];
</script>
<style scoped>
.custom-active {
  color: red;
  background-color: none;
  /* Add any other desired styles for active items here */
}
</style>
