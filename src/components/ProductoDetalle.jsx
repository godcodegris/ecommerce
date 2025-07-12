import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    fetch(`https://68659fd989803950dbafe5ae.mockapi.io/productos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar el producto");
        return res.json();
      })
      .then((data) => {
        setProducto(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <p>Cargando producto...</p>;
  if (error || !producto) return (
    <div>
      <p>Error al cargar producto.</p>
      <Link to="/">Volver a productos</Link>
    </div>
  );

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
      <p>{producto.precio} $</p>
      <Link to="/">Volver a productos</Link>
    </div>
  );
}
