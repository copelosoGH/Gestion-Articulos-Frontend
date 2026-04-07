import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const Header = () => {
  const { auth, logout } = useAuth();

  return (
    <header className="nav">
      <h2>Gestión de Artículos</h2>
      <nav>
        <ul className="nav-list">
          <div className="main-links">
            <li><NavLink title="Artículos" to="/articulos">Artículos</NavLink></li>
            <li><NavLink title="Crear" to="/crear-articulos">Crear Artículo</NavLink></li>
          </div>

          <div className="auth-links">
            {auth._id ? (
              <>
                <li className="user-info">
                  <span>Hola, <strong>{auth.nombre}</strong></span>
                </li>
                <li>
                  <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
                </li>
              </>
            ) : (
              <>
                <li><NavLink title="Login" to="/login">Login</NavLink></li>
                <li><NavLink title="Registro" to="/registro">Registro</NavLink></li>
              </>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};