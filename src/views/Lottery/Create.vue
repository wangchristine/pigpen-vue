<script setup>
import { ref } from "vue";
import LotteryChat from "@/components/Lottery/LotteryChat.vue";
import LotteryForm from "@/components/Lottery/LotteryForm.vue";

const tab = ref(null);
</script>

<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs v-model="tab" align-tabs="center" color="primary" grow>
            <v-tab value="chat">Chat</v-tab>
            <v-tab value="form">Form</v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="chat">
                <LotteryChat />
              </v-tabs-window-item>
              <v-tabs-window-item value="form">
                <LotteryForm />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
