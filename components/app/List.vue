<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref, reactive } from 'vue';

const router = useRouter();
const { locale, setLocale } = useI18n();
const languages = reactive([
  { title: 'English', value: ref('en') },
  { title: '日本語', value: ref('ja') },
]);
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  nav: Boolean,
});

// 選択したアイテムを処理する関数

function changeLocale(newLocale) {
  console.log(newLocale);
  const currentLocale = locale.value;
  if (currentLocale !== newLocale) {
    setLocale(newLocale);
    const currentPath = router.currentRoute.value.path;
    const newPath = currentPath.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  }
}
</script>
<template>
  <v-list
    :items="languages"
    :nav="nav"
    :lines="false"
    color="primary"
    density="compact"
    item-props
  >
    <template #divider>
      <slot name="divider" />

      <v-divider v-if="!$slots.divider" class="my-3 mb-4 ms-2 me-n2" />
    </template>

    <!-- リストアイテムをループ表示 -->
    <v-list-item
      v-for="(item, index) in items"
      :key="index"
      @click="changeLocale(item.value)"
    >
      <!-- ここにアイテムの表示内容を追加 -->
      <v-list-item-content>
        {{ item.title }}
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
