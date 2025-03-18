import { defineStore } from "pinia";
import { apiPostLogin } from "@/apis";

export const useCommonStore = defineStore("common", () => {
  const login = (data) => {
    return apiPostLogin(data);
  };

  return {
    login,
  };
});
