import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;

  // return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

// The replace prop in the Navigate component is useful for controlling navigation behavior, especially in cases where you don’t want users to navigate back to the previous route. It is commonly used in authentication and error handling scenarios where you want to redirect users and ensure they do not return to the previous state.
