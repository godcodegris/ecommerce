import { useEffect, useState } from "react";
import ProductosContainer from "../components/ProductosContainer.jsx";
import "../styles/Productos.css";
import logo from "../assets/logo.jpg";
import { getProductos } from "../services/productosService.js";

export default function Home() {
  const [destacados, setDestacados] = useState([]);
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    getProductos().then((productos) => {
      const conImagen = productos
        .filter((p) => p.imagen)
        .map((p) => ({ ...p, imagen: p.imagen.replace("http://", "https://") }));
      const random = conImagen.sort(() => Math.random() - 0.5).slice(0, 8);
      setDestacados(random);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (destacados.length === 0) return;
    const timer = setInterval(() => {
      setIndice((i) => (i + 1) % destacados.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [destacados]);

  const producto = destacados[indice];

  return (
    <div>
      <div className="home-hero">
        <div className="hero-dots"></div>

        <div className="orb-bg">
          <div className="orb-glow"></div>
          <div className="orb-base"></div>
          <div className="orb-logo">
            <img src={logo} alt="El Ojo de Thundera" />
          </div>
          <div className="orb-shine1"></div>
          <div className="orb-shine2"></div>
          <div className="orb-shine3"></div>
          <div className="orb-shine4"></div>
          <div className="orb-border"></div>
        </div>

        <div className="hero-left">
          <div className="hero-logo-small">
            <img src={logo} alt="El Ojo de Thundera" />
          </div>
          <h2 className="hero-store-name">El Ojo de Thundera</h2>
          <p className="hero-subtitle">
            Figuras · Coleccionables · Hobbies
          </p>
          <a href="#productos" className="hero-cta">
            Explorar Coleccion
          </a>
          <div className="hero-badge-row">
            <span className="hero-badge-item">EST. 2015</span>
            <span className="hero-badge-item">ARGENTINA</span>
          </div>
        </div>

        <div className="hero-right">
          <p className="hero-tagline">Mas alla de lo evidente</p>
          {producto && (
            <div className="hero-carrusel">
              <div className="hero-carrusel-img-wrapper">
                <img
                  key={indice}
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="hero-carrusel-img"
                />
              </div>
              <p className="hero-carrusel-titulo">{producto.nombre}</p>
              <p className="hero-carrusel-precio">
                ${Number(producto.precio).toLocaleString("es-AR")}
              </p>
            </div>
          )}
        </div>

      </div>
      <div id="productos">
        <ProductosContainer />
      </div>
    </div>
  );
}