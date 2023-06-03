import axios from "axios";

const baseURL =
  import.meta.env.VITE_NODE_ENV !== "PRODUCTION"
    ? `${window.location.protocol}//${window.location.host}/${
        import.meta.env.VITE_API_URL
      }`
    : import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
