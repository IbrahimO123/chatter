import { Container } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useEffect } from "react";
import { UserPage } from "../components/UserPage";
import { useNavigate } from "react-router-dom";
import { MetaTags } from "../components/MetaTag";


const User = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  // const [profile, setProfile] = useState([user])
  useEffect(() => {
    console.log("User", user);
    if (user === null) {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <MetaTags
        description="User profile page, user can view his or her details, update his or her profile and avatar image"
        title="Chatter | Profile"
        PageTitle="User profile page, edit  your profile and upadte it to the app"
        typeOfPlatform="website"
        url="/user/profile"
        href="/user/profile"
      ></MetaTags>
      <Container>
        <UserPage />
      </Container>
    </>
  );
};

export default User;
