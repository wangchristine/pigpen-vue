import { defineStore } from "pinia";
import { apiPostLogin } from "@/apis";
import Cookies from "js-cookie";
import { ref, watch } from "vue";

export const useCommonStore = defineStore("common", () => {
  const isLogin = ref(false);
  const isProgressLoading = ref(false);
  const showSnack = ref(false);
  const snackType = ref("info");
  const snackText = ref("");

  watch(
    () => showSnack.value,
    () => {
      if (!showSnack.value) {
        snackType.value = "info";
        snackText.value = "";
      }
    },
  );

  const login = (data) => {
    return apiPostLogin(data).then((res) => {
      isLogin.value = true;
      Cookies.set("token", res.data.token, { expires: 1 / 24 });

      setTimeout(
        () => {
          logout();
        },
        60 * 60 * 1000,
      );
    });
  };

  const logout = () => {
    isLogin.value = false;
    Cookies.remove("token");
  };

  return {
    isLogin,
    isProgressLoading,
    showSnack,
    snackType,
    snackText,

    login,
    logout,
  };
});
