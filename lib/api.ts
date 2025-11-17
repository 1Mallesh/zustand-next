import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional interceptor for logging or auth tokens
api.interceptors.request.use((config) => {
  console.log("API Request:", config.url);
  return config;
});

export default api;
