import { createContext, useContext, useState } from "react";

// 1. Creamos el contexto
export const AuthContext = createContext();

// 2. Creamos el Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Función de login
  const login = (usuario) => {
    setUser(usuario);
  };

  // Función de logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Hook personalizado para usar el contexto más fácil
export const useAuth = () => useContext(AuthContext);
