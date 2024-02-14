import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { CommentModel } from "../redux/comment/model";

export const addCommentToDatabase = async (
  data: CommentModel,
  commentId: string
) => {
  try {
    const collectionRef = collection(db, "comments", commentId, "comment");
    const res = await setDoc(doc(collectionRef), data);
    return res;
  } catch (e: any) {
    console.error(e.message);
  }
};

export const addPostCommentToDatabase = async (
  data: CommentModel,
  commentId: string
) => {
  try {
    const collectionRef = collection(
      db,
      "postComments",
      commentId,
      "postComments"
    );
    const res = await setDoc(doc(collectionRef), data);
    return res;
  } catch (e: any) {
    console.error(e.message);
  }
};
