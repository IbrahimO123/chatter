import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../view/Home"));
const Login = lazy(() => import("../view/Login"));
const SignUp = lazy(() => import("../view/SignUp"));
const WriteArticle = lazy(() => import("../view/Write"));
const TagsPage = lazy(() => import("../view/Tags"));
const User = lazy(() => import("../view/User"));
const NotFound = lazy(() => import("../view/NotFound"));
const SingleArticle = lazy(() => import("../view/SingleArticle"));

const PrivateRoute = lazy(() => import("../components/PrivateRoute"));

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route element={<PrivateRoute />}>
        <Route path="/user/profile" element={<User />}></Route>
        <Route path="/write" element={<WriteArticle />}></Route>
      </Route>
      <Route
        path="/articles/single/:authorName/:articleId/:title"
        element={<SingleArticle />}
      ></Route>
      <Route path="/tags" element={<TagsPage />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};
