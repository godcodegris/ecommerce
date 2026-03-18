import { useState } from "react";
import Card from "./Card.jsx";
import { useProductos } from "../context/ProductContext.jsx";
import "../styles/Productos.css";

export default function ProductosContainer() {
  const { productos, loading, error } = useProductos();
  const [busqueda, setBusqueda] = useState("");

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error al cargar productos. Intenta de nuevo mas tarde.</p>
      </div>
    );
  }

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="productos-container">
      <div className="search-wrapper">
        <span className="search-icon">&#128269;</span>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar coleccionables..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      {productosFiltrados.length === 0 ? (
        <div className="error-container">
          <p>No se encontraron productos.</p>
        </div>
      ) : (
        <div className="productos-grid">
          {productosFiltrados.map((producto, index) => (
            <div key={producto.id || index} className="producto-wrapper">
              <Card producto={producto} productoIndex={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
