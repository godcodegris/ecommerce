import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useProductos } from "../context/ProductContext.jsx";
import { deleteProducto, updateProducto } from "../services/productosService.js";

export default function Card({ producto }) {
  const { user } = useAuth();
  const { eliminarProducto, editarProducto } = useProductos();
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");

  if (!producto) return null;

  const handleEliminar = async () => {
    if (window.confirm("Estas seguro de que queres eliminar este producto?")) {
      try {
        await deleteProducto(producto.id);
        eliminarProducto(producto.id);
      } catch (error) {
        console.error("Error:", error);
        alert("Error al eliminar el producto");
      }
    }
  };

  const iniciarEdicion = () => {
    setNombre(producto.nombre || "");
    setPrecio(producto.precio ? producto.precio.toString() : "");
    setImagen(producto.imagen || "");
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setEditando(false);
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    const datosAEnviar = {
      nombre,
      precio: parseFloat(precio) || 0,
      imagen
    };

    try {
      await updateProducto(producto.id, datosAEnviar);
      editarProducto(producto.id, datosAEnviar);
      setEditando(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar el producto: " + error.message);
    }
  };

  if (editando) {
    return (
      <div className="producto-card">
        <div className="card-edit-form">
          <h3>Editando Producto</h3>
          <form onSubmit={guardarEdicion}>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Precio:</label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>URL de Imagen:</label>
              <input
                type="url"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={cancelarEdicion} className="btn-outline">
                Cancelar
              </button>
              <button type="submit" className="btn-accent">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="producto-card">
      {/* ✅ Usa producto.id en vez de productoIndex */}
      <Link to={`/producto/${producto.id}`}>
        <div className="card-image-wrapper">
          {producto.imagen ? (
            <img src={producto.imagen} alt={producto.nombre || "Producto"} />
          ) : (
            <span className="card-no-image">Sin imagen</span>
          )}
        </div>
      </Link>

      <div className="card-body">
        <h3 className="card-title">
          <Link to={`/producto/${producto.id}`}>
            {producto.nombre || "Sin nombre"}
          </Link>
        </h3>
        <p className="card-price">
          ${Number(producto.precio).toLocaleString('es-AR')}
        </p>

        <div className="card-actions">
          <Link to={`/producto/${producto.id}`} className="btn-ver-detalle">
            Ver detalles
          </Link>
          {user && (
            <>
              <button onClick={iniciarEdicion} className="btn-outline">
                Editar
              </button>
              <button onClick={handleEliminar} className="btn-danger">
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}