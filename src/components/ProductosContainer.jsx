import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import "../styles/Productos.css";

export default function ProductosContainer({ onAgregar }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  return (
    <div className="productos-container">
      {productos.map((producto, index) => (
        <div key={index} className="producto-wrapper">
          <Card producto={producto} productoIndex={index} onAgregar={onAgregar} />
        </div>
      ))}
    </div>
  );
}
