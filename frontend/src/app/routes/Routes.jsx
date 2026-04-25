import { createBrowserRouter } from "react-router-dom";
import App from "../../App";

import { UserLayout, AdminLayout } from "../layouts";
import { Home } from "../../pages";
import { ProductDetailPage, ProductListPage } from "../../features/products";
import { ProfilePage } from "../../features/profile";
import { CartPage } from "../../features/cart";
import { AboutPage } from "../../features/about";
import { LoginPage, SignupPage } from "../../features/auth";
import { FAQPage } from "../../features/faq";
import { Shipping } from "../../features/shipping";
import { Returns } from "../../features/returns";
import { DataPolicy } from "../../features/policy";
import { TermsOfService } from "../../features/tos";

import { DashboardPage, ProductsAdminPage } from "../../features/admin";

import {ErrorComponent} from "../../shared";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "products", element: <ProductListPage /> },
          { path: "product/:slug/:id", element: <ProductDetailPage /> },
          { path: "cart", element: <CartPage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <SignupPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "about", element: <AboutPage />},

          { path: "/faq", element: <FAQPage /> },
          { path: "/shipping", element: <Shipping /> },
          { path: "/returns", element: <Returns /> },

          { path: "/privacy-policy", element: <DataPolicy /> },
          { path: "/terms-of-service", element: <TermsOfService /> },

          { path: "*", element: <ErrorComponent type="NOT_FOUND" /> }
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "products", element: <ProductsAdminPage /> },
        ],
      },
    ],
  },
]);