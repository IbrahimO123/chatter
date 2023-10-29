import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const UnlikeArticle = async (articleId: any, likeId: string) => {
  try {
    await deleteDoc(doc(db, "likes", articleId, "likes", likeId));
  } catch (err:any) {
    console.error("Error deleting liked article", err.message);
  }
};
