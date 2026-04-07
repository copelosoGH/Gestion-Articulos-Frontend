import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Global } from "../services/Global";
import { useAuth } from "../context/AuthProvider"; // Usamos el hook
import axios from "axios";

export const Login = () => {
    const { formulario, cambiado } = useForm({});
    const [identificado, setIdentificado] = useState("no_enviado");
    const { setAuth } = useAuth(); // Obtenemos setAuth del hook

    const loginUser = async (e) => {
        e.preventDefault();
        const formElement = e.target;
        try {
            const { data } = await axios.post(Global.url + "login", formulario);

            if (data.status === "success") {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                setIdentificado("identificado");
                setAuth(data.user);

                formElement.reset(); // Limpiamos el formulario

                // Redirigimos recargando para limpiar estados viejos
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setIdentificado("error");
            }
        } catch (error) {
            setIdentificado("error: " + error.message);
        }
    };

    return (
        <div className="container-crear">
            {identificado === "identificado" && <p className="alerta alerta-success">¡Bienvenido!</p>}
            {identificado === "error" && <p className="alerta alerta-error">Error en las credenciales</p>}
            
            <h1>Identificarse</h1>
            <form className="formulario" onSubmit={loginUser}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" onChange={cambiado} required />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" name="password" onChange={cambiado} required />
                </div>
                <input type="submit" value="Identificarse" className="btn-enviar" />
            </form>
        </div>
    );
};