import { useState, useEffect } from "react";
import axios from "axios";
import { Global } from "../services/Global";
import { SkeletonCard } from "../components/SkeletonCard";

export const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    try {
      const { data } = await axios.get(Global.url + "articulos");
      
      if (data.status === "success") {
        setArticulos(data.articulos);
      }
    } catch (error) {
      console.error("Error al traer artículos:", error);
    } finally {
      // Agregamos un pequeño delay opcional de 500ms 
      // solo para apreciar el efecto skeleton si el server es muy rápido
      setTimeout(() => {
        setCargando(false);
      }, 500);
    }
  };

  return (
    <div className="articulos-container">
      <h1>Explorar Artículos</h1>

      <div className="articles-grid">
        {cargando ? (
          /* Mostramos 6 tarjetas de esqueleto mientras carga */
          [1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)
        ) : articulos.length > 0 ? (
          /* Cuando los datos están listos, mostramos los artículos reales */
          articulos.map((articulo) => (
            <article key={articulo._id} className="article-item">
              <div className="image-container">
                {articulo.imagen !== "default.png" ? (
                  <img 
                    src={`${Global.url}imagen/${articulo.imagen}`} 
                    alt={articulo.titulo} 
                  />
                ) : (
                  <div className="no-image">Sin imagen</div>
                )}
              </div>
              <div className="data">
                <h3>{articulo.titulo}</h3>
                <p>{articulo.contenido.substring(0, 100)}...</p>
                <button className="read-more">Leer más</button>
              </div>
            </article>
          ))
        ) : (
          <p className="no-data">No hay artículos para mostrar todavía.</p>
        )}
      </div>
    </div>
  );
};