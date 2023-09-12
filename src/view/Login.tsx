import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  InputLabel,
  InputAdornment,
  TextField,
  Button,
  LinearProgress,
  Typography,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { comparePassword } from "../Utilities/securePassword";
import { getData } from "../Utilities/GetUserData";
import { updateAUser } from "../redux/user/slice";
import { loginSchema } from "../config/joi";
import { updateOtherState } from "../redux/Others/slice";
import { gridStyle, linkStyle } from "../Utilities/support";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithGoogle } from "../config/firebase/functions";
import { MetaTags } from "../components/MetaTag";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [user] = useAuthState(auth);
  const aUser = useSelector((state: RootState) => state.users.aUser);
  const navigate = useNavigate();

  const getLoggedInUser = async () => {
    if (user) {
      if (user.uid !== null) {
        const res = await getData(user.email!);
        if (res?.data() !== null) {
          dispatch(
            updateAUser({
              ...aUser,
              firstname: res?.data()?.firstname,
              lastname: res?.data()?.lastname,
              phoneNumber: res?.data()?.phoneNumber,
              email: res?.data()?.email,
              isLoggedIn: true,
              isRegistered: res?.data()?.isRegistered,
              isAuthorised: res?.data()?.isAuthorised,
            })
          );
          navigate("/", { replace: true });
        }
      }
    }
  };

  useEffect(
    () => {
      
      getLoggedInUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, navigate]
  );

  const fieldStyle = {
    width: { xs: "80%", md: "80%" },
  };
  const [errMessage, setErrMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const others = useSelector((state: RootState) => state.others);
  const { loading } = others;

  const handleLoginDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAUser({ ...aUser, [e.target.name]: e.target.value }));
  };

  const { email, password } = aUser;

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMessage("");
    dispatch(
      updateOtherState({
        ...others,
        loading: true,
      })
    );
    const { error, value } = loginSchema.validate({ email, password });
    if (error) {
      dispatch(
        updateOtherState({
          ...others,
          loading: false,
        })
      );
      return setErrMessage(error.message);
    } else {
      try {
        if (value) {
          const { email, password } = value;

          await signInWithEmailAndPassword(auth, email, password);
        }
      } catch (err: any) {
        if (err.code === "auth/user-not-found") {
          dispatch(
            updateOtherState({
              ...others,
              loading: false,
            })
          );
          return setErrMessage("Not yet registered");
        } else if (err.code === "auth/wrong-password") {
          dispatch(
            updateOtherState({
              ...others,
              loading: false,
            })
          );
          return setErrMessage("Incorrect email or password");
        }
      }
      if (email) {
        getData(email).then((res) => {
          if (res?.data() === undefined) {
            dispatch(
              updateOtherState({
                ...others,
                loading: false,
              })
            );
            return setErrMessage("Invalid email or password");
          } else {
            comparePassword(password, res.data()?.password).then((value) => {
              if (value) {
                setErrMessage("");
                dispatch(
                  updateOtherState({
                    ...others,
                    open: true,
                    message: "Login successful",
                    severity: "success",
                    loading: true,
                  })
                );
                dispatch(
                  updateAUser({
                    ...aUser,
                    ...res.data(),
                    confirmPassword: "",
                    password: "",
                    isLoggedIn: true,
                  })
                );
                setTimeout(() => navigate("/", { replace: true }), 500);
                return;
              } else {
                dispatch(
                  updateOtherState({
                    ...others,
                    loading: false,
                  })
                );
                return setErrMessage("Invalid email or password");
              }
            });
          }
        });
      } else {
        dispatch(
          updateOtherState({
            ...others,
            loading: false,
          })
        );
        return setErrMessage("Email or Password is incorrect");
      }
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <MetaTags
        description="Login in page, user can use email and password or use google sign-in method with popup"
        title="Chatter | Login"
        PageTitle="Login Page, login in the application"
        typeOfPlatform="website"
        url="/login"
        href="/login"
      />
      <Box sx={{ ...gridStyle, backgroundColor: "#4caf50" }}>
        <form onSubmit={handleLogin}>
          <Typography color="white" p={1} component="p" variant="h6">
            Login
          </Typography>
          <div style={{ margin: "10px" }}>
            <InputLabel className="label" htmlFor="email">
              Email:
            </InputLabel>
            <TextField
              sx={fieldStyle}
              variant="filled"
              className="input"
              name="email"
              onChange={handleLoginDetails}
              required
              id="email"
              value={email}
              type="email"
              placeholder="Your email address"
            ></TextField>
          </div>
          <div>
            <InputLabel className="label" htmlFor="password">
              Password:
            </InputLabel>
            <TextField
              variant="filled"
              className="input"
              autoComplete=""
              name="password"
              onChange={handleLoginDetails}
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
          </div>
          <p style={{ color: "red" }}>
            {errMessage && <small>{errMessage}</small>}
          </p>
          <div>
            <Button color="primary" type="submit" variant="contained">
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
        </form>
        <Box textAlign="center" color="white">
          <p>Sign in with Google </p>

          <Button
            onClick={handleGoogleSignIn}
            sx={{ backgroundColor: "#fff", color: "#000" }}
            variant="contained"
            startIcon={
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google Sign In"
              />
            }
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Login;
