import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminScreen from "./screens/AdminScreen.jsx";
import NotFoundScreen from "./screens/NotFoundScreen.jsx";
import NoAuthorization from "./screens/NoAuthorization.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "login", element: <LoginScreen /> },
      { path: "register", element: <RegisterScreen /> },
      { path: "no-auth", element: <NoAuthorization /> },
      {
        path: "",
        element: <PrivateRoute allowed={["user", "admin"]} />,
        children: [{ path: "profile", element: <ProfileScreen /> }],
      },
      {
        path: "admin",
        element: <PrivateRoute allowed={["admin"]} />,
        children: [{ path: "panel", element: <AdminScreen /> }],
      },
      { path: "*", element: <NotFoundScreen /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
