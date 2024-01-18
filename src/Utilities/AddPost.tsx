import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Post } from "../redux/posts/model";

export const addPostToDatabase = async (data: Post, uid: string) => {
  try {
    const collectionRef = collection(db, "posts", uid, "published");
    await setDoc(doc(collectionRef), data);
    return true;
  } catch (e: any) {
    console.error(e.message);
    return false;
  }
};
