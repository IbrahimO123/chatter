import { Routes, Route } from "react-router-dom";
import { Home } from "../view/Home";
import { Login } from "../view/Login";
import { SignUp } from "../view/SignUp";
import { PrivateRoute } from "../components/PrivateRoute";
import { WriteArticle } from "../view/Write";
import { TagsPage } from "../view/Tags";
import { Blog } from "../components/Blog";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route element={<PrivateRoute />}>
        <Route path="/write" element={<WriteArticle />}></Route>
      </Route>
      <Route path="/tags" element={<TagsPage />}></Route>
      <Route
        path="/blogs/:title"
        element={
          <Blog
            title="Computer Network"
            text="A computer network is a set of computers sharing resources located on or provided by network nodes. Computers use common communication protocols over digital interconnections to communicate with each other. These interconnections are made up of telecommunication network technologies based on physically wired, optical, and wireless radio-frequency methods that may be arranged in a variety of network topologies. The nodes of a computer network can include personal computers, servers, networking hardware, or other specialized or general-purpose hosts. They are identified by network addresses and may have hostnames. Hostnames serve as memorable labels for the nodes and are rarely changed after initial assignment. Network addresses serve for locating and identifying the nodes by communication protocols such as the Internet Protocol"
            subtitle="Computer Network"
            coverImage="https://firebasestorage.googleapis.com/v0/b/workshop-4f2ec.appspot.com/o/Computer%20Networking%20and%20Technology?alt=media&token=a1d27ff1-7bff-475b-86c3-f3106432ce27"
          />
        }
      ></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};
