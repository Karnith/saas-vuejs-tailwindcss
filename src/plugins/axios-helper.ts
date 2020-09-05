import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import store from "@/store";
import router from "@/router";
import { i18n } from "@/plugins/vue-i18n";

declare module "axios" {
  export interface AxiosRequestConfig {
    masterDatabase: boolean;
  }
}
let apiUrl = process.env.VUE_APP_API_URL?.toString();
if (apiUrl?.includes("[HOSTNAME]")) {
  apiUrl = apiUrl.replace("[HOSTNAME]", location.hostname);
}
const config: AxiosRequestConfig = {
  baseURL: apiUrl,
  masterDatabase: false,
};
const server: AxiosInstance = axios.create(config);

server.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized, logging out ...");
      store.commit("auth/logout");
      router.replace("/account/login");
    } else if (error.response && error.response.data) {
      let errorDescription = i18n.t(error.response.data);
      if (!errorDescription) {
        errorDescription = error.response.data;
      }
      return Promise.reject(errorDescription);
    }
    return Promise.reject(error);
  }
);

server.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers.common["Access-Control-Allow-Origin"] = "*";
    if (store.state.tenant.current && !config.masterDatabase) {
      config.headers.common["X-Tenant-Key"] = store.state.tenant.current.apiKey;
    }
    const authToken = store.state.auth.token;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default server;
