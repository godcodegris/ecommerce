import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./layouts/Home.jsx";
import Carrito from "./components/Carrito.jsx";
import About from "./components/About.jsx";
import ProductoDetalle from "./components/ProductoDetalle.jsx";

function App() {
  const [carrito, setCarrito] = useState([]);

  // Agrega productos al carrito con la cantidad seleccionada
  const agregarAlCarrito = (producto, cantidad) => {
    const cantidadNum = Number(cantidad);
    
    console.log("🔍 AGREGANDO PRODUCTO:");
    console.log("  - ID:", `"${producto.id}"`, "(tipo:", typeof producto.id, ")");
    console.log("  - Nombre:", producto.nombre);
    console.log("  - Cantidad:", cantidadNum);
    
    setCarrito(prev => {
      console.log("🛒 CARRITO ANTES:", prev);
      
      const index = prev.findIndex(item => {
        const coincide = String(item.id) === String(producto.id);
        console.log(`  Comparando: "${item.id}" === "${producto.id}" = ${coincide}`);
        return coincide;
      });
      
      console.log("📍 Índice encontrado:", index);
      
      if (index !== -1) {
        const nuevoCarrito = [...prev];
        nuevoCarrito[index] = {
          ...nuevoCarrito[index],
          cantidad: nuevoCarrito[index].cantidad + cantidadNum
        };
        console.log("🔄 Producto actualizado:", nuevoCarrito[index]);
        return nuevoCarrito;
      } else {
        const nuevoProducto = { ...producto, cantidad: cantidadNum };
        console.log("🆕 Nuevo producto:", nuevoProducto);
        return [...prev, nuevoProducto];
      }
    });
  };

  // Elimina una unidad del producto (lo elimina si llega a cero)
  const eliminarDelCarrito = (productoId) => {
    console.log("🗑️ ELIMINANDO PRODUCTO ID:", `"${productoId}"`);
    
    setCarrito(prev => {
      console.log("🛒 CARRITO ANTES DE ELIMINAR:", prev);
      
      const nuevoCarrito = prev.reduce((acc, item) => {
        const coincide = String(item.id) === String(productoId);
        console.log(`  Comparando para eliminar: "${item.id}" === "${productoId}" = ${coincide}`);
        
        if (coincide) {
          const nuevaCantidad = item.cantidad - 1;
          console.log(`  Reduciendo cantidad de ${item.cantidad} a ${nuevaCantidad}`);
          if (nuevaCantidad > 0) {
            acc.push({ ...item, cantidad: nuevaCantidad });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
      
      console.log("🛒 CARRITO DESPUÉS DE ELIMINAR:", nuevoCarrito);
      return nuevoCarrito;
    });
  };

  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  console.log("🛒 CARRITO ACTUAL:", carrito);
  console.log("📦 CANTIDAD TOTAL:", totalCantidad);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home onAgregar={agregarAlCarrito} cantidad={totalCantidad} />}
        />
        <Route
          path="/carrito"
          element={<Carrito carrito={carrito} onEliminar={eliminarDelCarrito} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;