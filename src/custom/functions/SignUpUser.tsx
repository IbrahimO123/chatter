import { updateOtherState } from "../../redux/Others/slice";
import {
  updateUserAsync,
  updateUserDetailsToDefault,
} from "../../redux/user/slice";
import { getData } from "../../Utilities/GetUserData";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateAUserPassword } from "../../redux/user/slice";
import { SignUpSchema } from "../../config/joi";
import { addCometChatAuthTokenToDatabase } from "../../Utilities/SaveAuthToken";

export const signUpUser = async ({
  setErrMessage,
  dispatch,
  email,
  others,
  aUser,
  navigate,
  handleAddUserToCometChat,
  createAuthTokenToCometChat,
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
        if (value.email) {
          const res = await handleAddUserToCometChat({
            firstname: value.firstname,
            lastname: value.lastname,
            email: value.email,
            phoneNumber: value.phoneNumber,
          });
          if (res.uid) {
            const data = await createAuthTokenToCometChat(res.uid);
            if (data.authToken) {
              addCometChatAuthTokenToDatabase(
                {
                  uid: data.uid,
                  email: value.email,
                  authToken: data.authToken,
                  force: false,
                },
                data.uid
              );
              await dispatch(
                updateAUserPassword({
                  ...aUser,
                  cometAuthToken: data.authToken,
                  cometUid: data.uid,
                })
              );
            } else {
              console.log("Invalid Auth Token, data not saved...");
            }
          }
        } else {
          console.log(
            "Email is invalid, cannot create cometchat with this user..."
          );
        }

        await dispatch(
          updateUserAsync({ ...aUser, password: "", confirmPassword: "" })
        );
        dispatch(updateUserDetailsToDefault());
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
      if (err.code === "unavailable") {
        dispatch(
          updateOtherState({
            message: "Check your internet connection",
            open: true,
            close: false,
            error: "",
            loading: false,
            severity: "error",
          })
        );
      }
      return setErrMessage("Email already used for another sign in method");
    }
  }
};
