import { useState } from "react";
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

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { comparePassword } from "../Utilities/securePassword";
import { getData } from "../Utilities/ReadData";
import { updateAUser } from "../redux/user/slice";
import { loginSchema } from "../config/joi";
import { updateOtherState } from "../redux/Others/slice";

export const linkStyle = {
  textDecoration: "none",
  color: "blue",
};

export const gridStyle = {
  display: "grid",
  placeContent: "center",
  height: "80vh",
};

export const Login = () => {
  const fieldStyle = {
    width: { xs: "80%", md: "60%" },
    margin: "0px 0px 10px 0px",
  };
  const [errMessage, setErrMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const others = useSelector((state: RootState) => state.others);
  const { loading } = others;
  const navigate = useNavigate();

  const handleLoginDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAUser({ ...aUser, [e.target.name]: e.target.value }));
  };

  const aUser = useSelector((state: RootState) => state.users.aUser);
  const { email, password } = aUser;
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
    <Box sx={gridStyle}>
      <form onSubmit={handleLogin}>
        <Typography color="white" p={3} component="p" variant="h6">
          Login
        </Typography>
        <div style={{ margin: "10px" }}>
          <InputLabel className="label" htmlFor="email">
            Email:
          </InputLabel>
          <TextField
            sx={fieldStyle}
            variant="filled"
            name="email"
            className="input"
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
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
          <Button type="submit" variant="outlined">
            Login
          </Button>
          <Box sx={{ width: "20%", margin: "0 auto", paddingTop: "5px" }}>
            {loading && <LinearProgress color="success" />}
          </Box>
        </div>
      </form>
      <Typography variant="caption">
        Don't have an account?{" "}
        <Link style={linkStyle} to="/signup">
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};