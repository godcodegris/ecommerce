import ProductosContainer from "../components/ProductosContainer.jsx";
import "../styles/Productos.css";

export default function Home() {
  return (
    <div>
      <div className="home-hero">
        <h1>Tu tienda de <span>coleccionables</span></h1>
        <p>Figuras, comics, y todo lo que un verdadero fan necesita en su coleccion.</p>
      </div>
      <ProductosContainer />
    </div>
  );
}
