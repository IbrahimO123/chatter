import { Container, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useEffect } from "react";

const User = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {
    console.log("User", user);
  }, []);
  return (
    <Container>
      <Typography>User Profile Page</Typography>
    </Container>
  );
};

export default User;
