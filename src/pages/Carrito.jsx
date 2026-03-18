import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";
import "../styles/Productos.css";

export default function Carrito() {
  const { carrito, onEliminar, totalPrecio } = useCarrito();

  if (!carrito || carrito.length === 0) {
    return (
      <div className="carrito-container">
        <div className="carrito-empty">
          <div className="carrito-empty-icon">&#128722;</div>
          <p>Tu carrito esta vacio</p>
          <Link to="/" className="btn-primary">
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <h2>Tu Carrito</h2>
      </div>

      {carrito.map((producto, index) => (
        <div key={`carrito-${index}`} className="carrito-item">
          <div className="carrito-item-img-wrapper">
            {producto.imagen ? (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="carrito-item-img"
              />
            ) : (
              <div className="carrito-item-no-img">Sin imagen</div>
            )}
          </div>

          <div className="carrito-item-info">
            <h3>{producto.nombre}</h3>
            <p className="item-precio">${producto.precio} c/u</p>
            <p className="item-cantidad">Cantidad: {producto.cantidad}</p>
          </div>

          <span className="carrito-item-total">
            ${(producto.precio * producto.cantidad).toFixed(2)}
          </span>

          <button
            onClick={() => onEliminar(producto.id)}
            className="btn-danger"
          >
            Quitar
          </button>
        </div>
      ))}

      <div className="carrito-summary">
        <p className="carrito-total">
          Total: <span>${totalPrecio.toFixed(2)}</span>
        </p>
        <button className="btn-accent">
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
