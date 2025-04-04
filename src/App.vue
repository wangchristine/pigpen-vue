<script setup>
import ProgressLoading from "@/components/ProgressLoading.vue";
import SnackBar from "@/components/SnackBar.vue";
</script>

<template>
  <v-app>
    <ProgressLoading />
    <SnackBar />
    <router-view />
  </v-app>
</template>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
