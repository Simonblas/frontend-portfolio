import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import type { AuthContextType } from "../types/auth";
import { authService } from "../services/apiService";
import type { LoginCredentials } from "../services/apiService";

// 1. Crear el contexto con un valor inicial vacío
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 2. Función para iniciar sesión
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const data = await authService.login(credentials);
      // Asumiendo que tu backend devuelve el token en data.token o data.accessToken
      const newToken = data.token;

      localStorage.setItem("authToken", newToken);
      setToken(newToken);
    } catch (error) {
      throw error; // Re-lanzamos para que el componente Login maneje el error visual
    }
  }, []);

  // 3. Función para cerrar sesión
  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setToken(null);
  }, []);

  // 4. Efecto para recuperar la sesión al cargar la app
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  // 5. Memorizar el valor para optimizar el rendimiento
  const value = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      isAdmin: !!token, // En tu portfolio, si tienes token, eres el admin
      loading,
      login,
      logout,
    }),
    [token, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
