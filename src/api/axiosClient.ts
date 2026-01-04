import axios, { type AxiosInstance } from "axios";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * INTERCEPTOR DE PETICIÓN (Request)
 * Se encarga de ADJUNTAR el token antes de que la orden salga al servidor.
 */
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

/**
 * INTERCEPTOR DE RESPUESTA (Response)
 * Se encarga de REACCIONAR cuando el servidor responde.
 * Ideal para manejar la expiración del token (Error 401).
 */
axiosClient.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa (200-299), la devolvemos tal cual
    return response;
  },
  (error) => {
    // Si el servidor responde con 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn("Token expired or invalid. Redirecting to login...");

      // Limpiamos el token viejo para que no intente usarlo más
      localStorage.removeItem("authToken");

      // Redirigimos al usuario al login si no está ya ahí
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    // Devolvemos el error para que los componentes (como SkillManagement)
    // puedan capturarlo en su propio try/catch
    return Promise.reject(error);
  }
);

export default axiosClient;
