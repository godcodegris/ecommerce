import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const onAgregar = (producto, cantidad) => {
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

  const onEliminar = (productoId) => {
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

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  const totalPrecio = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  return (
    <CarritoContext.Provider value={{
      carrito,
      onAgregar,
      onEliminar,
      vaciarCarrito,
      totalItems,
      totalPrecio
    }}>
      {children}
    </CarritoContext.Provider>
  );
};
