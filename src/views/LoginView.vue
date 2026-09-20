<script setup>
import { ref } from "vue";
import router from "@/router";
import { useCommonStore } from "@/store/common";
import rules from "@/utils/formRule";

const visible = ref(false);
const initData = {
  password: "",
};
const commonStore = useCommonStore();
const formValid = ref(false);
const formData = ref({ ...initData });

const login = async () => {
  if (!formValid.value) {
    return;
  }

  await commonStore.login(formData.value);
  router.push({ name: "Home" });
};
</script>

<template>
  <v-layout class="login-layout min-h-screen justify-center align-center pa-4">
    <v-form v-model="formValid" class="login-form w-100" @submit.prevent="login">
      <v-card variant="outlined" class="mx-auto" color="surface-variant" max-width="448">
        <v-card-title class="text-h4 px-8 py-4">Login</v-card-title>
        <v-card-text class="px-8">
          <div class="text-h6 text-medium-emphasis d-flex align-center justify-space-between">Password</div>
          <v-text-field
            v-model="formData.password"
            :rules="[rules.required]"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="px-8 pb-8">
          <v-btn type="submit" color="primary" size="large" variant="flat" block>Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-layout>
</template>

<style scoped>
.login-layout {
  min-height: 100vh;
  background: rgb(var(--v-theme-background));
}

.login-form {
  max-width: 448px;
}
</style>
