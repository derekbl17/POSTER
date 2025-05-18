import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import Loader from "./Loader";

const PrivateRoute = ({ allowed }) => {
  console.log("priv route");
  const { user } = useOutletContext() || {};
  const role = user?.role;

  console.log(user);

  if (!user) return <Navigate to="/login" />;

  if (!role) return <Loader />;

  if (!allowed.includes(role)) {
    return <Navigate to="/no-auth" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
