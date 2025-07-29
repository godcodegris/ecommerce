import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import "../styles/Productos.css";

export default function Card({ producto, productoIndex, onProductoEliminado, onProductoEditado }) {
  const { user } = useAuth();
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");

  if (!producto) return null;

  const handleEliminar = async () => {
    if (window.confirm("¿Estás seguro de que querés eliminar este producto?")) {
      try {
        const idReal = await obtenerIdReal(productoIndex);
        
        const response = await fetch(`https://68659fd989803950dbafe5ae.mockapi.io/productos/${idReal}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          alert("✅ Producto eliminado correctamente");
          window.location.reload();
        } else {
          throw new Error("Error al eliminar");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("❌ Error al eliminar el producto");
      }
    }
  };

  const iniciarEdicion = () => {
    setNombre(producto.nombre || "");
    setDescripcion(producto.descripcion || "");
    setPrecio(producto.precio ? producto.precio.toString() : "");
    setImagen(producto.imagen || "");
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setEditando(false);
  };

  const obtenerIdReal = async (indice) => {
    try {
      const response = await fetch("https://68659fd989803950dbafe5ae.mockapi.io/productos");
      const productos = await response.json();
      return productos[indice]?.id || (indice + 1);
    } catch (error) {
      console.log("No se pudo obtener ID real, usando índice + 1");
      return indice + 1;
    }
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    
    try {
      const idReal = await obtenerIdReal(productoIndex);
      
      const datosAEnviar = {
        nombre: nombre,
        descripcion: descripcion,
        precio: parseFloat(precio) || 0,
        imagen: imagen
      };
      
      console.log("Datos a enviar:", datosAEnviar);
      console.log("ID real:", idReal);
      console.log("URL:", `https://68659fd989803950dbafe5ae.mockapi.io/productos/${idReal}`);
      
      const response = await fetch(`https://68659fd989803950dbafe5ae.mockapi.io/productos/${idReal}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosAEnviar)
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (response.ok) {
        const resultado = await response.json();
        console.log("Resultado:", resultado);
        alert("✅ Producto actualizado correctamente");
        setEditando(false);
        window.location.reload();
      } else {
        const errorText = await response.text();
        console.log("Error del servidor:", errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error("Error completo:", error);
      alert("❌ Error al actualizar el producto: " + error.message);
    }
  };

  // Vista de edición
  if (editando) {
    return (
      <div className="producto-card">
        <div style={{ padding: "10px" }}>
          <h3 style={{ marginBottom: "15px", color: "black" }}>Editando Producto</h3>
          <form onSubmit={guardarEdicion}>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "black" }}>
                Nombre:
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                style={{ 
                  width: "100%", 
                  padding: "6px", 
                  borderRadius: "4px", 
                  border: "1px solid #ccc", 
                  fontSize: "14px",
                  boxSizing: "border-box"
                }}
              />
            </div>
            
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "black" }}>
                Descripción:
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
                rows="2"
                style={{ 
                  width: "100%", 
                  padding: "6px", 
                  borderRadius: "4px", 
                  border: "1px solid #ccc", 
                  fontSize: "14px", 
                  resize: "vertical",
                  boxSizing: "border-box"
                }}
              />
            </div>
            
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "black" }}>
                Precio:
              </label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
                min="0"
                step="0.01"
                style={{ 
                  width: "100%", 
                  padding: "6px", 
                  borderRadius: "4px", 
                  border: "1px solid #ccc", 
                  fontSize: "14px",
                  boxSizing: "border-box"
                }}
              />
            </div>
            
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "black" }}>
                URL de Imagen:
              </label>
              <input
                type="url"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "6px", 
                  borderRadius: "4px", 
                  border: "1px solid #ccc", 
                  fontSize: "14px",
                  boxSizing: "border-box"
                }}
              />
            </div>
            
            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
              <button
                type="button"
                onClick={cancelarEdicion}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                💾 Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Vista normal
  return (
    <div className="producto-card">
      <Link to={`/producto/${productoIndex}`} style={{ textDecoration: 'none' }}>
        <h1 style={{ color: "black" }}>{producto.nombre || "Sin nombre"}</h1>
      </Link>

      <p style={{ color: "black" }}>{producto.descripcion || "Sin descripción"}</p>

      {producto.imagen ? (
        <Link to={`/producto/${productoIndex}`}>
          <img
            className="producto-image"
            src={producto.imagen}
            alt={producto.nombre || "Producto"}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "5px",
              marginBottom: "10px"
            }}
          />
        </Link>
      ) : (
        <p style={{ color: "gray" }}>Imagen no disponible</p>
      )}

      <p style={{ color: "black" }}>
        {producto.precio !== undefined ? `${producto.precio} $` : "Sin precio"}
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Link to={`/producto/${productoIndex}`} style={{ marginTop: '10px', display: 'block' }}>
          <button>Ver detalles</button>
        </Link>

        {user && (
          <>
            <button 
              onClick={iniciarEdicion}
              style={{ 
                backgroundColor: "#007bff", 
                color: "white", 
                border: "none", 
                padding: "8px 12px", 
                borderRadius: "4px", 
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              ✏️ Editar
            </button>
            <button 
              onClick={handleEliminar}
              style={{ 
                backgroundColor: "#dc3545", 
                color: "white", 
                border: "none", 
                padding: "8px 12px", 
                borderRadius: "4px", 
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              🗑️ Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
}