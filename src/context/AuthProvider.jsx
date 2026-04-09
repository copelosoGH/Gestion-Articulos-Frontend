import { useState, createContext, useContext } from "react";
import { Navigate } from "react-router-dom";

// 1. Creamos el contexto
export const AuthContext = createContext();

// 2. Hook para usar la autenticación fácilmente en otros archivos
export const useAuth = () => useContext(AuthContext);

// 3. Componente para rutas protegidas
export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate 
              to="/login" 
              state={{ mensaje: "Primero debe loguearse para poder crear un articulo" }} 
              replace 
           />;
  }

  return children;
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const user = localStorage.getItem("user");
        return (user && user !== "undefined") ? JSON.parse(user) : {};
    });

    const logout = () => {
        localStorage.clear();
        setAuth({});
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};