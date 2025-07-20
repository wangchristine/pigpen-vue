<script setup>
import { ref, nextTick } from "vue";

const chatBlockRef = ref(null);
const currentMessage = ref("");
const messages = ref([
  { text: "test1", isMe: true },
  { text: "test2", isMe: false },
]);

const sendMessage = () => {
  if (currentMessage.value) {
    messages.value.push({ text: currentMessage.value, isMe: true });
    currentMessage.value = "";

    nextTick(() => {
      if (chatBlockRef.value) {
        chatBlockRef.value.scrollTop = chatBlockRef.value.scrollHeight;
      }
    });
  }
};
</script>

<template>
  <div class="chat-container">
    <div ref="chatBlockRef" class="chat-block">
      <v-row v-for="(message, index) in messages" :key="index" justify="center">
        <v-col cols="12" :class="message.isMe ? 'text-right' : 'text-left'">
          <v-card :class="message.isMe ? 'my-message' : 'ai-message'" class="d-inline-block" variant="text">
            <v-card-text class="message">
              {{ message.text }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="input-block">
      <v-textarea v-model="currentMessage" class="px-2" variant="plain" rows="3" max-rows="5" no-resize></v-textarea>
      <v-btn color="deep-purple-lighten-3" icon="mdi-send" size="small" @click="sendMessage"></v-btn>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  max-width: 850px;
  margin: 0 auto;
}

.chat-block {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  width: 100%;
  height: calc(100vh - 250px);
}

.chat-block .my-message {
  background-color: #303030;
  color: white;
  border-radius: 24px;
  max-width: 60%;
  text-align: left;
}

.chat-block .ai-message {
  max-width: 100%;
  text-align: left;
}

.chat-block .message {
  padding: 8px 16px;
  font-size: 16px;
  white-space: pre-wrap;
}

.input-block {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 850px;
  border-radius: 10px;
  padding: 0 6px;
  margin-bottom: 5px;
  background-color: #303030;
  z-index: 1;

  /* 暫時 */
  border: solid 0.5px;
}

::v-deep(.input-block .v-field) {
  background-color: #303030 !important;
}

@media (max-width: 1280px) {
  .chat-block {
    height: calc(100vh - 245px - 56px);
  }
  .input-block {
    margin-bottom: 0;
    bottom: 56px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 10px);
  }
}
</style>
