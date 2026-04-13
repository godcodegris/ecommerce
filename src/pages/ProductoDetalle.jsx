import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useProductos } from "../context/ProductContext.jsx";
import "../styles/Productos.css";

export default function ProductoDetalle() {
  const { onAgregar } = useCarrito();
  const { id } = useParams();
  const { productos, loading, error } = useProductos();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  // ✅ Buscar por id real en vez de por índice
  const producto = productos.find(p => String(p.id) === String(id));

  if (error || !producto) {
    return (
      <div className="detalle-container">
        <div className="error-container">
          <p>Error al cargar el producto. Verifica que sea un producto valido.</p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const handleAgregar = () => {
    const productoParaCarrito = {
      ...producto,
      id: `producto-${id}`
    };
    onAgregar(productoParaCarrito, cantidad);
    setCantidad(1);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  return (
    <div className="detalle-container">
      <Link to="/" className="detalle-back">
        &#8592; Volver a productos
      </Link>

      <div className="detalle-content">
        <div className="detalle-image">
          {producto.imagen && (
            <img src={producto.imagen} alt={producto.nombre} />
          )}
        </div>

        <div className="detalle-info">
          <h2>{producto.nombre}</h2>
          <p className="detalle-desc">{producto.descripcion}</p>
          <p className="detalle-precio">${Number(producto.precio).toLocaleString('es-AR')}</p>

          <div className="cantidad-selector">
            <button onClick={() => cantidad > 1 && setCantidad(c => c - 1)}>-</button>
            <span>{cantidad}</span>
            <button onClick={() => setCantidad(c => c + 1)}>+</button>
          </div>

          <button
            onClick={handleAgregar}
            className="btn-agregar-carrito"
            style={agregado ? { backgroundColor: 'var(--color-success)' } : {}}
          >
            {agregado ? '✅ Agregado!' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  );
}