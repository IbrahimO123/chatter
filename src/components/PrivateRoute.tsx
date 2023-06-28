import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export const PrivateRoute = () => {
  const user = useSelector((state: RootState) => state.users.aUser);
  const { isRegistered, isAuthorised, isLoggedIn } = user;
  return isRegistered && isAuthorised && isLoggedIn  ? <Outlet /> : <Navigate to="/login" />;
};
