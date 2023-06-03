import axios from "axios";

const baseURL = `${window.location.protocol}//${window.location.host}/${
  import.meta.env.VITE_API_URL
}`;
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
