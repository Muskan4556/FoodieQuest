import React, { Suspense } from "react";
import Loader from "./components/Loader";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import Homepage from "./pages/Homepage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import ProtectedRoute from "./auth/ProtectedRoute";

const UserProfilePage = React.lazy(() => import("@/pages/UserProfilePage"));
const ManageRestaurantPage = React.lazy(
  () => import("@/pages/ManageRestaurantPage")
);
// const SearchPage = React.lazy(() => import("@/pages/SearchPage"));
const RestaurantInfo = React.lazy(() => import("@/pages/RestaurantDetails"));
const Cart = React.lazy(() => import("@/components/CartComponent"));
const OrderStatusPage = React.lazy(() => import("@/pages/OrderStatusPage"));
// import UserProfilePage from "./pages/UserProfilePage";
// import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
// import RestaurantInfo from "./pages/RestaurantDetails";
// import Cart from "./components/CartComponent";
// import OrderStatusPage from "./pages/OrderStatusPage";

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
          <Route
            path="/manage-restaurant"
            element={
              <Layout>
                <Suspense
                  fallback={
                    <div>
                      <Loader />
                    </div>
                  }
                >
                  <ManageRestaurantPage />
                </Suspense>
              </Layout>
            }
          />
          <Route
            path="/order"
            element={
              <Layout>
                <Suspense
                  fallback={
                    <div>
                      <Loader />
                    </div>
                  }
                >
                  <OrderStatusPage />
                </Suspense>
              </Layout>
            }
          />
        </Route>

        <Route
          path="/search/:city"
          element={
            <Layout>
              {/* <Suspense
                fallback={
                  <div>
                    <Loader />
                  </div>
                }
              > */}
                <SearchPage />
              {/* </Suspense> */}
            </Layout>
          }
        />
        <Route
          path="/details/:restaurantId"
          element={
            <Layout>
              <Suspense
                fallback={
                  <div>
                    <Loader />
                  </div>
                }
              >
                <RestaurantInfo />
              </Suspense>
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Suspense
                fallback={
                  <div>
                    <Loader />
                  </div>
                }
              >
                <Cart />
              </Suspense>
            </Layout>
          }
        />

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
