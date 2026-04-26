import { createBrowserRouter } from "react-router-dom";
import App from "../../App";

import AdminGuard from "../guards/AdminGuard";

import { AuthProvider, useAuth, LoginPage, SignupPage } from "../../features/auth";
import { UserLayout, AdminLayout } from "../layouts";
import { Home } from "../../pages";
import { ProductDetailPage, ProductListPage } from "../../features/products";
import { ProfilePage } from "../../features/profile";
import { CartPage } from "../../features/cart";
import { AboutPage } from "../../features/about";
import { FAQPage } from "../../features/faq";
import { Shipping } from "../../features/shipping";
import { Returns } from "../../features/returns";
import { DataPolicy } from "../../features/policy";
import { TermsOfService } from "../../features/tos";
import { ContactPage } from "../../features/contact";

import {
  DashboardPage, ProductsAdminPage, InventoryPage,
  OrdersPage, PaymentsPage, SalesReportsPage,
  CustomersPage, OrderHistoryPage
} from "../../features/admin";

import { ErrorComponent } from "../../shared";
import { ThemeProvider } from "../../features/theme";

import { Background } from "../../shared";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider>
        <AuthProvider>
          <Background />
          <App />
        </AuthProvider>
      </ThemeProvider>
    ),
    errorElement: <ErrorComponent type="DEFAULT" />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "products", element: <ProductListPage /> },
          { path: "product/:slug/:id", element: <ProductDetailPage /> },
          { path: "cart", element: <CartPage /> },
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <SignupPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "about", element: <AboutPage />},
          { path: "contact", element: <ContactPage />},

          { path: "faq", element: <FAQPage /> },
          { path: "shipping", element: <Shipping /> },
          { path: "returns", element: <Returns /> },

          { path: "privacy-policy", element: <DataPolicy /> },
          { path: "terms-of-service", element: <TermsOfService /> },

          { path: "*", element: <ErrorComponent type="NOT_FOUND" /> }
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        errorElement: <ErrorComponent type="DEFAULT" />,
        children: [
          { index: true,              element: <DashboardPage /> },
          { path: "products",         element: <ProductsAdminPage /> },
          { path: "inventory",        element: <InventoryPage /> },
          { path: "orders",           element: <OrdersPage /> },
          { path: "payments",         element: <PaymentsPage /> },
          { path: "reports",          element: <SalesReportsPage /> },
          { path: "customers",        element: <CustomersPage /> },
          { path: "order-history",    element: <OrderHistoryPage /> },
        ],
      },
    ],
  },
]);