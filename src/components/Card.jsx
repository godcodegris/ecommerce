import { useState } from "react";
import "../styles/Productos.css";

export default function Card({ producto, onAgregar }) {
  const [cantidad, setCantidad] = useState(1);

  if (!producto) return null;

  const incrementar = () => setCantidad(prev => prev + 1);
  const decrementar = () => {
    if (cantidad > 1) setCantidad(prev => prev - 1);
  };

  const handleAgregar = () => {
    onAgregar(producto, cantidad);
    setCantidad(1);
  };

  return (
    <div className="producto-card">
      <h1 style={{ color: "black" }}>{producto.nombre || "Sin nombre"}</h1>
      <p style={{ color: "black" }}>{producto.descripcion || "Sin descripción"}</p>

      {producto.imagen ? (
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
    </div>
  );
}
