import { createBrowserRouter, Navigate } from "react-router-dom";
import { useContext } from "react";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import TermsPage from "../Tasks/TermsPage";
import CategoriesPage from "../Categories/CategoriesPage";
import MainLayout from "./layouts/MainLayout";
import AuthContext from "./contexts/AuthContext";
import Home from "../Home/Home";

export const ROUTES = {
  HOME: "/",
  AUTH: {
    ADMIN_LOGIN: "/admin/login", // Connexion uniquement pour les administrateurs
  },
  TERMS: "/terms",
  CATEGORIES: "/categories",
};

// Guard pour protéger les routes
const GuardedRoute = ({ element, roles }) => {
  const { user, isLoggedIn } = useContext(AuthContext);

  // Si l'utilisateur n'est pas connecté, redirection vers la page de login
  if (!isLoggedIn) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  // Si le rôle de l'utilisateur ne correspond pas à celui requis, redirection
  if (roles && !roles.includes(user.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // Si tout va bien, on retourne l'élément
  return element;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.TERMS,
        element: (
          <GuardedRoute
            element={<TermsPage />}
            roles={["admin"]} // Accès réservé aux admins
          />
        ),
      },
      {
        path: ROUTES.CATEGORIES,
        element: (
          <GuardedRoute
            element={<CategoriesPage />}
            roles={["admin"]} // Accès réservé aux admins
          />
        ),
      },
      {
        path: ROUTES.AUTH.ADMIN_LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.AUTH.REGISTER,
        element: <Register />,
      },
    ],
  },
]);

export default router;
