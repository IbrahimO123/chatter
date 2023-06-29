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
import { useNavigate } from "react-router-dom";
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
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateOtherState } from "../redux/Others/slice";
import { updateAUser } from "../redux/user/slice";

export const GridOne = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const others = useSelector((state: RootState) => state.others);
  const aUser = useSelector((state: RootState) => state.users.aUser);

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
      navigate("/login", { replace: true });
      return;
    } catch (e: any) {
      console.error(e.message);
    }
  };
  return (
    <Box>
      <Paper elevation={8} sx={{ padding: "0px 1px" }}>
        <MenuList>
          <MenuItem>
            <IconButton>
              <HomeIcon />
            </IconButton>
            Home
          </MenuItem>
          <MenuItem>
            <IconButton>
              <EditNoteIcon />
            </IconButton>
            Draft
          </MenuItem>
          <MenuItem>
            <IconButton>
              <ChatIcon />
            </IconButton>
            Chat
          </MenuItem>
          <MenuItem>
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
          <MenuItem>
            <IconButton>
              <ExpandMoreIcon />
            </IconButton>
            More
          </MenuItem>
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
              <MenuItem>See all</MenuItem>
            </MenuList>
            <Divider></Divider>
            <Box>
              <Typography variant="subtitle2" ml={-10} mt={2}>
                Personal
              </Typography>
              <MenuList>
                <MenuItem>
                  <AccountCircleOutlinedIcon sx={{ marginRight: "7px" }} />
                  Account
                </MenuItem>
                <MenuItem>
                  <SettingsOutlinedIcon sx={{ marginRight: "7px" }} /> Settings
                </MenuItem>
                <MenuItem>
                  {" "}
                  <NotificationsNoneOutlinedIcon sx={{ marginRight: "7px" }} />
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
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
