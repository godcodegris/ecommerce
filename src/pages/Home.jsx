import ProductosContainer from "../components/ProductosContainer.jsx";
import "../styles/Productos.css";
import logo from "../assets/logo.jpg";

export default function Home() {
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
          <p className="hero-subtitle">
            Figuras &nbsp;·&nbsp; Coleccionables &nbsp;·&nbsp; Hobbies
          </p>
          <a href="#productos" className="hero-cta">
            Explorar Colección
          </a>
        </div>

        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img
              src="https://http2.mlstatic.com/D_NQ_NP_2X_800103-MLA103142340133_122025-F.webp"
              alt="Producto destacado"
              className="hero-product-img"
            />
          </div>
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