import { updateOtherState } from "../../redux/Others/slice";
import { updateUserAsync } from "../../redux/user/slice";
import { getData } from "../../Utilities/GetUserData";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateAUserPassword } from "../../redux/user/slice";
import { SignUpSchema } from "../../config/joi";

export const signUpUser = async ({
  setErrMessage,
  dispatch,
  email,
  others,
  aUser,
  navigate,
}: any) => {
  try {
    setErrMessage("");
    dispatch(
      updateOtherState({
        ...others,
        loading: true,
      })
    );
    const { error, value } = SignUpSchema.validate(aUser);
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
          loading: false,
        })
      );

      if (userCredentials.user) {
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
  } catch (err: any) {
    console.error("Error while signing up a user", err.code);
    dispatch(
      updateOtherState({
        ...others,
        loading: false,
      })
    );
    if (err.code === "auth/email-already-in-use") {
      dispatch(
        updateOtherState({
          ...others,
          loading: false,
        })
      );
      return setErrMessage("Email already used for another sign in method");
    }
  }
};
