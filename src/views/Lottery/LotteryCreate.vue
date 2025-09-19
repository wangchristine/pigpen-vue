<script setup>
import { ref } from "vue";
import LotteryChat from "@/components/Lottery/LotteryChat.vue";
import LotteryForm from "@/components/Lottery/LotteryForm.vue";

const tab = ref(null);
</script>

<template>
  <v-app-bar :height="56">
    <v-app-bar-title>Lottery Create</v-app-bar-title>
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
        <LotteryForm />
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<style scoped></style>
