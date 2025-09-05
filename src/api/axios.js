
// src/api/axios.js
import axios from "axios";

// 1️⃣ Create axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // <-- replace with your backend API URL
});

// 2️⃣ Add request interceptor to include token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;

