import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  IconButton,
  InputLabel,
  InputAdornment,
  TextField,
  Button,
  LinearProgress,
  Typography,
  Stack,
} from "@mui/material";
import { auth } from "../config/firebase";
import { gridStyle, linkStyle } from "../Utilities/Miscellaneous";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithGoogle } from "../Utilities/SignInWithGoggle";
import { MetaTags } from "../components/MetaTag";
import { getLoggedInUser } from "../Utilities/GetUserData";
import { LoginUser } from "../custom/functions/LoginUser";
import { useGeneral } from "../custom/hooks/useGeneral";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleLogo from "../assets/images/google-icon-logo-svgrepo-com.svg";
type RedirectLocationState = {
  redirectTo: Location;
};

const Login = () => {
  const [user] = useAuthState(auth);
  const [errMessage, setErrMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleUserChange,
    updateOtherState,
    aUser,
    others,
    email,
    password,
    loading,
    dispatch,
    navigate,
    locationState,
  } = useGeneral();
  const handleFetchUser = async () => {
    const { redirectTo } = (locationState as RedirectLocationState) ?? {};
    try {
      const response = await getLoggedInUser({ user, dispatch, aUser });
      if (response) {
        navigate(redirectTo ? `${redirectTo.pathname}` : "/", {
          replace: true,
        });
      }
    } catch (err) {
      console.error("Error fetching user", err);
    }
  };

  useEffect(
    () => {
      handleFetchUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, navigate]
  );

  const fieldStyle = {
    width: { xs: "80%", md: "80%" },
  };

  const handleGoogleSignIn = async () => {
    try {
      const value = await signInWithGoogle(aUser);
      if (value?.error) {
        return navigate("/login", { replace: true });
      }
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Sign in successfully with Google",
          severity: "success",
        })
      );
    } catch (err) {
      console.error("Error siging in user with google sign in method", err);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await LoginUser({
        dispatch,
        setErrMessage,
        aUser,
        email,
        password,
        others,
        navigate,
        locationState,
      });
    } catch (err) {
      console.error("Error login", err);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <MetaTags
        description="Login in page, user can use email and password or use google sign-in method with popup"
        title="Login | Chatter"
        PageTitle="Login Page, login in the application"
        typeOfPlatform="website"
        url="/login"
        href="/login"
      />
      <Box sx={gridStyle}>
        <form id="Loginform" onSubmit={handleLogin}>
          <Typography color="white" p={1} component="p" variant="h6">
            Login
          </Typography>
          <Stack
            direction={{ xs: "column" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            m={1}
          >
            <Box component="div">
              <InputLabel className="label" htmlFor="email">
                Email:
              </InputLabel>
              <TextField
                sx={fieldStyle}
                variant="filled"
                className="input"
                name="email"
                onChange={handleUserChange}
                required
                id="email"
                value={email}
                type="email"
                placeholder="Your email address"
              ></TextField>
            </Box>
            <Box component="div">
              <InputLabel className="label" htmlFor="password">
                Password:
              </InputLabel>
              <TextField
                variant="filled"
                className="input"
                autoComplete=""
                name="password"
                onChange={handleUserChange}
                value={password}
                sx={fieldStyle}
                required
                id="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="Your password"
                type={showPassword ? "text" : "password"}
              ></TextField>
            </Box>
          </Stack>
          <Box component="div">
            <p style={{ color: "red" }}>
              {errMessage && <small>{errMessage}</small>}
            </p>
            <div>
              <Button disableElevation color="primary" type="submit" variant="contained">
                Login
              </Button>
              <Box sx={{ width: "20%", margin: "0 auto", paddingTop: "5px" }}>
                {loading && <LinearProgress color="success" />}
              </Box>
            </div>

            <Typography className="caption" variant="caption">
              Don't have an account?{" "}
              <Link style={linkStyle} to="/signup">
                Sign-up
              </Link>
            </Typography>
            <Box textAlign="center" color="white">
              <p>Sign in with Google </p>

              <Button
                onClick={handleGoogleSignIn}
                sx={{ backgroundColor: "#fff", color: "#000" }}
                variant="contained"
                disableElevation
                startIcon={
                  <img
                    src={GoogleLogo}
                    style={{ width: "20px", padding: "5px", color: "white" }}
                    alt="man working on a saw mill"
                  />
                }
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Login;
