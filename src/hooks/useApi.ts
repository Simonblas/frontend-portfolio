import { useState, useCallback } from "react";

/**
 * Hook genérico para manejar el estado de las peticiones a la API.
 * <T> permite que el hook se adapte al tipo de dato que devuelva el servicio
 * (ej: Project[], UserProfile, etc.)
 */
export const useApi = <T>(apiFunction: (...args: any[]) => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useCallback evita que la función se recree innecesariamente en cada renderizado
  const request = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err: any) {
        // Capturamos el mensaje de error que definiste en tu GlobalControllerAdvice de Java
        const message =
          err.response?.data?.message || "Error de conexión con el servidor";
        setError(message);

        // Opcional: imprimir el error en consola para debugging
        console.error("API Error:", err);

        throw err; // Re-lanzamos el error por si el componente necesita manejarlo
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return {
    data, // Los datos reales (ej: la lista de proyectos)
    loading, // true mientras la petición está en viaje
    error, // El mensaje de error si algo falla
    request, // La función que disparará la llamada
    setData, // Para actualizar el estado localmente si es necesario
  };
};
