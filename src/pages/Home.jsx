import ProductosContainer from "../components/ProductosContainer.jsx";

export default function Home({ onAgregar }) {
  return (
    <div>
      <ProductosContainer onAgregar={onAgregar} />
    </div>
  );
}
