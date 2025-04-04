<script setup>
import { ref } from "vue";
import { useCommonStore } from "@/store/common";
import rules from "@/utils/formRule";
import router from "@/router";
import { storeToRefs } from "pinia";

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
    snackText.value = err.response.data.message;
  }
  isProgressLoading.value = false;
};
</script>

<template>
  <v-container class="py-8 px-6" fluid>
    <v-form v-model="formValid" @submit.prevent="login">
      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <v-card-title class="text-h5">Login</v-card-title>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Password</div>
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

        <v-btn type="submit" class="mb-8" color="deep-purple-lighten-3" size="large" variant="tonal" block>Login</v-btn>
      </v-card>
    </v-form>
  </v-container>
</template>
