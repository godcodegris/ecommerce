import { createContext, useContext, useState } from "react";

// 1. Crear el Context
const CarritoContext = createContext();

// 2. Hook personalizado para usar el Context
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
};

// 3. Provider del Context
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const onAgregar = (producto, cantidad) => {
    setCarrito(carritoActual => {
      const existe = carritoActual.find(item => item.id === producto.id);
      
      if (existe) {
        // Si existe, actualizar cantidad
        return carritoActual.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        // Si no existe, agregar nuevo
        return [...carritoActual, { ...producto, cantidad }];
      }
    });
  };

  const onEliminar = (id) => {
    setCarrito(carritoActual => 
      carritoActual.filter(item => item.id !== id)
    );
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