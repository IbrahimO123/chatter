import { updateOtherState } from "../redux/Others/slice";
import { updateUserAsync } from "../redux/user/slice";
import { getData } from "./GetUserData";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateAUserPassword } from "../redux/user/slice";
import { schema } from "../config/joi";

export const signInUser = async ({
  setErrMessage,
  dispatch,
  email,
  others,
  aUser,
  navigate,
}: any) => {
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