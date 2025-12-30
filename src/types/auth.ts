import type { LoginCredentials } from "../services/apiService";

// Estructura de la respuesta que recibimos del Backend (Java) al realizar un login exitoso.
export interface LoginResponse {
  token: string;
}

// Definición del estado global de autenticación que estará disponible en toda la aplicación.
export interface AuthContextType {
  token: string | null; // El JWT almacenado
  isAuthenticated: boolean; // ¿Hay un usuario logueado?
  isAdmin: boolean; // ¿El usuario tiene permisos de admin?
  loading: boolean; // ¿Estamos verificando la sesión al cargar la app?
  login: (credentials: LoginCredentials) => Promise<void>; // Función para guardar sesión
  logout: () => void; // Función para destruir sesión
}
