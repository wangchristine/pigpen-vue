import { createWebHistory, createRouter } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";
import LotteryIndex from "@/views/Lottery/index.vue";
import LotteryCreate from "@/views/Lottery/Create.vue";
import LoginView from "@/views/LoginView.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: HomeView,
      },
      {
        path: "/lottery",
        children: [
          {
            path: "",
            name: "Lottery",
            component: LotteryIndex,
          },
          {
            path: "create",
            name: "LotteryCreate",
            component: LotteryCreate,
          },
        ],
      },
      {
        path: "/about",
        name: "About",
        component: AboutView,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory("/pigpen-vue/"),
  routes,
});

export default router;
