import "./App.css";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateOtherState } from "./redux/Others/slice";
import HomeIcon from "@mui/icons-material/Home";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ChatIcon from "@mui/icons-material/Chat";
import ForumIcon from "@mui/icons-material/Forum";

function App() {
  const others = useSelector((state: RootState) => state.session.others);
  const aUser = useSelector((state: RootState) => state.users.aUser);
  const { isLoggedIn } = aUser;
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
      <AppNav />
      <Routers />
      <Box sx={{ textAlign: "center" }} p={2}>
        Chatter Copyright &copy; 2023
      </Box>
      <Snackbar
        onClose={handleSnackbarClose}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={4000}
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
        {isLoggedIn ? (
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
    </>
  );
}

export default App;
