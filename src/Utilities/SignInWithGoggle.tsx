import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { addToDatabase } from "./AddUser";
import { getData } from "./GetUserData";
import { User } from "../redux/user/model";

export const signInWithGoogle = async (data: User) => {
  let result;
  let error = "";
  try {
    result = await signInWithPopup(auth, provider);
    const response = await getData(result.user.email!);
    if (!response?.exists()) {
      addToDatabase(
        {
          ...data,
          email: result?.user.email!,
          firstname: result?.user.displayName?.split(" ")[0]!,
          lastname: result?.user.displayName?.split(" ")[1]!,
          profileImageUrl: result?.user.photoURL!,
          isAuthorised: true,
          isRegistered: true,
        },
        result.user.email!
      );
    } else return;
  } catch (err: any) {
    error = "Error while signing with Google Sign In Method: " + err.code;
    console.error(error);
  }
  return {
    result,
    error,
  };
};
