// components/Card.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Productos.css";

export default function Card({ producto, onAgregar, productoIndex }) {
  const [cantidad, setCantidad] = useState(1);

  if (!producto) return null;

  const incrementar = () => setCantidad(prev => prev + 1);
  const decrementar = () => {
    if (cantidad > 1) setCantidad(prev => prev - 1);
  };

  const handleAgregar = () => {
    // ✅ NO tocar el ID original del producto aquí
    onAgregar(producto, cantidad);
    setCantidad(1);
  };

  return (
    <div className="producto-card">
      <Link to={`/producto/${productoIndex}`} style={{ textDecoration: 'none' }}>
        <h1 style={{ color: "black" }}>{producto.nombre || "Sin nombre"}</h1>
      </Link>

      <p style={{ color: "black" }}>{producto.descripcion || "Sin descripción"}</p>

      {producto.imagen ? (
        <Link to={`/producto/${productoIndex}`}>
          <img
            className="producto-image"
            src={producto.imagen}
            alt={producto.nombre || "Producto"}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "5px",
              marginBottom: "10px"
            }}
          />
        </Link>
      ) : (
        <p style={{ color: "gray" }}>Imagen no disponible</p>
      )}

      <p style={{ color: "black" }}>
        {producto.precio !== undefined ? `${producto.precio} $` : "Sin precio"}
      </p>

      {/* Contador */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
        <button onClick={decrementar}>–</button>
        <span style={{ fontWeight: "bold", color: "black" }}>{cantidad}</span>
        <button onClick={incrementar}>+</button>
      </div>

      <button onClick={handleAgregar}>
        Agregar al carrito
      </button>

      <Link to={`/producto/${productoIndex}`} style={{ marginTop: '10px', display: 'block' }}>
        <button>Ver detalles</button>
      </Link>
    </div>
  );
}
