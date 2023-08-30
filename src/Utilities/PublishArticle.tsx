import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Article } from "../redux/articles/model";

export const PublishArticle = async (data: Article, uid:any) => {
  try {
    const collectionRef = collection(db, "articles", uid, "articles");
    const res = await setDoc(doc(collectionRef), data);
    return res;
  } catch (e: any) {
    console.error(e.message);
  }
};
