// utils/api.ts
import axios from "axios";

// --------------------
// Public API (no token)
// --------------------
export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://yantra.genesiswtech.com",
  // Do not set Content-Type if you may send FormData
});

// Optional: log requests
publicApi.interceptors.request.use((config) => {
  console.log("[Public API] Request:", config.url);
  return config;
});

// --------------------
// Private API (with token)
// --------------------
export const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://yantra.genesiswtech.com",
  // Do not set Content-Type here either; let Axios handle JSON or FormData
});

// Add token automatically
privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("[Private API] Request:", config.url);
  return config;
});

