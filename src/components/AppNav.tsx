import{ useState } from "react";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import CircularSawSvg from "../assets/images/circular-saw.svg";
import { useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import CreateIcon from "@mui/icons-material/Create";

import { RootState } from "../redux/store";
import { GridOne } from "./GridOne";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const AppNav = () => {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  const menuId = "primary-search-account-menu";
  const { aUser } = useSelector((state: RootState) => state.users);
  const { isRegistered, isAuthorised } = aUser;

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#6a1b9a" }}>
        <Toolbar>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
              onClick={toggleDrawer}
            >
              {user?.uid && <MenuIcon />}
            </IconButton>
            {user?.uid ? (
              <Drawer
                sx={{ display: { xs: "flex", md: "none" } }}
                anchor="left"
                open={open}
                onClose={toggleDrawer}
              >
                <GridOne />
              </Drawer>
            ) : null}
          </Box>
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            <img
              src={CircularSawSvg}
              style={{ width: "20px", padding: "5px", color: "white" }}
              alt="man working on a saw mill"
            />
          </Link>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              Chatter
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box>
            {user?.uid ? (
              <div>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <Link className="link" to="/write">
                    <IconButton
                      size="small"
                      aria-label="write new article"
                      color="inherit"
                      title="Write new article"
                    >
                      <CreateIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    size="small"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="small"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
              </div>
            ) : isRegistered && isAuthorised ? (
              <Box>
                <IconButton>
                  <Link
                    style={{ color: "#fff", textDecoration: "none" }}
                    to="/login"
                  >
                    Login
                  </Link>
                </IconButton>
              </Box>
            ) : (
              <Box>
                <IconButton>
                  <Link
                    style={{ color: "#fff", textDecoration: "none" }}
                    to="/signup"
                  >
                    Join
                  </Link>
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
