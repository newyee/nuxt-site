<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { computed } from 'vue';
import { useLayout } from 'vuetify';

const { mainStyles } = useLayout();
// const marginTop = mainStyles.value['--v-layout-top'];
const maxHeight = computed(
  () => `calc(100vh - ${mainStyles.value['--v-layout-top']})`
);
const minWidth = '250px';
const path = useRoute();
const filteredIds = ref<string[]>([]);

const isVisible = ref(new Array(filteredIds.value.length).fill(false));
const prevVisible = ref(new Array(filteredIds.value.length).fill(false));
const checkElementVisibility = () => {
  const targetElements = document.querySelectorAll('h2');
  const windowHeight = window.innerHeight;
  let hasVisibleElement = false; // 一つ以上の要素が画面内にあるかどうかを保持する変数

  targetElements.forEach((element, index) => {
    const elementRect = element.getBoundingClientRect();
    isVisible.value[index] =
      elementRect.top >= 0 && elementRect.bottom <= windowHeight;
    hasVisibleElement = hasVisibleElement || isVisible.value[index]; // 一つ以上の要素が画面内にある場合に true にする
  });

  // 一つも要素が画面内にない場合、前回のスクロール時の状態に戻す
  if (!hasVisibleElement) {
    isVisible.value = prevVisible.value;
  }
  prevVisible.value = [...isVisible.value]; // 現在のスクロール時の状態をprevVisibleにコピー
};
let changePath = '';
onMounted(async () => {
  // 初期表示時にチェック
  checkElementVisibility();
  // スクロール時にチェック
  window.addEventListener('scroll', checkElementVisibility);
  if (path.path !== '/' && path.path.endsWith('/')) {
    changePath = path.path.replace(/\/+$/, '');
  }
  const data = await queryContent()
    .where({ _path: `${changePath}` })
    .findOne();
  const filteredChildren = data.body.children
    .filter((item: { tag: string }) => item.tag === 'h2')
    .map((item: any) => item);
  filteredIds.value = filteredChildren.map(
    (item: { props: { id: any } }) => item.props.id
  );
});
</script>

<template>
  <v-menu location="bottom">
    <template v-slot:activator="{ props }">
      <button v-bind="props" class="mt-16 pt-3">Table of Contents</button>
    </template>
    <v-list>
      <v-list-item>
        <div class="ml-6 green">
          <nuxt-link
            v-for="(id, index) in filteredIds"
            :key="id"
            :to="`#${id}`"
            class="toc-contents text-decoration-none d-block"
            :class="{ visible: isVisible[index] }"
            >{{ id }}</nuxt-link
          >
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped lang="scss">
.toc-contents {
  color: $color-gray-100;
}
.visible {
  color: $color-toc-text-visible;
}
</style>
