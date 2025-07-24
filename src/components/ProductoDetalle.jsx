import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductoDetalle({ onAgregar }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cantidad, setCantidad] = useState(1); // 👈 nueva cantidad local

  useEffect(() => {
    const index = Number(id);
    if (isNaN(index)) {
      setError(true);
      setIsLoading(false);
      return;
    }

    fetch("https://68659fd989803950dbafe5ae.mockapi.io/productos")
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then(data => {
        if (index < 0 || index >= data.length) {
          throw new Error("Índice fuera de rango");
        }
        setProducto(data[index]);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <p>Cargando producto...</p>;

  if (error || !producto) {
    return (
      <div style={{ padding: "1rem" }}>
        <p style={{ color: "red" }}>
          ❌ Error al cargar producto.
          Verificá que estés accediendo a un producto válido.
        </p>
        <Link to="/">🔙 Volver a productos</Link>
      </div>
    );
  }

  // ✅ Función local para agregar al carrito desde el detalle
  const handleAgregar = () => {
    const productoParaCarrito = {
      ...producto,
      id: `producto-${id}` // lo mismo que usás en Cards
    };
    onAgregar(productoParaCarrito, cantidad);
    setCantidad(1); // opcional: reset cantidad
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>

      {producto.imagen && (
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{ maxWidth: "100%", borderRadius: "8px" }}
        />
      )}

      <p style={{ fontSize: "1.2rem" }}>{producto.precio} $</p>

      {/* 🧮 Contador y botón de agregar */}
      <div style={{ margin: "20px 0", display: "flex", gap: "10px", alignItems: "center" }}>
        <button onClick={() => cantidad > 1 && setCantidad(c => c - 1)}>-</button>
        <span style={{ fontWeight: "bold" }}>{cantidad}</span>
        <button onClick={() => setCantidad(c => c + 1)}>+</button>

        <button onClick={handleAgregar}>Agregar al carrito</button>
      </div>

      <Link to="/">🔙 Volver a productos</Link>
    </div>
  );
}


