import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Articulos } from "../pages/Articulos";
import { Crear } from "../pages/Crear";
import { Header } from "../components/Header";
import { Login } from "../pages/Login";
import { Registro } from "../pages/Registro";
// 1. IMPORTA EL PROVIDER
import { AuthProvider, ProtectedRoute } from "../context/AuthProvider";

export const Rutas = () => {
  return (
    <BrowserRouter>

      <AuthProvider>
        
        <div className="layout">
          <Header />

          <section className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/articulos" />} />
              <Route path="/articulos" element={<Articulos />} />
              <Route path="/crear-articulos" element={<ProtectedRoute><Crear /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="*" element={<h1>Error 404</h1>} />
            </Routes>
          </section>
        </div>

      </AuthProvider>

    </BrowserRouter>
  );
};