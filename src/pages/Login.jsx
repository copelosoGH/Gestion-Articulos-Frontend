import { useState } from "react"; // <--- FALTABA ESTO
import { useForm } from "../hooks/useForm"; // <--- FALTABA ESTO
import { Global } from "../services/Global";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

export const Login = () => {
    // Ahora estas funciones sí funcionarán porque están importadas arriba
    const { formulario, cambiado } = useForm({});
    const [identificado, setIdentificado] = useState("no_enviado");
    
    const { setAuth } = useAuth();
    const location = useLocation();
    const mensajeFlash = location.state?.mensaje;

    const loginUser = async (e) => {
        e.preventDefault();
        const formElement = e.target;

        try {
            const { data } = await axios.post(Global.url + "login", formulario);

            if (data.status === "success") {
                // Guardamos el token
                localStorage.setItem("token", data.token);

                // DECODIFICAMOS el token para obtener nombre e _id que el backend no enviaba
                const decodedUser = jwtDecode(data.token);
                
                // Guardamos el objeto decodificado (ya no dirá 'undefined')
                localStorage.setItem("user", JSON.stringify(decodedUser));

                setIdentificado("identificado");
                setAuth(decodedUser);
                
                formElement.reset();
                
                setTimeout(() => { 
                    window.location.reload(); 
                }, 1000);
            } else {
                setIdentificado("error");
            }
        } catch (error) {
            setIdentificado("error");
            console.error(error);
        }
    };

    return (
        <div className="container-crear">
            {mensajeFlash && <p className="alerta alerta-error">{mensajeFlash}</p>}
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