import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Carrito from "./pages/Carrito.jsx";
import About from "./pages/About.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import Navegacion from "./components/Navegacion.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Footer from './components/Footer.jsx';
import Chatbot from "./components/Chatbot.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navegacion />

      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/about" element={<About />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
      </Routes>
      <Footer />
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;
