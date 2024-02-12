import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const UnlikeArticle = async (articleId: any, likeId: string) => {
  try {
    await deleteDoc(doc(db, "likes", articleId, "likes", likeId));
    return "done";
  } catch (err: any) {
    console.error("Error deleting liked article", err.message);
  }
};

export const UnLikePost = async (postId: any, likeId: string) => {
  try {
    await deleteDoc(doc(db, "likePosts", postId, "likesPosts", likeId));
    return "done";
  } catch (err: any) {
    console.error("Error deleting liked post", err.message);
  }
};
