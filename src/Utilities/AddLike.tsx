import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { LikeModel, LikePostModel } from "../redux/like/model";

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


export const addLikePostToDatabase = async (
  data: LikePostModel,
  postId: string
) => {
  try {
    const collectionRef = collection(db, "likePosts", postId, "likesPosts");
    const res = await setDoc(doc(collectionRef), data);
    return res;
  } catch (e: any) {
    console.error(e.message);
  }
};
