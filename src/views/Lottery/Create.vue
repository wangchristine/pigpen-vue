<script setup>
import { ref } from "vue";

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
                <v-row class="align-center no-wrap">
                  <v-col class="flex-grow-1">
                    <v-textarea class="py-2" label="Please Type..." variant="outlined" rows="5"></v-textarea>
                  </v-col>
                  <v-col class="flex-shrink-0" cols="auto">
                    <v-btn color="primary" icon="mdi-send" size="small"></v-btn>
                  </v-col>
                </v-row>
              </v-tabs-window-item>
              <v-tabs-window-item value="form"> Form </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
