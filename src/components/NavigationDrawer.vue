<script setup>
import { ref } from "vue";
import menu from "@/config/menu";
import router from "@/router";

const drawer = ref(null);

const navigateRoute = (routeName) => {
  router.push({ name: routeName });
};
</script>

<template>
  <v-navigation-drawer v-model="drawer">
    <v-sheet class="pa-4" color="grey-lighten-2">
      <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>
      <div>Welcome!</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="(item, idx) in menu"
        :key="idx"
        :prepend-icon="item.icon"
        :title="item.name"
        link
        @click="navigateRoute(item.routeName)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
