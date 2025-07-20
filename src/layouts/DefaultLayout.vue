<script setup>
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <v-layout>
    <!-- if 電腦版顯示 -->
    <NavigationDrawer />
    <v-main>
      <router-view />
    </v-main>
    <!-- if 手機版顯示 -->
    <TheFooter />
  </v-layout>
</template>

<style scoped>
@media (min-width: 1280px) {
  .v-main {
    padding-bottom: 0;
  }
}
</style>
