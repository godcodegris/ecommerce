import { useState } from "react";
import Card from "./Card.jsx";
import { useProductos } from "../context/ProductContext.jsx";
import "../styles/Productos.css";

export default function ProductosContainer({ onAgregar }) {
  const { productos, loading, error } = useProductos();
  const [busqueda, setBusqueda] = useState("");

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos</p>;

  // Filtrar productos según la búsqueda (en nombre y descripción)
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="productos-container">
      {/* Input para búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      />

      {productosFiltrados.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        productosFiltrados.map((producto, index) => (
          <div key={index} className="producto-wrapper">
            <Card producto={producto} productoIndex={index} onAgregar={onAgregar} />
          </div>
        ))
      )}
    </div>
  );
}
