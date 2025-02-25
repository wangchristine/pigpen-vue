<script setup>
import { ref } from "vue";

const currentMessage = ref("");
const messages = ref([
  { text: "test1", isMe: true },
  { text: "test2", isMe: false },
]);

const sendMessage = () => {
  if (currentMessage.value) {
    messages.value.push({ text: currentMessage.value, isMe: true });
    currentMessage.value = "";
  }
};
</script>

<template>
  <div class="chat-block">
    <v-row v-for="(message, index) in messages" :key="index" justify="center">
      <v-col cols="12" :class="message.isMe ? 'text-right' : 'text-left'">
        <v-card :class="message.isMe ? 'my-message' : 'ai-message'" class="d-inline-block">
          <v-card-text>
            {{ message.text }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <v-row class="align-center no-wrap">
    <v-col class="flex-grow-1">
      <v-textarea
        v-model="currentMessage"
        class="py-2"
        label="Please Type..."
        variant="outlined"
        rows="5"
        no-resize
        clearable
      ></v-textarea>
    </v-col>
    <v-col class="flex-shrink-0" cols="auto">
      <v-btn color="deep-purple-lighten-3" icon="mdi-send" size="small" @click="sendMessage"></v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>
.my-message {
  background-color: #b39ddb;
  color: white;
  border-radius: 24px;
  max-width: 60%;
  text-align: left;
}

.ai-message {
  max-width: 100%;
  text-align: left;
}

.chat-block {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
}

.v-card-text {
  padding: 10px 20px;
}
</style>
