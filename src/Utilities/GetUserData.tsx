import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

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
