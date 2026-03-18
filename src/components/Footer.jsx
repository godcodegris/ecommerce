import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          Thundera <span>Collectibles</span> &copy; {new Date().getFullYear()}
        </div>
        <div className="footer-links">
          <Link to="/about">Nosotros</Link>
          <Link to="/contact">Contacto</Link>
        </div>
      </div>
    </footer>
  );
}
