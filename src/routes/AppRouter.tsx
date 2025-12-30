import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Home from "../pages/Public/Home";
import { Dashboard } from "../pages/Admin/Dashboard";
import Login from "../pages/Public/Login";
import { MainLayout } from "../components/layout/MainLayout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas Protegidas (Solo Admin) */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<Dashboard />} />
          </Route>

          {/* Ruta 404 - Por si escriben cualquier cosa */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
