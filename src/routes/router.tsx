// import { createBrowserRouter } from "react-router-dom"
import ProductsPage from "../Pages/ProductsPage"
import MainLaout from "../Layout/MainLaout"
import CartPage from "../Pages/CartPage"
import  FavouritePage from "../Pages/FavouritePage"
import ProductDetails from "../Components/ProductDetails"
import ProtectedRoute from "../Components/ProtectedRoute"
import LoginPage from "../Pages/LoginPage"



import { createBrowserRouter, Navigate } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLaout />,
    children: [
      
      {
        index: true,
        element: <Navigate to="products" replace />
      },

      {
        path: "products",
        element: <ProductsPage />
      },

      {
        path: "products/:id",
        element: <ProductDetails />
      },

      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        )
      },

      {
        path: "favouites",
        element: (
          <ProtectedRoute>
            <FavouritePage />
          </ProtectedRoute>
        )
      },

      {
        path: "login",
        element: <LoginPage />
      }
    ]
  }
])
