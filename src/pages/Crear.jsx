import { useState } from "react";
import { useForm } from "../hooks/useForm";
import axios from "axios";
import { Global } from "../services/Global";

export const Crear = () => {
  const { formulario, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");

  const guardarArticulo = async (e) => {
    e.preventDefault();

    // 1. Recoger datos del formulario
    let nuevoArticulo = formulario;

    // 2. Guardar artículo en el backend
    try {
      const { data } = await axios.post(Global.url + "crear", nuevoArticulo);

      if (data.status === "success") {
        setResultado("guardado");
        
        // 3. Subir la imagen si existe
        const fileInput = document.querySelector("#file");
        if (fileInput.files[0]) {
          const formData = new FormData();
          formData.append("file0", fileInput.files[0]);

          await axios.post(Global.url + "subir-imagen/" + data.articulo._id, formData);
        }
      } else {
        setResultado("error");
      }
    } catch (error) {
      setResultado("error: ", error);
    }
  };

  return (
    <div className="container-crear">
      <h1>Crear Nuevo Artículo</h1>
      <p>Completa los campos para publicar un nuevo contenido.</p>

      {resultado === "guardado" && (
        <div className="alerta alerta-success">¡Artículo guardado con éxito!</div>
      )}
      {resultado === "error" && (
        <div className="alerta alerta-error">Error al guardar el artículo.</div>
      )}

      <form className="formulario" onSubmit={guardarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input type="text" name="titulo" onChange={cambiado} placeholder="Ej: Mi primer artículo" required />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea name="contenido" onChange={cambiado} rows="6" placeholder="Escribe aquí el cuerpo del artículo..." required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="file">Imagen</label>
          <input type="file" name="file0" id="file" />
        </div>

        <button type="submit" className="btn-enviar">Publicar Artículo</button>
      </form>
    </div>
  );
};