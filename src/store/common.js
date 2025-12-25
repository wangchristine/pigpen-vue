import Cookies from "js-cookie";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { apiPostLogin } from "@/apis";

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

  const setLoading = (loading) => {
    isProgressLoading.value = loading;
  };

  const apiErrorSnack = (error) => {
    showSnack.value = true;
    snackType.value = "error";
    snackText.value = error.response?.data.message ?? "出錯啦! 請稍後再試";
  };

  const login = async (data) => {
    return await apiPostLogin(data).then((res) => {
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

    setLoading,
    apiErrorSnack,
    login,
    logout,
  };
});
