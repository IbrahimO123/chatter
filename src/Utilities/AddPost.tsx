import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Post } from "../redux/posts/model";

export const addPostToDatabase = async (data: Post, uid: any) => {
  try {
    const collectionRef = collection(db, "posts", uid, "published");
    const res = await setDoc(doc(collectionRef), data);
    return res;
  } catch (e: any) {
    console.error(e.message);
  }
};
