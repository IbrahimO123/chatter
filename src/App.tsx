import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routers } from "./routes/routers";
import { AppNav } from "./components/AppNav";
import "./assets/styles/main.css";
import {
  Snackbar,
  Alert,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
  Slide,
} from "@mui/material";
import { RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateOtherState } from "./redux/Others/slice";
import HomeIcon from "@mui/icons-material/Home";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ChatIcon from "@mui/icons-material/Chat";
import ForumIcon from "@mui/icons-material/Forum";
import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const others = useSelector((state: RootState) => state.others);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { open, message, severity } = others;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(`/${newValue}`);
    setValue(newValue);
  };

  const handleSnackbarClose = () => {
    dispatch(
      updateOtherState({ ...others, open: false, message: "", severity })
    );
  };

  return (
    <>
      <ScrollToTop>
        <AppNav />
        <Routers />
        {user?.uid ? (
          <Box sx={{ textAlign: "center", marginTop: { xs: "40px" } }} p={2}>
            Chatter Copyright &copy; 2023
          </Box>
        ) : null}
        <Snackbar
          onClose={handleSnackbarClose}
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={1500}
          TransitionComponent={Slide}
        >
          <Alert variant="filled" severity={severity}>
            {message}
          </Alert>
        </Snackbar>
        <Paper
          sx={{
            display: { md: "none", xs: "grid" },
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          elevation={3}
        >
          {user?.uid ? (
            <BottomNavigation value={value} onChange={handleChange}>
              <BottomNavigationAction
                label="Home"
                value=""
                icon={<HomeIcon />}
              ></BottomNavigationAction>

              <BottomNavigationAction
                label="Draft"
                value="write"
                icon={<EditNoteIcon />}
              />

              <BottomNavigationAction
                label="Chat"
                value="chat"
                icon={<ChatIcon />}
              />

              <BottomNavigationAction
                label="Communities"
                value="communities"
                icon={<ForumIcon />}
              />
            </BottomNavigation>
          ) : null}
        </Paper>
      </ScrollToTop>
    </>
  );
}

export default App;
