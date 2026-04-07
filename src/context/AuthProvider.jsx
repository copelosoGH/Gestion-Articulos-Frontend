import { useState, createContext, useContext } from "react";

// 1. Creamos el contexto
export const AuthContext = createContext();

// 2. Hook para usar la autenticación fácilmente en otros archivos
export const useAuth = () => useContext(AuthContext);

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