import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./layouts/Home.jsx";
import Carrito from "./components/Carrito.jsx";
import About from "./components/About.jsx";
import ProductoDetalle from "./components/ProductoDetalle.jsx";
import Navegacion from "./components/Navegacion.jsx"; // ✅ importás la navegación

function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad) => {
    const cantidadNum = Number(cantidad);

    setCarrito(prev => {
      const index = prev.findIndex(item => String(item.id) === String(producto.id));

      if (index !== -1) {
        const nuevoCarrito = [...prev];
        nuevoCarrito[index] = {
          ...nuevoCarrito[index],
          cantidad: nuevoCarrito[index].cantidad + cantidadNum,
        };
        return nuevoCarrito;
      } else {
        return [...prev, { ...producto, cantidad: cantidadNum }];
      }
    });
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(prev => {
      return prev.reduce((acc, item) => {
        if (String(item.id) === String(productoId)) {
          const nuevaCantidad = item.cantidad - 1;
          if (nuevaCantidad > 0) {
            acc.push({ ...item, cantidad: nuevaCantidad });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <BrowserRouter>
      {/* ✅ Esto estará siempre visible en todas las rutas */}
      <Navegacion cantidad={totalCantidad} />

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
        <Route
          path="/producto/:id"
          element={<ProductoDetalle onAgregar={agregarAlCarrito} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
