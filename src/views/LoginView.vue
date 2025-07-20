<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import router from "@/router";
import { useCommonStore } from "@/store/common";
import rules from "@/utils/formRule";

const visible = ref(false);
const initData = {
  password: "",
};
const commonStore = useCommonStore();
const { isProgressLoading, showSnack, snackType, snackText } = storeToRefs(commonStore);
const formValid = ref(false);
const formData = ref({ ...initData });

const login = async () => {
  if (!formValid.value) {
    return;
  }

  try {
    isProgressLoading.value = true;
    await commonStore.login(formData.value);
    router.push({ name: "Home" });
  } catch (err) {
    showSnack.value = true;
    snackType.value = "error";
    snackText.value = err.response?.data.message ?? "出錯啦! 請稍後再試";
  }
  isProgressLoading.value = false;
};
</script>

<template>
  <v-layout class="h-screen">
    <v-form v-model="formValid" @submit.prevent="login" class="w-100 h-100">
      <v-card variant="text" class="mx-auto pt-2" color="surface-variant" max-width="448">
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
          <v-btn type="submit" color="deep-purple-lighten-3" size="large" variant="tonal" block>Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-layout>
</template>
