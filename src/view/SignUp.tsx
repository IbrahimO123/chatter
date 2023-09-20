import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateAUser } from "../redux/user/slice";
import { useDispatch } from "react-redux";

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
} from "@mui/material";
import { gridStyle, linkStyle } from "../Utilities/support";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { signInUser } from "../Utilities/SignInUser";
import { MetaTags } from "../components/MetaTag";

const SignUp = () => {
  const { aUser } = useSelector((state: RootState) => state.users);
  const others = useSelector((state: RootState) => state.others);
  const { loading } = others;
  const [errMessage, setErrMessage] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { firstname, lastname, phoneNumber, email, password, confirmPassword } =
    aUser;

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      signInUser({ setErrMessage, dispatch, email, others, aUser, navigate });
    } catch (err) {
      console.error("Error while signing-up user", err);
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAUser({ ...aUser, [e.target.name]: e.target.value }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <MetaTags
        description="Sign up  page, user can use email and password or use google sign-in method with popup"
        title="Chatter | Sign Up"
        PageTitle="Sign up Page, Sign up  the application"
        typeOfPlatform="website"
        url="/signup"
        href="/signup"
      />
      <Box sx={{ ...gridStyle, backgroundColor: "#4caf50", height: "100vh" }}>
        <form id="form" onSubmit={handleSignUp}>
          <Typography color="white" p={1} component="p" variant="h6">
            Sign Up
          </Typography>
          <div className="left">
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
          </div>
          <div className="right">
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
          </div>
          <div className="left">
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
          </div>
          <div className="right">
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
          </div>

          <div className="left">
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
              autoComplete=""
            ></TextField>
          </div>
          <div className="right">
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
              autoComplete=""
            ></TextField>
          </div>
          <p style={{ color: "red" }}>
            <small>{errMessage ? errMessage : null}</small>
          </p>
          <div className="signup">
            <Button type="submit" variant="contained">
              Sign Up
            </Button>
            <Box sx={{ width: "20%", margin: "0 auto", paddingTop: "5px" }}>
              {loading && <LinearProgress color="success" />}
            </Box>
            <p>
              <Typography className="caption" variant="caption">
                Already have an account?
                <Link style={linkStyle} to="/login">
                  {" "}
                  Login
                </Link>
              </Typography>
            </p>
          </div>
        </form>
      </Box>
    </>
  );
};

export default SignUp;
