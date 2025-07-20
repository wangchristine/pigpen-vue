import Cookies from "js-cookie";
import { storeToRefs } from "pinia";
import { createWebHistory, createRouter } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useCommonStore } from "@/store/common";
import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import LotteryCreate from "@/views/Lottery/LotteryCreate.vue";
import LotteryIndex from "@/views/Lottery/LotteryIndex.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    meta: {
      auth: true,
    },
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
let isPageFirstLoad = true;

router.beforeEach((to, from, next) => {
  const commonStore = useCommonStore();
  const { isLogin, isProgressLoading } = storeToRefs(commonStore);

  if (!isPageFirstLoad) {
    isProgressLoading.value = true;
  }

  if (to.meta.auth) {
    if (Cookies.get("token") !== undefined && Cookies.get("token")) {
      next();
    } else {
      isLogin.value = false;
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  const commonStore = useCommonStore();
  const { isProgressLoading } = storeToRefs(commonStore);

  if (!isPageFirstLoad) {
    setTimeout(() => (isProgressLoading.value = false), 2000);
  } else {
    isPageFirstLoad = false;
  }
});

export default router;
