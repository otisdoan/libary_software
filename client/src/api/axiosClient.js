import axios from "axios";

const instance = axios.create({
  baseURL: "https://libary-software-ucin.vercel.app",
  headers: {
    "Content-Type": "application/json",
  }
});
export default instance;

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)