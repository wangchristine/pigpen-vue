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
const { lotteryList, initData, formData } = storeToRefs(lotteryStore);
const tab = ref("form");
const isEditMode = ref(null);

onMounted(() => {
  if (route.params.id) {
    isEditMode.value = true;
    formData.value = lotteryList.value.filter((lottery) => lottery.id == route.params.id);
    if (!formData.value || formData.value.length == 0) {
      router.push({ name: "Lottery" });
    }
  } else {
    isEditMode.value = false;
    formData.value = [{ ...initData.value }];
  }
});
</script>

<template>
  <v-app-bar :height="56">
    <v-app-bar-title>Lottery {{ isEditMode ? "Edit" : "Create" }}</v-app-bar-title>
  </v-app-bar>
  <v-container class="py-0 px-0" height="100%" fluid>
    <v-tabs v-model="tab" align-tabs="center" color="deep-purple-lighten-3" height="56" fixed-tabs>
      <v-tab value="chat">AI 分析助手</v-tab>
      <v-tab value="form">表單區</v-tab>
    </v-tabs>
    <v-carousel
      v-model="tab"
      :show-arrows="false"
      :continuous="false"
      hide-delimiters
      style="height: 100%; border-top: solid #b39ddb 0.5px"
    >
      <v-carousel-item value="chat">
        <LotteryChat />
      </v-carousel-item>
      <v-carousel-item value="form">
        <LotteryForm :is-edit-mode="isEditMode" />
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<style scoped></style>
