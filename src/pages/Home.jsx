import { useEffect, useState } from "react";
import ProductosContainer from "../components/ProductosContainer.jsx";
import "../styles/Productos.css";
import logo from "../assets/logo.jpg";
import { getProductos } from "../services/api.js";

export default function Home() {
  const [destacados, setDestacados] = useState([]);
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    getProductos().then((productos) => {
      const conImagen = productos.filter((p) => p.thumbnail);
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

        <div className="hero-left">
          <div className="sphere-wrapper">
            <div className="sphere-glow"></div>
            <div className="sphere">
              <div className="sphere-inner">
                <div className="sphere-tile">
                  <img src={logo} alt="El Ojo de Thundera" />
                </div>
                <div className="sphere-tile">
                  <img src={logo} alt="El Ojo de Thundera" />
                </div>
              </div>
            </div>
            <div className="sphere-gel"></div>
            <div className="shine-main"></div>
            <div className="shine-secondary"></div>
            <div className="shine-bounce"></div>
          </div>

          <h2 className="hero-store-name">El Ojo de Thundera</h2>

          <p className="hero-subtitle">
            Figuras · Coleccionables · Hobbies
          </p>
          <a href="#productos" className="hero-cta">
            Explorar Coleccion
          </a>
        </div>

        <div className="hero-right">
          <p className="hero-tagline">Mas alla de lo evidente</p>
          {producto && (
            <div className="hero-carrusel">
              <div className="hero-carrusel-img-wrapper">
                <img
                  key={indice}
                  src={producto.thumbnail}
                  alt={producto.title}
                  className="hero-carrusel-img"
                />
              </div>
              <p className="hero-carrusel-titulo">{producto.title}</p>
              <p className="hero-carrusel-precio">
                ${Number(producto.price).toLocaleString("es-AR")}
              </p>
            </div>
          )}
          <div className="hero-badge-row">
            <span className="hero-badge-item">EST. 2015</span>
            <span className="hero-badge-item">ARGENTINA</span>
          </div>
        </div>

      </div>
      <div id="productos">
        <ProductosContainer />
      </div>
    </div>
  );
}