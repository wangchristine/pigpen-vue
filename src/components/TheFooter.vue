<script setup>
import router from "@/router";

const navigateRoute = (routeName) => {
  router.push({ name: routeName });
};
</script>

<template>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation color="dark" grow>
      <v-btn @click="navigateRoute('Home')">
        <v-icon>mdi-heart</v-icon>
        Home
      </v-btn>
      <v-btn @click="navigateRoute('Lottery')">
        <v-icon>mdi-gift</v-icon>
        Lottery
      </v-btn>
      <v-btn @click="navigateRoute('About')">
        <v-icon>mdi-pig-variant</v-icon>
        About(TBC...)
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
