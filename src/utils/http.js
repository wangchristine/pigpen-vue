import axios from "axios";
import Cookies from "js-cookie";
import { useCommonStore } from "@/store/common";

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_URL + "/api",
  // headers: {
  // temp token
  // 'Authorization': "Bearer xxx"
  // }
});

client.interceptors.request.use(
  function (config) {
    useCommonStore().setLoading(true);
    if (Cookies.get("token") !== undefined && Cookies.get("token")) {
      config.headers["Authorization"] = "Bearer " + Cookies.get("token");
    }
    return config;
  },
  function (error) {
    console.log("interceptors", error);
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => {
    useCommonStore().setLoading(false);
    return response;
  },
  (error) => {
    const commonStore = useCommonStore();
    commonStore.setLoading(false);
    commonStore.apiErrorSnack(error);

    return Promise.reject(error);
  },
);

export default client;
