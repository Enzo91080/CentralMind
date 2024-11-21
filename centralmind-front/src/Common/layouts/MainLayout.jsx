import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import lightLogo from "../../assets/central-mind-light.png";
import { ROUTES } from "../router";

export default function MainLayout() {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Récupère l'URL actuelle

  const handleLogout = () => {
    logout();
    navigate(ROUTES.AUTH.ADMIN_LOGIN); // Redirige vers la page d'administration après déconnexion
  };

  useEffect(() => {
    console.log("User in MainLayout after login:", user);
  }, [user]);

  return (
    <div>
      {/* Header */}
      <header className="bg-om-primary text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="text-xl font-bold hover:text-gray-300">
            <img
              src={lightLogo}
              className="w-10 h-10 inline-block mr-2"
              alt="Logo"
            />
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
            {/* Afficher le bouton "Connexion" uniquement sur /admin/login */}
            {location.pathname === ROUTES.AUTH.ADMIN_LOGIN && !user ? (
              <Link to={ROUTES.AUTH.ADMIN_LOGIN}>Connexion</Link>
            ) : (
              user && (
                <button onClick={handleLogout} className="text-red-500">
                  Déconnexion
                </button>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
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
          <nav className="bg-slate-600 text-white flex flex-col gap-4 p-4 md:hidden">
            <Link
              to={ROUTES.HOME}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Accueil
            </Link>
            {user && (
              <Link
                to={ROUTES.TERMS}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Termes
              </Link>
            )}
            {location.pathname === ROUTES.AUTH.ADMIN_LOGIN && !user ? (
              <Link
                to={ROUTES.AUTH.ADMIN_LOGIN}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Connexion
              </Link>
            ) : (
              user && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Déconnexion
                </button>
              )
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
