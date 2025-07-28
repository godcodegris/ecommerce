import { Link } from "react-router-dom";

export default function Navegacion({ cantidad = 0 }) {
  return (
    <nav style={{ display: "flex", gap: "1rem", marginBottom: "20px" }}>
      <Link to="/">Inicio</Link>
      <Link to="/carrito">🛒 Ver carrito ({cantidad})</Link>
      <Link to="/about">Sobre Nosotros</Link>
      <Link to="/contact">Contacto</Link> 
      <Link to="/login">Login</Link>

    </nav>
  );
}


