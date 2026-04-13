import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";
import "../styles/Productos.css";

export default function Carrito() {
  const { carrito, onEliminar, totalPrecio } = useCarrito();
  const [mostrarPago, setMostrarPago] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const descuento = totalPrecio * 0.10;
  const totalConDescuento = totalPrecio - descuento;

  const copiarAlias = () => {
    navigator.clipboard.writeText("elojodethundera.mp");
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

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
            <p className="item-precio">
              ${Number(producto.precio).toLocaleString("es-AR")} c/u
            </p>
            <p className="item-cantidad">Cantidad: {producto.cantidad}</p>
          </div>

          <span className="carrito-item-total">
            ${(producto.precio * producto.cantidad).toLocaleString("es-AR")}
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
        <div className="carrito-totales">
          <p className="carrito-subtotal">
            Subtotal: <span>${Number(totalPrecio).toLocaleString("es-AR")}</span>
          </p>
          <p className="carrito-descuento">
            🎉 Descuento web 10%: <span>-${Number(descuento).toLocaleString("es-AR")}</span>
          </p>
          <p className="carrito-total">
            Total: <span>${Number(totalConDescuento).toLocaleString("es-AR")}</span>
          </p>
        </div>

        <button className="btn-accent" onClick={() => setMostrarPago(true)}>
          Finalizar compra
        </button>
      </div>

      {mostrarPago && (
        <div className="pago-overlay" onClick={() => setMostrarPago(false)}>
          <div className="pago-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="pago-close"
              onClick={() => setMostrarPago(false)}
            >
              ✕
            </button>

            <h3 className="pago-titulo">Elegí cómo pagar</h3>

            <div className="pago-resumen">
              <p className="pago-subtotal">
                Subtotal: <span>${Number(totalPrecio).toLocaleString("es-AR")}</span>
              </p>
              <p className="pago-descuento-modal">
                🎉 Descuento web 10%: <span>-${Number(descuento).toLocaleString("es-AR")}</span>
              </p>
              <p className="pago-total">
                Total a pagar: <strong>${Number(totalConDescuento).toLocaleString("es-AR")}</strong>
              </p>
            </div>

            <p className="pago-aviso">
              Una vez realizado el pago contactanos para confirmar tu pedido.
            </p>

            <div className="pago-opciones">

              <div className="pago-opcion">
                <div className="pago-opcion-icon">🏦</div>
                <h4>Transferencia Bancaria</h4>
                <p>Transferí al siguiente alias:</p>

                <div className="pago-alias">
                  <span>elojodethundera.mp</span>
                  <button onClick={copiarAlias} className="pago-copiar">
                    {copiado ? "✅ Copiado!" : "Copiar"}
                  </button>
                </div>

                <p className="pago-instruccion">
                  Enviá el comprobante por WhatsApp o email para confirmar tu pedido.
                </p>
              </div>

              <div className="pago-opcion">
                <div className="pago-opcion-icon">💳</div>
                <h4>MercadoPago</h4>
                <p>Pagá directo con tu cuenta de MercadoPago:</p>

                <a
                  href="https://link.mercadopago.com.ar/thundera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pago-mp-btn"
                >
                  Ir a MercadoPago →
                </a>

                <p className="pago-instruccion">
                  Ingresá el monto total con descuento al momento de pagar.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}