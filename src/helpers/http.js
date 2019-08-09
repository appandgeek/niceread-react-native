import axios from "axios";
import { appConfig } from "./config";

export const http = axios.create({
  baseURL: appConfig.apiEndpoint,
  headers: { "Content-Type": "application/json" }
});

http.interceptors.request.use(
  function(config) {
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);
