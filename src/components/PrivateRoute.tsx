import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const PrivateRoute = () => {
  const [user] = useAuthState(auth);
  return user?.uid ? <Outlet /> : <Navigate to="/login" />;
};
