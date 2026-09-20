<script setup>
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <v-layout class="app-layout">
    <!-- if 電腦版顯示 -->
    <NavigationDrawer />
    <v-main class="app-main">
      <router-view />
    </v-main>
    <!-- if 手機版顯示 -->
    <TheFooter />
  </v-layout>
</template>

<style scoped>
.app-main {
  min-height: 100vh;
}

@media (max-width: 1279px) {
  .app-main {
    padding-bottom: 64px;
  }
}
</style>
