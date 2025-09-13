// src/config.js

// ✅ Backend URLs for different environments
const DEV_BACKEND_URL = "http://localhost:8080/api"; // Local backend
const PROD_BACKEND_URL = "https://notes-backendapp.onrender.com/";
 // Deployed backend

// ✅ Determine which backend to use based on environment
export const BACKEND_URL =
  process.env.NODE_ENV === "development" ? DEV_BACKEND_URL : PROD_BACKEND_URL;
