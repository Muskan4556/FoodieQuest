import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import { CartProvider } from "./context-api/CartContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Auth0ProviderWithNavigate>
            <AppRoutes />
            <Toaster
              visibleToasts={1}
              position="top-right"
              richColors
              duration={2000}
            />
          </Auth0ProviderWithNavigate>
        </CartProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>
);
