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
  <v-container class="py-0 px-0" fluid>
    <v-card>
      <v-tabs v-model="tab" align-tabs="center" color="deep-purple-lighten-3" fixed-tabs>
        <v-tab value="chat">Chat</v-tab>
        <v-tab value="form">Form</v-tab>
      </v-tabs>

      <v-card-text>
        <v-carousel v-model="tab" :show-arrows="false" :continuous="false" hide-delimiters style="height: 100%">
          <v-carousel-item value="chat">
            <LotteryChat />
          </v-carousel-item>
          <v-carousel-item value="form">
            <LotteryForm />
          </v-carousel-item>
        </v-carousel>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped></style>
