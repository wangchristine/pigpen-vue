import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_URL + "/api",
  // headers: {
  // temp token
  // 'Authorization': "Bearer xxx"
  // }
});

client.interceptors.request.use(
  function (config) {
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

export default client;
