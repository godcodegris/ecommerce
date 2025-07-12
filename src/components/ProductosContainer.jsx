import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import "../styles/Productos.css";

export default function ProductosContainer({ onAgregar }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://68659fd989803950dbafe5ae.mockapi.io/productos")
      .then(res => res.json())
      .then(data => {
        console.log("🔍 RESPUESTA COMPLETA DE LA API:");
        console.log(data);
        
        // Asegurar IDs únicos - versión simplificada
        const productosConIdUnico = data.map((producto, index) => ({
          ...producto,
          id: producto.id ? `${producto.id}-${index}` : `producto-${index}`,
          originalId: producto.id
        }));
        
        // Verificar cada producto individualmente
        productosConIdUnico.forEach((producto, index) => {
          console.log(`📦 Producto ${index + 1}:`);
          console.log(`  - ID: "${producto.id}" (tipo: ${typeof producto.id})`);
          console.log(`  - ID Original: "${producto.originalId}"`);
          console.log(`  - Nombre: "${producto.nombre}"`);
          console.log(`  - Precio: ${producto.precio}`);
          console.log(`  - Objeto completo:`, producto);
        });
        
        // Contar productos sin ID
        const productosSinId = productosConIdUnico.filter(p => !p.id || p.id === '');
        console.log(`⚠️ Productos sin ID: ${productosSinId.length} de ${productosConIdUnico.length}`);
        
        setProductos(productosConIdUnico);
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
        <div key={producto.id} className="producto-wrapper">
          <Card producto={producto} onAgregar={onAgregar} />
        </div>
      ))}
    </div>
  );
}