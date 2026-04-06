import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Inicio } from "../pages/Inicio";
import { Articulos } from "../pages/Articulos";
import { Crear } from "../pages/Crear";
import { Header } from "../components/Header";

export const Rutas = () => {
  return (
    <BrowserRouter>
      <div className="layout">
        <Header />
        
        <section className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/articulos" element={<Articulos />} />
            <Route path="/crear-articulos" element={<Crear />} />
            <Route path="*" element={<h1>Error 404</h1>} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
};