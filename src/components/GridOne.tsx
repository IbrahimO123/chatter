import {
  Paper,
  MenuList,
  MenuItem,
  IconButton,
  Divider,
  Box,
  Typography,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ForumIcon from "@mui/icons-material/Forum";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { updateOtherState } from "../redux/Others/slice";
import { updateAUser, updateUserDetailsToDefault } from "../redux/user/slice";
import { Link } from "react-router-dom";

import { useGeneral } from "../custom/hooks/useGeneral";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useChat } from "../custom/hooks/useChat";

export const GridOne = () => {
  const { navigate, user, dispatch, others, aUser } = useGeneral();
  const { aCometUser } = useChat();

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
      if (aCometUser.withAuthToken) {
        CometChat.logout();
      }
      dispatch(updateAUser({ ...aUser, isLoggedIn: false }));
      dispatch(updateUserDetailsToDefault());
      return;
    } catch (e: any) {
      console.error("Error while siging out user: ", e.code);
    }
  };
  return (
    <Box>
      <Paper elevation={0} sx={{ padding: "0px 1px" }}>
        <MenuList>
          <MenuItem onClick={() => handleRoute("/")}>
            <IconButton>
              <HomeIcon />
            </IconButton>
            <Typography variant="subtitle2">Home</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleRoute("/write")}>
            <IconButton>
              <EditNoteIcon />
            </IconButton>
            <Typography variant="subtitle2">Write up</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleRoute("/communities")}>
            <IconButton>
              <ForumIcon />
            </IconButton>
            <Typography variant="subtitle2">Communities</Typography>
          </MenuItem>
          <MenuItem>
            <IconButton>
              <FolderSpecialIcon />
            </IconButton>
            <Typography variant="subtitle2">Bookmarks</Typography>
          </MenuItem>
          <MenuItem>
            <IconButton>
              <HelpIcon />
            </IconButton>
            <Typography variant="subtitle2">Help</Typography>
          </MenuItem>
          <MenuItem>
            <IconButton>
              <InfoIcon />
            </IconButton>
            <Typography variant="subtitle2">About</Typography>
          </MenuItem>
        </MenuList>
        <Divider></Divider>
        <Box component="div" p={2}>
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              <Typography variant="h6" mr={1} component="span">
                Trending Tags
              </Typography>
              <TrendingUpIcon />
            </Box>
            <MenuList>
              <MenuItem>
                <Typography variant="subtitle2">&#35;Programming</Typography>
              </MenuItem>
              <MenuItem>
                <Typography variant="subtitle2">&#35;Science</Typography>
              </MenuItem>
              <MenuItem>
                <Typography variant="subtitle2">&#35;Technology</Typography>
              </MenuItem>
              <MenuItem>
                <Typography variant="subtitle2">
                  &#35;Machine Learning
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography variant="subtitle2">&#35;Programming</Typography>
              </MenuItem>
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
