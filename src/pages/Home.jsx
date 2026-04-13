import ProductosContainer from "../components/ProductosContainer.jsx";
import "../styles/Productos.css";
import logo from "../assets/logo.jpg";

export default function Home() {
  return (
    <div>
      <div className="home-hero">
        <div className="hero-dots"></div>

        <div className="hero-left">
          <div className="hero-logo-wrapper">
            <img src={logo} alt="Thundera Store" className="hero-logo" />
          </div>
          <h1 className="hero-title">
            <span className="hero-line1">THUNDERA</span>
            <span className="hero-line2">STORE</span>
          </h1>
          <p className="hero-subtitle">
            Figuras &nbsp;·&nbsp; Coleccionables &nbsp;·&nbsp; Hobbies
          </p>
          <a href="#productos" className="hero-cta">
            Explorar Colección
          </a>
          <div className="hero-badge-row">
            <span className="hero-badge-item">EST. 2015</span>
            <span className="hero-badge-item">ARGENTINA</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img
              src="https://http2.mlstatic.com/D_NQ_NP_2X_800103-MLA103142340133_122025-F.webp"
              alt="Producto destacado"
              className="hero-product-img"
            />
          </div>
        </div>

      </div>
      <div id="productos">
        <ProductosContainer />
      </div>
    </div>
  );
}