import { createContext, useState, useEffect } from "react";
import authApi from "../../Auth/services/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

  // Initialisation au chargement
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const userData = await authApi.me();
          setUser(userData);
        } catch {
          logout(); // Déconnexion si token invalide ou expiré
        }
      }
    };
    initializeAuth();
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { token: accessToken, user } = await authApi.login(credentials);
      setToken(accessToken);
      localStorage.setItem("token", accessToken);
      setUser(user);
    } catch (err) {
      console.error("Erreur de connexion :", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!user; // Vérifie si l'utilisateur est connecté

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoggedIn,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
