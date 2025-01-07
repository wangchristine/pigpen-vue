import { createWebHistory, createRouter } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LotteryView from "@/views/LotteryView.vue";
import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";

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
        path: "lottery",
        name: "Lottery",
        component: LotteryView,
      },
      {
        path: "about",
        name: "About",
        component: AboutView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/pigpen-vue/"),
  routes,
});

export default router;
