import { useState, useEffect } from "react";
import axios from "axios";
import { Global } from "../services/Global";
import { SkeletonCard } from "../components/SkeletonCard";

export const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  // ESTADO CLAVE: Guarda el ID del artículo que se está leyendo
  const [articuloExpandido, setArticuloExpandido] = useState(null);

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    try {
      const { data } = await axios.get(Global.url + "articulos");
      if (data.status === "success") setArticulos(data.articulos);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setCargando(false), 100);
    }
  };

  return (
    <div className="articulos-container">
      <h1>Explorar Artículos</h1>
      <div className="articles-grid">
        {cargando ? (
          [1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)
        ) : (
          articulos.map((articulo) => (
            <article key={articulo._id} className="article-item">
              <div className="image-container">
                <img src={articulo.img} alt={articulo.titulo} />
              </div>

              <div className="data">
                <h3>{articulo.titulo}</h3>
                
                {/* Lógica simple: ¿Es este el ID expandido? */}
                <p>
                  {articuloExpandido === articulo._id 
                    ? articulo.contenido 
                    : `${articulo.contenido.substring(0, 150)}..`}
                </p>

                <button 
                  className="read-more"
                  onClick={() => setArticuloExpandido(articuloExpandido === articulo._id ? null : articulo._id)}
                >
                  {articuloExpandido === articulo._id ? "Leer menos" : "Leer más"}
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};