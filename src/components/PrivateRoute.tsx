import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export const PrivateRoute = () => {
  const user = useSelector((state: RootState) => state.users.aUser);
  const { isRegistered, isAuthorised } = user;
  return isRegistered && isAuthorised ? <Outlet /> : <Navigate to="/login" />;
};
