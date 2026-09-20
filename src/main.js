import "./assets/main.css";
import "@mdi/font/css/materialdesignicons.css";

import { createPinia } from "pinia";
import { createApp } from "vue";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDateInput } from "vuetify/labs/VDateInput";
import App from "./App.vue";
import router from "./router";

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
          primary: "#B39DDB", // 主色（例如按鈕等）
          secondary: "#98C379", // 次色
          accent: "#C678DD", // 強調色
          error: "#E06C75", // 錯誤
          info: "#56B6C2", // 信息
          success: "#98C379", // 成功
          warning: "#D19A66", // 警告
          "on-primary": "#1F1B24",
          "on-secondary": "#1F1B24",
          "on-accent": "#1F1B24",
          "on-error": "#1F1B24",
          "on-info": "#1F1B24",
          "on-success": "#1F1B24",
          "on-warning": "#1F1B24",
        },
      },
    },
  },
});
const pinia = createPinia();

createApp(App).use(router).use(vuetify).use(pinia).mount("#app");
