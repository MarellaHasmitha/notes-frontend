import axios from "axios";
import { BACKEND_URL } from "../config";

console.log("🔗 Using backend:", BACKEND_URL); // Debug

const API = axios.create({
  baseURL: BACKEND_URL.endsWith("/") ? BACKEND_URL : `${BACKEND_URL}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
