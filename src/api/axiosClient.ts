import axios, { type AxiosInstance } from "axios";

// Leemos la URL desde las variables de entorno de Vite
const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para el token (mantenemos la lógica anterior)
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
