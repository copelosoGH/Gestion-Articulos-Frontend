import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const Header = () => {
  const { auth, logout } = useAuth();

  return (
    <header className="nav">
      <h2>Gestión de Artículos</h2>
      <nav style={{ flexGrow: 1 }}>
        <ul className="nav-list">
          
          <div className="main-links">
            <li>
              <NavLink title="Artículos" to="/articulos">Artículos</NavLink>
            </li>
            <li>
              <NavLink title="Crear" to="/crear-articulos">Crear Artículo</NavLink>
            </li>
          </div>

          <div className="auth-links">
            {/* CORRECCIÓN: Usamos 'auth.id' (sin guion bajo) que es lo que viene del token */}
            {auth && auth.id ? (
              <>
                <li className="user-info" style={{ marginBottom: "1rem" }}>
                  <span style={{ fontWeight: "800", color: "var(--primary)" }}>
                    {auth.nombre}
                  </span>
                </li>
                <li>
                  <button onClick={logout} className="btn-logout" style={ {color: "#ef4444"}}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink title="Login" to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink title="Registro" to="/registro">Registro</NavLink>
                </li>
              </>
            )}
          </div>

        </ul>
      </nav>
    </header>
  );
};