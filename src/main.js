import "./assets/main.css";
import "@mdi/font/css/materialdesignicons.css";

import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDateInput } from 'vuetify/labs/VDateInput'

const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput,
  },
  directives,
  icons: {
    defaultSet: "mdi",
  },
  theme: {
    defaultTheme: "oneDarkTheme",
    themes: {
      oneDarkTheme: {
        dark: true,
        colors: {
          background: "#282C34", // 主背景
          surface: "#21252B", // 卡片或表面顏色
          primary: "#61AFEF", // 主色（例如按鈕等）
          secondary: "#98C379", // 次色
          accent: "#C678DD", // 強調色
          error: "#E06C75", // 錯誤
          info: "#56B6C2", // 信息
          success: "#98C379", // 成功
          warning: "#D19A66", // 警告
        },
      },
    },
  },
});

createApp(App).use(router).use(vuetify).mount("#app");
