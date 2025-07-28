// components/Card.jsx
import { Link } from "react-router-dom";
import "../styles/Productos.css";

export default function Card({ producto, productoIndex }) {
  if (!producto) return null;

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

      <Link to={`/producto/${productoIndex}`} style={{ marginTop: '10px', display: 'block' }}>
        <button>Ver detalles</button>
      </Link>
    </div>
  );
}
