import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { User } from "../redux/user/model";

export const addToDatabase = async (data: User, email: string) => {
  try {
    const collectionRef = collection(db, "users");
    const res = await setDoc(doc(collectionRef, email), data);
    return res;
  } catch (e: any) {
    console.error(e.message);
    return "failed";
  }
};



