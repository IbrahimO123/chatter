import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { updateAUser } from "../redux/user/slice";

export const getData = async (email: string) => {
  try {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    return docSnap;
  } catch (err: any) {
    console.info("Error getting data");
    console.error(err.message);
  }
};

export const getLoggedInUser = async ({
  user,
  dispatch,
  aUser,
}: any) => {
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
            dateCreated: res?.data()?.dateCreated,
            timeCreated: res?.data()?.timeCreated,
            profileImageUrl: res?.data()?.profileImageUrl,
            facebookHandle: res?.data()?.facebookHandle,
            twitterHandle: res?.data()?.twitterHandle,
            linkedInHandle: res?.data()?.linkedInHandle,
          })
        );
      }
      return "Done"
    }
  }
};
