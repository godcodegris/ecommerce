import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://68659fd989803950dbafe5ae.mockapi.io/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const eliminarProducto = (id) => {
    // Solo actualizar el estado local - la llamada a la API se hace en Card.jsx
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const editarProducto = (id, nuevosDatos) => {
    // Solo actualizar el estado local - la llamada a la API se hace en Card.jsx
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...nuevosDatos } : p))
    );
  };

  const agregarProducto = async (nuevoProducto) => {
    try {
      const response = await fetch("https://68659fd989803950dbafe5ae.mockapi.io/productos", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
      });

      if (response.ok) {
        const productoCreado = await response.json();
        setProductos(prev => [...prev, productoCreado]);
        return productoCreado;
      } else {
        throw new Error("Error al crear producto");
      }
    } catch (error) {
      console.error("Error al agregar producto:", error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{ 
        productos, 
        setProductos, 
        loading, 
        error, 
        eliminarProducto, 
        editarProducto,
        agregarProducto
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductContext);
}