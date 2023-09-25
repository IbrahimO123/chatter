import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { getData } from "./GetUserData";
import { UserDataUpdateProps } from "../redux/user/model";

export const updateUserDetails = async (
  data: UserDataUpdateProps,
  email: string
) => {
  try {
    const res = await getData(email);
    if (res?.exists()) {
      const docRef = doc(db, "users", email);
      await updateDoc(docRef, data);
      return "Done";
    } else {
      return "error while updating";
    }
  } catch (err: any) {
    console.error("Erorr while updating user details: ", err.code);
  }
};
