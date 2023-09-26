import { Outlet, Navigate } from "react-router-dom";
import { useGeneral } from "../custom/hooks/useGeneral";

const PrivateRoute = () => {
  const { user, location } = useGeneral();
  return user?.uid ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ redirectTo: location }} />
  );
};

export default PrivateRoute;
