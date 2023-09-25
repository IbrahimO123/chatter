import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { getData } from "./GetUserData";

type dataProps = {
  profileImageUrl: string;
};

export const AddProfileImageToDatabase = async (
  data: dataProps,
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
