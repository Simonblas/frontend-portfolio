import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { AuthContextType } from "../types/auth";

// Hook para acceder a la autenticación desde cualquier componente. Nos ahorra importar el Contexto y el useContext manualmente.

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // Seguridad: Si alguien intenta usar useAuth fuera del AuthProvider, avisamos del error.
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return context;
};
