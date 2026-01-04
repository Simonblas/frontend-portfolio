import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Mientras se verifica si hay un token en localStorage, no mostramos nada
  //   verificar estilos del div
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-blue-500">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  // Si no está autenticado, redirigir al login
  // Si lo está, renderizar el contenido de la ruta (Outlet)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
