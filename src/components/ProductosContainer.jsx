import { useState } from "react";
import Card from "./Card.jsx";
import { useProductos } from "../context/ProductContext.jsx";
import "../styles/Productos.css";

const CATEGORIAS = ["Todas", "Figuras de Acción", "Funkos", "Comics y Revistas", "Vintage", "Cards", "Varios"];

export default function ProductosContainer() {
  const { productos, loading, error } = useProductos();
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");

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

  const productosFiltrados = productos
    .filter(p => categoriaActiva === "Todas" || p.categoria === categoriaActiva)
    .filter(p =>
      (p.nombre || "").toLowerCase().includes(busqueda.toLowerCase()) ||
      (p.descripcion || "").toLowerCase().includes(busqueda.toLowerCase())
    );

  return (
    <div className="productos-container">

      {/* Filtros por categoría */}
      <div className="categorias-wrapper">
        {CATEGORIAS.map(cat => (
          <button
            key={cat}
            className={`categoria-btn ${categoriaActiva === cat ? "activa" : ""}`}
            onClick={() => setCategoriaActiva(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Buscador */}
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
          {/* ✅ Sin productoIndex */}
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="producto-wrapper">
              <Card producto={producto} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}