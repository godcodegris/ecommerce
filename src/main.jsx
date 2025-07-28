import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/AuthContext.jsx'  // Importa el provider

createRoot(document.getElementById('root')).render(
  // <StrictMode>  // opcional, podés descomentar si querés
    <AuthProvider>
      <App />
    </AuthProvider>
  // </StrictMode>
);
