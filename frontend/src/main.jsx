import ReactDOM from "react-dom/client";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./app/routes/Routes.jsx";
import { ThemeProvider } from "./features/theme";

import "./stylesheets/index.css";

const queryClient = new QueryClient();

const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser")
    await worker.start({ onUnhandledRequest: "bypass" })
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
})