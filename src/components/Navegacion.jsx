import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';
import logo from '../assets/logo.jpg';

export default function Navegacion() {
  const { user, logout } = useAuth();
  const { totalItems } = useCarrito();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo-wrapper">
          <img src={logo} alt="Thundera Collectibles" className="navbar-logo-img" />
          <span className="navbar-logo-text">Thundera</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`}>
            Inicio
          </Link>
          <Link to="/about" className={`navbar-link ${isActive('/about') ? 'active' : ''}`}>
            Nosotros
          </Link>
          <Link to="/contact" className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}>
            Contacto
          </Link>
          <Link to="/carrito" className={`navbar-link navbar-cart ${isActive('/carrito') ? 'active' : ''}`}>
            🛒 Carrito
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>

        {/* Solo mostrar si hay usuario admin logueado */}
        {user && (
          <div className="navbar-auth">
            <div className="navbar-user">
              <span className="navbar-username">{user.username}</span>
              <button onClick={logout} className="btn-outline navbar-btn">
                Salir
              </button>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}