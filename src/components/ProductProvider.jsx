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
        // Agregar id único basado en índice si no existe
        const dataConIds = data.map((prod, index) => ({
          id: prod.id !== undefined ? prod.id : index.toString(),
          ...prod,
        }));
        setProductos(dataConIds);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const eliminarProducto = (id) => {
    if (window.confirm("¿Querés eliminar este producto?")) {
      setProductos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const editarProducto = (id, nuevosDatos) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...nuevosDatos } : p))
    );
  };

  return (
    <ProductContext.Provider
      value={{ productos, setProductos, loading, error, eliminarProducto, editarProducto }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductContext);
}
