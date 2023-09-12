<script setup lang="ts"></script>

<template>
  <!-- コンテナ要素にクラス "footer-container" を追加 -->
  <div class="footer-container">
    <client-only>
      <v-footer border="t">
        <v-container>
          <v-row justify="center" no-gutters>
            <AppThemeToggle />
            <v-col
              class="primary lighten-2 py-4 text-center white--text"
              cols="12"
            >
              <strong>Copyright {{ new Date().getFullYear() }} vuetify </strong>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </client-only>
  </div>
</template>
<style lang="scss">
.v-container {
  // max-width: 1190px !important;
}
</style>
