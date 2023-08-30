import { collection, setDoc, doc } from "firebase/firestore";
import { User } from "../redux/user/model";
import { db } from "../config/firebase";
import { Article } from "../redux/articles/model";

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

export const addDraftToDatabase = async (
  data: Article,
  uid: any
) => {
  try {
 
    const collectionRef = collection(db, "articles", uid, "drafts");
    const res = await setDoc(doc(collectionRef), data);
   
    return res;
  } catch (e: any) {
    console.error(e.message);
  }
};
