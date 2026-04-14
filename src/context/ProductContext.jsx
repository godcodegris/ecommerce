import { createContext, useContext, useState, useEffect } from "react";
import { getProductos, createProducto } from "../services/productosService.js";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProductos()
  .then((data) => {
    const dataConHttps = data.map((p) => ({
      ...p,
      thumbnail: p.thumbnail ? p.thumbnail.replace("http://", "https://") : p.thumbnail,
    }));
    setProductos(dataConHttps);
    setLoading(false);
  })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const editarProducto = (id, nuevosDatos) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...nuevosDatos } : p))
    );
  };

  const agregarProducto = async (nuevoProducto) => {
    try {
      const productoCreado = await createProducto(nuevoProducto);
      setProductos(prev => [...prev, productoCreado]);
      return productoCreado;
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
