// src/api/axios.js
import axios from "axios";
import { BACKEND_URL } from "../config";

const API = axios.create({
  baseURL: BACKEND_URL,
});

// ✅ Automatically attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
