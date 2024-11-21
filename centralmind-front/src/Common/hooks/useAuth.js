import { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const useAuth = () => {
  const { login: contextLogin, logout: contextLogout, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      await contextLogin(credentials); // Appel de la méthode login du AuthContext
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    setError(null);
    try {
      contextLogout();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!token; // Vérification si le token existe

  return { login, logout, isAuthenticated, loading, error };
};

export default useAuth;
