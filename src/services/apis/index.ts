import axios from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: "http://localhost:5173",
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "comma" });
  },
});

api.interceptors.request.use((config) => {
  return config;
});

export default api;
