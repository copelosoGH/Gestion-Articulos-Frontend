import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="nav">
      <h2>Gestión de Articulos</h2>
      <nav>
        <ul>
          <li>
            <NavLink title="Inicio" to="/inicio">Inicio</NavLink>
          </li>
          <li>
            <NavLink title="Artículos" to="/articulos">Artículos</NavLink>
          </li>
          <li>
            <NavLink title="Crear" to="/crear-articulos">Crear Artículo</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};