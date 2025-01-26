<script setup>
import { ref } from "vue";
import LotteryChat from "@/components/Lottery/LotteryChat.vue";
import LotteryForm from "@/components/Lottery/LotteryForm.vue";

const tab = ref(null);
</script>

<template>
  <v-app-bar>
    <v-app-bar-title>Lottery Create</v-app-bar-title>
  </v-app-bar>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs v-model="tab" align-tabs="center" color="deep-purple-lighten-3" grow>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
