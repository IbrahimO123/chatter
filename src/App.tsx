import "./App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  const { open, message, severity } = others;
  const dispatch = useDispatch();
  const [value, setValue] = useState("home");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
      <Box sx={{textAlign:"center"}} p={4} >
        Chatter Copyright (c) 2023
      </Box>
      <Snackbar
        onClose={handleSnackbarClose}
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
      >
        <Alert variant="filled" severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Paper
        sx={{
          display: { md: "none", xs: "grid"  },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          marginTop: "auto",
        }}
        elevation={3}
        
      >
        <BottomNavigation value={value} onChange={handleChange}>
          <Link to="/" className="link">
            <BottomNavigationAction
              label="Home"
              value="home"
              icon={<HomeIcon />}
            />
          </Link>
          <Link to="/write" className="link">
            <BottomNavigationAction
              label="Draft"
              value="draft"
              icon={<EditNoteIcon />}
            />
          </Link>
          <Link to="/chat" className="link">
            <BottomNavigationAction
              label="Chat"
              value="chat"
              icon={<ChatIcon />}
            />
          </Link>
          <Link to="/communities" className="link">
            <BottomNavigationAction
              label="Communities"
              value="communities"
              icon={<ForumIcon />}
            />
          </Link>
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default App;
