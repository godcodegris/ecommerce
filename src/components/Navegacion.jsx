import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';

export default function Navegacion() {
  const { user, logout } = useAuth();
  const { totalItems } = useCarrito();
  
  return (
    <nav style={{ 
      padding: '10px 20px', 
      backgroundColor: '#f8f9fa', 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #dee2e6'
    }}>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
        <Link to="/about" style={{ textDecoration: 'none' }}>About</Link>
        <Link to="/contact" style={{ textDecoration: 'none' }}>Contact</Link>
        <Link to="/carrito" style={{ textDecoration: 'none' }}>
          Carrito ({totalItems})
        </Link>
      </div>
      
      <div>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>👋 Hola, {user.username}</span>
            <button 
              onClick={logout}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

