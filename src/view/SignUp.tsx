import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  IconButton,
  InputLabel,
  FormHelperText,
  InputAdornment,
  TextField,
  Button,
  Box,
  LinearProgress,
  Typography,
  Stack,
} from "@mui/material";
import { gridStyle, linkStyle } from "../Utilities/Miscellaneous";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { signUpUser } from "../custom/functions/SignUpUser";
import { MetaTags } from "../components/MetaTag";
import { useGeneral } from "../custom/hooks/useGeneral";
import { updateUserDetailsToDefault } from "../redux/user/slice";
import { useChat } from "../custom/hooks/useChat";

const SignUp = () => {
  const [errMessage, setErrMessage] = useState<string>("");
  const navigate = useNavigate();
  const {
    handleUserChange,
    aUser,
    others,
    firstname,
    lastname,
    phoneNumber,
    email,
    password,
    confirmPassword,
    loading,
    dispatch,
  } = useGeneral();

  const { handleAddUserToCometChat, createAuthTokenToCometChat } = useChat();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await signUpUser({
        setErrMessage,
        dispatch,
        email,
        others,
        aUser,
        navigate,
        handleAddUserToCometChat,
        createAuthTokenToCometChat,
      });
    } catch (err) {
      console.error("Error while signing-up user", err);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    dispatch(updateUserDetailsToDefault());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MetaTags
        description="Sign up  page, user can use email and password or use google sign-in method with popup"
        title="Sign Up | Chatter "
        PageTitle="Sign up Page, Sign up  the application"
        typeOfPlatform="website"
        url="/signup"
        href="/signup"
      />
      <Box sx={gridStyle}>
        <form id="form" onSubmit={handleSignUp}>
          <Typography color="white" p={1} component="p" variant="h6">
            Sign Up
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            m={1}
          >
            <Box component="div">
              <InputLabel className="label" htmlFor="firstname">
                Firstname:
              </InputLabel>
              <TextField
                required
                id="firstname"
                name="firstname"
                type="text"
                value={firstname}
                onChange={handleUserChange}
                variant="filled"
                placeholder="Your firstname"
                className="input"
              ></TextField>
              <FormHelperText color="red"></FormHelperText>
            </Box>
            <Box component="div">
              <InputLabel className="label" htmlFor="lastname">
                Lastname:
              </InputLabel>
              <TextField
                required
                id="lastname"
                name="lastname"
                type="text"
                value={lastname}
                onChange={handleUserChange}
                variant="filled"
                placeholder="Your lastname"
                className="input"
              ></TextField>
            </Box>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            m={1}
          >
            <Box component="div">
              <InputLabel className="label" htmlFor="email">
                Email:
              </InputLabel>
              <TextField
                id="email"
                value={email}
                name="email"
                variant="filled"
                onChange={handleUserChange}
                className="input"
                placeholder="Your email"
                type="email"
              ></TextField>
            </Box>
            <Box component="div">
              <InputLabel className="label" htmlFor="phoneNumber">
                Phone number:
              </InputLabel>
              <TextField
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleUserChange}
                variant="filled"
                placeholder="Your phone number"
                className="input"
              ></TextField>
            </Box>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            m={1}
          >
            <Box component="div">
              <InputLabel className="label" htmlFor="password">
                Password:
              </InputLabel>
              <TextField
                required
                id="password"
                name="password"
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={handleUserChange}
                variant="filled"
                placeholder="Your password"
                className="input"
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
                autoComplete="on"
              ></TextField>
            </Box>
            <Box component="div">
              <InputLabel className="label" htmlFor="Confirm password">
                Confirm Password:
              </InputLabel>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                type={showPassword ? "text" : "password"}
                onChange={handleUserChange}
                variant="filled"
                placeholder="Confirm password"
                className="input"
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
                autoComplete="on"
              ></TextField>
            </Box>
          </Stack>
          <p style={{ color: "red", fontWeight: "bolder" }}>
            <small>{errMessage ? errMessage : null}</small>
          </p>
          <Box component="div" className="signup">
            <Button type="submit" variant="contained">
              Sign Up
            </Button>
            <Box sx={{ width: "20%", margin: "0 auto", paddingTop: "5px" }}>
              {loading && <LinearProgress color="success" />}
            </Box>
            <Box component="div">
              <Typography className="caption" variant="caption">
                Already have an account?
                <Link style={linkStyle} to="/login">
                  {" "}
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SignUp;
