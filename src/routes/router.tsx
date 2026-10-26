/* eslint react-refresh/only-export-components: off */
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLaout from "../Layout/MainLaout";
import ProtectedRoute from "../Components/ProtectedRoute";

const ProductsPage = lazy(() => import("../Pages/ProductsPage"));
const ProductDetails = lazy(() => import("../Components/ProductDetails"));
const CartPage = lazy(() => import("../Pages/CartPage"));
const FavouritePage = lazy(() => import("../Pages/FavouritePage"));
const LoginPage = lazy(() => import("../Pages/LoginPage"));
const CheckoutPage = lazy(() => import("../Pages/CheckoutPage"));
const OrderConfirmationPage = lazy(() => import("../Pages/OrderConfirmationPage"));
const SearchInput = lazy(() =>
  import("../Components/UI/Search").then((module) => ({ default: module.SearchInput })),
);

const pageFallback = (
  <div className="mx-auto max-w-7xl px-6 py-20 text-center text-slate-500" role="status">
    Loading page…
  </div>
);
const suspense = (children: React.ReactNode) => (
  <Suspense fallback={pageFallback}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLaout />,
    children: [
      { index: true, element: <Navigate to="/products" replace /> },
      { path: "products", element: suspense(<ProductsPage />) },
      { path: "products/:id", element: suspense(<ProductDetails />) },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            {suspense(<CartPage />)}
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            {suspense(<CheckoutPage />)}
          </ProtectedRoute>
        ),
      },
      { path: "order-confirmation", element: suspense(<OrderConfirmationPage />) },
      {
        path: "favorites",
        element: (
          <ProtectedRoute>
            {suspense(<FavouritePage />)}
          </ProtectedRoute>
        ),
      },
      { path: "favouites", element: <Navigate to="/favorites" replace /> },
      { path: "login", element: suspense(<LoginPage />) },
      { path: "search", element: suspense(<SearchInput />) },
      { path: "*", element: <Navigate to="/products" replace /> },
    ],
  },
]);
