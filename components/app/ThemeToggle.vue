<template>
  <AppBtn
    :icon="icon"
    color="medium-emphasis"
    path="theme"
    @click="changeMode"
  />
</template>

<script setup>
// Composables
import { useTheme } from 'vuetify';
import { mdiWeatherNight } from '@mdi/js';
import { mdiWeatherSunny } from '@mdi/js';

// Utilities
import { computed } from 'vue';

const theme = useTheme();
const icon = computed(() =>
  theme.global.name.value === 'darkTheme' ? mdiWeatherNight : mdiWeatherSunny
);

const changeMode = () => {
  theme.global.name.value =
    theme.global.name.value === 'darkTheme' ? 'lightTheme' : 'darkTheme';
};
</script>
