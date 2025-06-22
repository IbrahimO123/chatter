import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { addToDatabase } from "./AddUser";
import { getData } from "./GetUserData";
import { User } from "../redux/user/model";
import { addCometChatAuthTokenToDatabase } from "./SaveAuthToken";

export const signInWithGoogle = async (
  data: User,
  handleAddUserToCometChat: any,
  createAuthTokenToCometChat: any
) => {
  let result;
  let error = "";
  try {
    result = await signInWithPopup(auth, provider);
    const response = await getData(result.user.email!);
    if (!response?.exists()) {
      if (response.data()?.email) {
        const res = await handleAddUserToCometChat({
          firstname: response.data()?.firstname,
          lastname: response.data()?.lastname,
          email: response.data()?.email,
          phoneNumber: response.data()?.phoneNumber,
        });
        if (res.uid) {
          const value = await createAuthTokenToCometChat(res.uid);
          if (value.authToken) {
            await addCometChatAuthTokenToDatabase(
              {
                uid: value.uid,
                email: response.data()?.email,
                authToken: value.authToken,
                force: false,
              },
              value.uid
            );
            await addToDatabase(
              {
                ...data,
                email: result?.user.email!,
                firstname: result?.user.displayName?.split(" ")[0]!,
                lastname: result?.user.displayName?.split(" ")[1]!,
                profileImageUrl: result?.user.photoURL!,
                isAuthorised: true,
                isRegistered: true,
                cometAuthToken: value.authToken,
                cometUid: value.uid,
              },
              result.user.email!
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
    }
  } catch (err: any) {
    error = "Error while signing with Google Sign In Method: " + err.code;
    console.error(error);
  }
  return {
    result,
    error,
  };
};
