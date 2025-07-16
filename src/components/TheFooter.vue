<script setup>
import menu from "@/config/menu";
import router from "@/router";

const navigateRoute = (routeName) => {
  router.push({ name: routeName });
};
</script>

<template>
  <v-bottom-navigation class="position-fixed d-lg-none" grow>
    <v-btn v-for="(item, idx) in menu" :key="idx" @click="navigateRoute(item.routeName)">
      <v-icon>{{ item.icon }}</v-icon>
      {{ item.name }}
    </v-btn>
  </v-bottom-navigation>
</template>
