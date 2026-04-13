import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import './index.css';
import './styles/Productos.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);