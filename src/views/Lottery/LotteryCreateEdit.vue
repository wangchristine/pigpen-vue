<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import LotteryChat from "@/components/Lottery/LotteryChat.vue";
import LotteryForm from "@/components/Lottery/LotteryForm.vue";
import router from "@/router";
import { useLotteryStore } from "@/store/lottery";

const route = useRoute();
const lotteryStore = useLotteryStore();
const { initData, formData } = storeToRefs(lotteryStore);
const tab = ref("form");
const isEditMode = ref(null);
const isLoading = ref(false);

onMounted(async () => {
  if (route.params.id) {
    isEditMode.value = true;
    isLoading.value = true;
    try {
      const res = await lotteryStore.getLottery(route.params.id);
      formData.value = res.data;
    } catch {
      router.push({ name: "Lottery" });
    } finally {
      isLoading.value = false;
    }
  } else {
    isEditMode.value = false;
    formData.value = { ...initData.value };
  }
});
</script>

<template>
  <v-app-bar color="surface" :height="56" flat>
    <v-app-bar-title>Lottery {{ isEditMode ? "Edit" : "Create" }}</v-app-bar-title>
  </v-app-bar>
  <v-container class="lottery-page py-0 px-0" fluid>
    <v-tabs v-model="tab" color="primary" height="56" class="lottery-tabs">
      <v-tab value="chat" class="lottery-tab">AI 分析助手</v-tab>
      <v-tab value="form" class="lottery-tab">表單區</v-tab>
    </v-tabs>
    <v-progress-linear v-if="isLoading" color="primary" indeterminate />
    <v-window v-else v-model="tab" :show-arrows="false" :touch="true" class="lottery-window">
      <v-window-item value="chat">
        <LotteryChat />
      </v-window-item>
      <v-window-item value="form">
        <LotteryForm :is-edit-mode="isEditMode" />
      </v-window-item>
    </v-window>
  </v-container>
</template>

<style scoped>
.lottery-window {
  border-top: 1px solid rgb(var(--v-theme-primary));
}

.lottery-tabs {
  width: 100%;
}

.lottery-tabs :deep(.v-slide-group__content) {
  width: 100%;
}

.lottery-tabs :deep(.v-tab) {
  flex: 1 1 0;
  max-width: none;
  min-width: 0;
}
</style>
