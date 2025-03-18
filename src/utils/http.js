import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_URL + "api",
  // headers: {
  // temp token
  // 'Authorization': "Bearer xxx"
  // }
});

client.interceptors.request.use(
  function (config) {
    if (Cookies.get("auth") !== undefined && JSON.parse(Cookies.get("auth")).token) {
      config.headers.common["Authorization"] = "Bearer " + JSON.parse(Cookies.get("auth")).token;
    }
    return config;
  },
  function (error) {
    console.log("interceptors", error);
    return Promise.reject(error);
  },
);

export default client;
