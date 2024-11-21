import { createBrowserRouter } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "../Home/Home";
import TermsPage from "../Tasks/TermsPage";
import MainLayout from "./layouts/MainLayout";
import CategoriesPage from "../Categories/CategoriesPage";

export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  TERMS: "/terms",
  CATEGORIES: "/categories",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { 
        path: ROUTES.TERMS, 
        element: (<TermsPage />), 
      },
      {
        path: ROUTES.CATEGORIES,
        element: <CategoriesPage />,
      },
      
      { path: ROUTES.AUTH.LOGIN, element: <Login /> },
      { path: ROUTES.AUTH.REGISTER, element: <Register /> },


    ],
  },
]);

export default router;
