<script setup lang="ts"></script>

<template>
  <!-- コンテナ要素にクラス "footer-container" を追加 -->
  <div class="footer-container">
    <client-only>
      <v-footer>
        <v-row justify="center" no-gutters>
          <AppThemeToggle />
          <v-col
            class="primary lighten-2 py-4 text-center white--text"
            cols="12"
          >
            <strong>Copyright {{ new Date().getFullYear() }} vuetify </strong>
          </v-col>
        </v-row>
      </v-footer>
    </client-only>
  </div>
</template>
<style lang="scss">
.footer-container {
  // border-top: 1px solid $footer-border-color; /* ボーダーのスタイルと色を指定 */
}
.footer-container::before {
  content: '';
  display: block;
  border-top: 1px solid #e0e0e0;
  width: 200%;
  margin-left: -50%;
}
</style>
