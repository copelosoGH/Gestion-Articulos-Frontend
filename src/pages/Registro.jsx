import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Global } from "../services/Global";
import axios from "axios";

export const Registro = () => {
  const { formulario, cambiado } = useForm({});
  const [registrado, setRegistrado] = useState("no_enviado");

  const guardarUsuario = async (e) => {
    e.preventDefault();
    const formElement = e.target;
    try {
      const { data } = await axios.post(Global.url + "registro", formulario);

      if (data.status === "success") {
        setRegistrado("registrado");
        formElement.reset(); // Limpiamos el formulario
      } else {
        setRegistrado("error");
      }
    } catch (error) {
      setRegistrado("error: " + error.message);
    }
  };

  return (
    <div className="container-crear">
      <h1>Registro de Usuario</h1>
      {registrado === "registrado" && (
        <div className="alerta alerta-success">¡Usuario creado! Ya puedes loguearte.</div>
      )}
      {registrado === "error" && (
        <div className="alerta alerta-error">Error al registrar. Inténtalo de nuevo.</div>
      )}

      <form className="formulario" onSubmit={guardarUsuario}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" placeholder="Tu nombre completo" onChange={cambiado} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="ejemplo@ejemplo.com" onChange={cambiado} required />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" name="password" placeholder="Mínimo 7 caracteres" onChange={cambiado} required />
        </div>
        <input type="submit" value="Registrarse" className="btn-enviar" />
      </form>
    </div>
  );
};