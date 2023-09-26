import {
  Paper,
  MenuList,
  MenuItem,
  IconButton,
  Divider,
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ChatIcon from "@mui/icons-material/Chat";
import ForumIcon from "@mui/icons-material/Forum";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { updateOtherState } from "../redux/Others/slice";
import { updateAUser } from "../redux/user/slice";
import { Link } from "react-router-dom";

import { useGeneral } from "../custom/hooks/useGeneral";

export const GridOne = () => {
  const { navigate, user, dispatch, others, aUser } = useGeneral();

  const handleRoute = (route: string) => {
    navigate(`${route}`);
  };
  const handleSignIn = () => {
    navigate("/login", { replace: true });
  };

  const handleSignOut = async () => {
    try {
      signOut(auth);
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          severity: "error",
          message: "Signed out successfully",
        })
      );
      dispatch(updateAUser({ ...aUser, isLoggedIn: false }));
      return;
    } catch (e: any) {
      console.error("Error while siging out user: ", e.code);
    }
  };
  return (
    <Box>
      <Paper elevation={8} sx={{ padding: "0px 1px" }}>
        <MenuList>
          <MenuItem onClick={() => handleRoute("/")}>
            <IconButton>
              <HomeIcon />
            </IconButton>
            Home
          </MenuItem>
          <MenuItem onClick={() => handleRoute("/write")}>
            <IconButton>
              <EditNoteIcon />
            </IconButton>
            Draft
          </MenuItem>
          <MenuItem onClick={() => handleRoute("/chat")}>
            <IconButton>
              <ChatIcon />
            </IconButton>
            Chat
          </MenuItem>
          <MenuItem onClick={() => handleRoute("/communities")}>
            <IconButton>
              <ForumIcon />
            </IconButton>
            Communities
          </MenuItem>
          <MenuItem>
            <IconButton>
              <FolderSpecialIcon />
            </IconButton>
            Bookmarks
          </MenuItem>
          <Accordion elevation={0}>
            <AccordionSummary>
              <ExpandMoreIcon />
              More
            </AccordionSummary>
            <AccordionDetails>
              <MenuList>
                <MenuItem>
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                  Help
                </MenuItem>
                <MenuItem>
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                  About
                </MenuItem>
              </MenuList>
            </AccordionDetails>
          </Accordion>
        </MenuList>
        <Divider></Divider>
        <Box component="div" p={2}>
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              <Typography variant="subtitle2" mr={1} component="span">
                Trending Tags
              </Typography>
              <TrendingUpIcon />
            </Box>
            <MenuList>
              <MenuItem>&#35;Programming</MenuItem>
              <MenuItem>&#35;Science</MenuItem>
              <MenuItem>&#35;Technology</MenuItem>
              <MenuItem>&#35;Machine Learning</MenuItem>
              <MenuItem>&#35;Politics</MenuItem>
              <Link className="link" to="/tags">
                <MenuItem>See all tags</MenuItem>
              </Link>
            </MenuList>
            <Divider></Divider>
            {user?.uid ? (
              <Box>
                <Typography variant="subtitle2" mt={2}>
                  Personal
                </Typography>
                <MenuList>
                  <MenuItem onClick={() => handleRoute("/user/profile")}>
                    <AccountCircleOutlinedIcon sx={{ marginRight: "7px" }} />
                    Account
                  </MenuItem>
                  <MenuItem onClick={() => handleRoute("/user/settings")}>
                    <SettingsOutlinedIcon sx={{ marginRight: "7px" }} />{" "}
                    Settings
                  </MenuItem>
                  <MenuItem onClick={() => handleRoute("/user/notifications")}>
                    {" "}
                    <NotificationsNoneOutlinedIcon
                      sx={{ marginRight: "7px" }}
                    />
                    Notifications
                  </MenuItem>

                  <Button
                    sx={{ margin: "10px", color: "#d50000" }}
                    variant="text"
                    onClick={handleSignOut}
                  >
                    Logout
                  </Button>
                </MenuList>
              </Box>
            ) : (
              <Button color="warning" onClick={handleSignIn}>
                Login
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
