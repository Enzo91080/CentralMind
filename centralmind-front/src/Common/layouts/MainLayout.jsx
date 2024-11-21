import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { useEffect } from "react";
import lightLogo from "../../assets/central-mind-light.png";
import { ROUTES } from "../router";

export default function MainLayout() {
  const { user, logout } = useContext(AuthContext); // Utilisation du contexte pour vérifier l'état de connexion
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // État pour gérer le menu mobile
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Déconnecte l'utilisateur
    navigate("/login"); // Redirige vers la page de connexion
  };

  // Débogage : vérifier l'état de `user` à chaque rendu

  useEffect(() => {
    console.log("User in MainLayout after login:", user);
  }, [user]);

  return (
    <div>
      {/* Header */}
      <header className="bg-om-primary text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold hover:text-gray-300">
            <img
              src={lightLogo}
              className="
              w-10 
              h-10
              inline-block mr-2
            "
            />
            {/* icon */}
            CentralMind
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex gap-6">
            <Link
              to={ROUTES.HOME}
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Accueil
            </Link>
            {user && (
              <> 
              <Link
                to={ROUTES.TERMS}
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Termes
              </Link>
              <Link
                to={ROUTES.CATEGORIES}
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Catégories
              </Link>
              </>
            )}
            {user !== null ? (
              <button onClick={handleLogout}>Déconnexion</button>
            ) : (
              <Link to="/login">Connexion</Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} // Gérer l'ouverture/fermeture du menu
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="bg-slate-600 text-white flex flex-col gap-4 p-4 md:hidden"
          >
            <Link
              to="/"
              className="hover:text-gray-300 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)} // Fermer le menu après clic
            >
              Accueil
            </Link>
            {user && (
              <Link
                to="/tasks"
                className="hover:text-gray-300 transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)} // Fermer le menu après clic
              >
                Tâches
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false); // Fermer le menu après déconnexion
                }}
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Déconnexion
              </button>
            ) : (
              <Link
                to="/login"
                className="hover:text-gray-300 transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)} // Fermer le menu après clic
              >
                Connexion
              </Link>
            )}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 container mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 CentralMind. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
