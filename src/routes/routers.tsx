import { Routes, Route } from "react-router-dom";
import { Home } from "../view/Home";
import { Login } from "../view/Login";
import { SignUp } from "../view/SignUp";
import { PrivateRoute } from "../components/PrivateRoute";
import { WriteArticle } from "../view/Write";

export const Routers = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/write" element={<WriteArticle />}></Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};
