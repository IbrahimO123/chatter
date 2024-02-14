import { db } from "../config/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";

export const getAllComments = async (commentId: string) => {
  try {
    const commentRef = collectionGroup(db, "comment");
    const snapshot = await getDocs(commentRef);
    const mappedComments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const comments = mappedComments.filter(
      (comment) => comment.id === commentId
    );
    return { comments, error: null };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { comments: [], error };
  }
};


export const getAllPostComments = async (commentId: string) => {
  try {
    const commentRef = collectionGroup(db, "postComments");
    const snapshot = await getDocs(commentRef);
    const mappedComments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const comments = mappedComments.filter(
      (comment) => comment.id === commentId
    );
    return { comments, error: null };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { comments: [], error };
  }
};
