import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { updateAUser } from "../redux/user/slice";
import { AppDispatch } from "../redux/store";
import { User } from "firebase/auth";
import { updateOtherState } from "../redux/Others/slice";

type getLoggedInUserProps = {
  user: User | undefined | null;
  dispatch: AppDispatch;
  aUser: any;
};

export const getData = async (email: string) => {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);
  return docSnap;
};

export const getLoggedInUser = async ({
  user,
  dispatch,
  aUser,
}: getLoggedInUserProps) => {
  try {
    if (user) {
      if (user.uid !== null) {
        const res = await getData(user.email!);
        if (res?.exists()) {
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
              dateCreated: res?.data()?.dateCreated,
              timeCreated: res?.data()?.timeCreated,
              profileImageUrl: res?.data()?.profileImageUrl,
              facebookHandle: res?.data()?.facebookHandle,
              twitterHandle: res?.data()?.twitterHandle,
              linkedInHandle: res?.data()?.linkedInHandle,
            })
          );
        } else {
          user.providerData.forEach((profile: any) => {
            dispatch(
              updateAUser({
                ...aUser,
                firstname: profile.displayName.split(" ")[0],
                lastname: profile.displayName.split(" ")[1],
                phoneNumber: profile.phoneNumber || "",
                email: profile.email,
                isLoggedIn: true,
                isRegistered: true,
                isAuthorised: true,
                profileImageUrl: profile.profileImageUrl,
                dateCreated: "",
                timeCreated: "",
                facebookHandle: "",
                twitterHandle: " ",
                linkedInHandle: " ",
              })
            );
          });
        }
        return "Done";
      }
    }
  } catch (err: any) {
    console.error("Error while getting signed user", err.message);
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
