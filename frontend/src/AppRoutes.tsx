import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./pages/Homepage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout showHero={true}>
              <Homepage />
            </Layout>
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/user-profile"
            element={
              <Layout>
                <UserProfilePage />
              </Layout>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;

/** NOTES
 * Catch-All Route (*): <Route path="*" element={<Navigate to="/" />} />
 * The path="*" acts as a wildcard or catch-all route. It matches any path that isn't explicitly defined in the routes above.
 * If the user navigates to an unknown route (e.g., /non-existent), they will be automatically redirected to the root path ("/").
 * The Navigate component is used to handle this redirection, sending the user back to the home page.
 */
