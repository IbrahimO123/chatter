import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { LikeModel } from "../redux/like/model";

export const addLikeArticleToDatabase = async (
  data: LikeModel,
  articleId: string
) => {
  try {
    const collectionRef = collection(db, "likes", articleId, "likes");
    const res = await setDoc(doc(collectionRef), data);
    return res;
  } catch (e: any) {
    console.error(e.message);
  }
};
