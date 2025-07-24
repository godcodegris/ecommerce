// layouts/Layout.jsx
import Navegacion from "../components/Navegacion.jsx";
import { Outlet } from "react-router-dom";

export default function Layout({ cantidad }) {
  return (
    <div>
      <Navegacion cantidad={cantidad} />
      <Outlet />
    </div>
  );
}
