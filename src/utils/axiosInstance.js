import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";
import { logoutUser } from "../api/auth-api";

const api = axios.create({
  baseURL: backendConfig.base,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      logoutUser("/login");
    }

    if (status === 503) {
      logoutUser("/maintenance");
    }

    return Promise.reject(error);
  }
);

export default api;
