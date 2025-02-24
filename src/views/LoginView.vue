<script setup>
import SnackBar from "@/components/SnackBar.vue";
import { ref } from "vue";

const visible = ref(false);
</script>

<template>
  <SnackBar :show="true" text="你已登出" />
  <v-container class="py-8 px-6" fluid>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-card-title class="text-h5">Login</v-card-title>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Password</div>
      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn class="mb-8" color="deep-purple-lighten-3" size="large" variant="tonal" block>Login</v-btn>
    </v-card>
  </v-container>
</template>
