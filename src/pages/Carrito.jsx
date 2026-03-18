import { useCarrito } from "../context/CarritoContext.jsx";
import "../styles/Productos.css";

export default function Carrito() {
  const { carrito, onEliminar } = useCarrito();
  if (!carrito || carrito.length === 0) {
    return <p>🛒 El carrito está vacío</p>;
  }

  return (
    <div
      className="carrito-conteiner"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "10px"
      }}
    >
      {carrito.map((producto, index) => (
        <div
          key={`producto-${index}`}
          className="carrito-card"
          style={{
            display: "flex",
            alignItems: "center",
            border: "2px solid #007bff",
            borderRadius: "8px",
            padding: "15px",
            backgroundColor: "#f8f9fa"
          }}
        >
          {producto.imagen ? (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "4px",
                marginRight: "15px"
              }}
            />
          ) : (
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#ccc",
                marginRight: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              Sin imagen
            </div>
          )}

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: "0 0 5px", color: "#000" }}>
              {producto.nombre} (ID: "{producto.id}")
            </h3>
            <p style={{ margin: "0 0 5px", color: "#000" }}>
              {producto.descripcion}
            </p>
            <p style={{ margin: "0 0 5px", color: "#000" }}>
              <strong>Precio:</strong> {producto.precio} $
            </p>
            <p style={{ margin: "0 0 5px", color: "#000" }}>
              <strong>Cantidad:</strong> {producto.cantidad}
            </p>
            <p style={{ margin: "0 0 5px", color: "#000" }}>
              <strong>Total:</strong> {(producto.precio * producto.cantidad).toFixed(2)} $
            </p>
          </div>

          <button
            onClick={() => {
              console.log("🗑️ Botón eliminar clickeado para ID:", producto.id);
              onEliminar(producto.id);
            }}
            style={{
              padding: "8px 12px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Eliminar uno
          </button>
        </div>
      ))}
    </div>
  );
}
