import axios from "axios";

const URL = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: URL,
  withCredentials: true,
});
api.defaults.withCredentials = true;
api.interceptors.request.use(
  async (config) => {
    await axios.get(URL + "csrf-cookie");
    console.log("url", config);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Accept"] = "application/json";
    console.log("Request being sent:", config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
