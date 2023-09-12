import { Container, Grid , Paper, Avatar} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useEffect,  } from "react";

const User = () => {
  const [user] = useAuthState(auth);
 // const [profile, setProfile] = useState([user])
  useEffect(() => {
    console.log("User", user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Grid container>
        <Grid item>
          <Paper>
            <Avatar alt="user name" src="">

            </Avatar>
          </Paper>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Container>
  );
};

export default User;
