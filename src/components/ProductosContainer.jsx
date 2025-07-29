import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import "../styles/Productos.css";

export default function ProductosContainer({ onAgregar }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Estado para la búsqueda
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch("https://68659fd989803950dbafe5ae.mockapi.io/productos")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("❌ Error al cargar productos:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

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
