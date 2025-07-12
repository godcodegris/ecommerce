import Navegacion from "../components/Navegacion.jsx";
import ProductosContainer from "../components/ProductosContainer.jsx";

export default function Home({ onAgregar, cantidad }) {
  return (
    <div>
      <Navegacion cantidad={cantidad} />
      <ProductosContainer onAgregar={onAgregar} />
    </div>
  );
}

