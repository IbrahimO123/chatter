import { loginSchema } from "../../config/joi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { updateOtherState } from "../../redux/Others/slice";
import { updateAUser } from "../../redux/user/slice";
import { comparePassword } from "../../Utilities/securePassword";
import { getData } from "../../Utilities/GetUserData";
//import { getCometAuthToken } from "../../Utilities/RetrieveAuthToken";

type RedirectLocationState = {
  redirectTo: Location;
};
export const LoginUser = async ({
  dispatch,
  setErrMessage,
  aUser,
  email,
  password,
  others,
  navigate,
  locationState,
  loggedInUserToCometChat,
}: any) => {
  try {
    const { redirectTo } = (locationState as RedirectLocationState) ?? {};
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
                      loading: false,
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

                  //const respond = getCometAuthToken(res.data()?.cometUid);
                
                  navigate(redirectTo ? `${redirectTo.pathname}` : "/", {
                    replace: true,
                  });
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
    }
  } catch (err: any) {
    console.error("Error while login in a user", err.message);
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
  }
};
