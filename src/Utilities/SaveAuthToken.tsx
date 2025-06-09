import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

type AuthToken = {
  uid: string;
  force: Boolean;
  email:string
  authToken:string
};

export const addCometChatAuthTokenToDatabase = async (
  data: AuthToken,
  uid: string
) => {
  try {
    const collectionRef = collection(db, "cometchat", uid, "authToken");
    const res = await setDoc(doc(collectionRef), data);
    return res;
  } catch (e: any) {
    console.error(e.message);
  }
};
