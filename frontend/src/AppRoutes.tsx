import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./pages/Homepage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Homepage />
            </Layout>
          }
        />
        <Route path="/user-profile" element={<span>USER PROFILE PAGE</span>} />
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
