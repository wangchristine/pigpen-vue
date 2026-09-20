<script setup>
import { ref, nextTick } from "vue";
import { useLotteryStore } from "@/store/lottery";

const lotteryStore = useLotteryStore();
const currentMessage = ref("");
const isAnalyzing = ref(false);
const messages = ref([
  { text: "test1", isMe: true },
  { text: "test2", isMe: false },
]);

const scrollToBottom = () => {
  nextTick(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  });
};

const sendMessage = async () => {
  const prompt = currentMessage.value.trim();

  if (!prompt || isAnalyzing.value) {
    return;
  }

  messages.value.push({ text: prompt, isMe: true });
  currentMessage.value = "";
  isAnalyzing.value = true;
  scrollToBottom();

  try {
    const res = await lotteryStore.askAI({ prompt });
    messages.value.push({ text: JSON.stringify(res, null, 2), isMe: false, isJson: true });
    messages.value.push({ text: "分析完成，資料已帶入表單區，請前往確認內容。", isMe: false });
  } catch {
    messages.value.push({ text: "分析失敗，請稍後再試，或直接前往表單區手動填寫。", isMe: false });
  } finally {
    isAnalyzing.value = false;
    scrollToBottom();
  }
};
</script>

<template>
  <div class="chat-container">
    <div class="chat-block">
      <v-row
        v-for="(message, index) in messages"
        :key="index"
        no-gutters
        class="message-row"
        :class="message.isMe ? 'message-row--user' : 'message-row--assistant'"
      >
        <v-col cols="12">
          <v-card
            :class="[message.isMe ? 'my-message' : 'ai-message', { 'json-message': message.isJson }]"
            variant="text"
          >
            <v-card-text class="message">
              <pre>{{ message.text }}</pre>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="input-block">
      <v-textarea
        v-model="currentMessage"
        class="px-2"
        variant="plain"
        rows="1"
        auto-grow
        max-rows="5"
        no-resize
        :disabled="isAnalyzing"
        @keydown.enter.exact.prevent="sendMessage"
      ></v-textarea>
      <v-btn
        color="primary"
        icon="mdi-send"
        size="small"
        :loading="isAnalyzing"
        :disabled="isAnalyzing || !currentMessage.trim()"
        aria-label="送出訊息"
        @click="sendMessage"
      ></v-btn>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  min-height: calc(100vh - 112px);
  max-width: 850px;
  margin: 0 auto;
  padding: 0 10px;
}

.chat-block {
  padding: 24px 0 180px;
  width: 100%;
}

.message-row {
  padding: 12px 0;
}

.message-row--user {
  text-align: right;
}

.message-row--assistant {
  text-align: left;
}

.chat-block .my-message,
.chat-block .ai-message {
  display: inline-block;
  max-width: 100%;
  text-align: left;
  vertical-align: top;
}

.chat-block .my-message {
  background-color: #303030;
  color: white;
  border-radius: 24px;
  max-width: 70%;
}

.chat-block .json-message .message {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  background-color: #21252b;
}

.chat-block .message {
  padding: 4px 0;
  font-size: 16px;
  line-height: 1.6;
}

.chat-block .my-message .message {
  padding: 10px 16px;
}

.chat-block .json-message .message {
  padding: 14px 16px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 14px;
  line-height: 1.55;
}

.chat-block .message pre {
  margin: 0;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.input-block {
  position: fixed;
  bottom: 24px;
  left: calc(50% + 132px);
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  width: min(850px, calc(100vw - 296px));
  min-height: 58px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 28px;
  padding: 7px 8px 7px 12px;
  background-color: #303030;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.28);
  z-index: 1;
}

::v-deep(.input-block .v-field) {
  background-color: #303030 !important;
}

::v-deep(.input-block .v-field__input) {
  -webkit-mask-image: none;
  mask-image: none;
  min-height: 44px;
  align-items: flex-start;
  padding-top: 8px;
  padding-bottom: 8px;
}

::v-deep(.input-block .v-field__outline) {
  display: none;
}

.input-block .v-btn {
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  margin-left: 6px;
}

@media (max-width: 1280px) {
  .chat-container {
    min-height: calc(100vh - 176px);
  }

  .input-block {
    bottom: 76px;
    left: 50%;
    width: calc(100vw - 20px);
  }
}
</style>
