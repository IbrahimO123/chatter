import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  updateUserAsync,
  updateAUserPassword,
  updateAUser,
} from "../redux/user/slice";
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
import { linkStyle } from "./Login";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { schema } from "../config/joi";
import { auth } from "../config/firebase";
import { updateOtherState } from "../redux/Others/slice";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getData } from "../Utilities/ReadData";

export const SignUp = () => {
  const { aUser } = useSelector((state: RootState) => state.users);
  const others = useSelector((state: RootState) => state.others);
  const { loading } = others;
  const [errMessage, setErrMessage] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { firstname, lastname, phoneNumber, email, password, confirmPassword } =
    aUser;

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMessage("");
    dispatch(
      updateOtherState({
        ...others,
        loading: true,
      })
    );
    const { error, value } = schema.validate(aUser);
    if (error) {
      dispatch(
        updateOtherState({
          ...others,
          loading: false,
        })
      );
      return setErrMessage(error.message);
    }
    const res = await getData(email);
    if (res?.exists()) {
      dispatch(
        updateOtherState({
          ...others,
          loading: false,
        })
      );
      return setErrMessage("User with the email already exists");
    } else {
      setErrMessage("");
      const { email, password } = value;
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Sign In Successful...",
          loading: true,
        })
      );

      if (userCredentials.user) {
        await sendEmailVerification(userCredentials.user);
        dispatch(
          updateOtherState({
            ...others,
            open: true,
            message: "Email Verification Sent...",
          })
        );
        await dispatch(
          updateAUserPassword({
            ...aUser,
          })
        );
        await dispatch(
          updateUserAsync({ ...aUser, password: "", confirmPassword: "" })
        );
        return navigate("/login", { replace: true });
      } else {
        return dispatch(
          updateOtherState({
            ...others,
            open: true,
            message: "Sign In Failed...",
            loading: false,
          })
        );
      }
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAUser({ ...aUser, [e.target.name]: e.target.value }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <form onSubmit={handleSignUp}>
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
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete=""
        ></TextField>
      </div>
      <p style={{ color: "red", fontSize: "11px" }}>
        <small>{errMessage ? errMessage : null}</small>
      </p>
      <div className="signup">
        <Button type="submit" variant="outlined">
          Sign Up
        </Button>
        <Box sx={{ width: "20%", margin: "0 auto", paddingTop: "5px" }}>
          {loading && <LinearProgress color="success" />}
        </Box>
        <p>
          <Typography variant="caption">
            Already have an account?{" "}
            <Link style={linkStyle} to="/login">
              Login
            </Link>
          </Typography>
        </p>
      </div>
    </form>
  );
};