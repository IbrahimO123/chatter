import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CircularSawSvg from "../assets/images/circular-saw.svg";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import CreateIcon from "@mui/icons-material/Create";
import { Draft } from "./Draft";
import { GridOne } from "./GridOne";
import ChatIcon from "@mui/icons-material/Chat";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../Utilities/Miscellaneous";
import { useGeneral } from "../custom/hooks/useGeneral";
import { PopUp } from "./PopUpState";

export const AppNav = () => {
  const [open, setOpen] = useState(false);
  const { user, navigate } = useGeneral();
  const { pathname } = useLocation();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleUserProfileRoute = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate("/user/profile");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#4caf50" }}>
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
              <MenuIcon />
            </IconButton>
            <Drawer
              sx={{ display: { xs: "flex", md: "none" } }}
              anchor="left"
              open={open}
              onClose={toggleDrawer}
            >
              <>
                {pathname === "/write" ? (
                  <Draft applyStyle={true} />
                ) : (
                  <GridOne />
                )}
              </>
            </Drawer>
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
          {user?.uid ? (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          ) : null}
          <Box>
            {user?.uid ? (
              <div>
                <Box sx={{ display: "flex" }}>
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
                  <PopUp Icon={ChatIcon} message="No new chat..." />
                  <PopUp
                    Icon={NotificationsIcon}
                    message="No new Notifications"
                  />
                  <IconButton
                    size="small"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleUserProfileRoute}
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
              </div>
            ) : (
              <Box>
                <IconButton disableRipple>
                  <Link
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: 16,
                    }}
                    to="/login"
                  >
                    Login
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
