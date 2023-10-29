import { db } from "../config/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";

export const getAllLikedArticle = async (articleId: string) => {
  try {
    const likedRef = collectionGroup(db, "likes");
    const snapshot = await getDocs(likedRef);
    const liked = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const likedArticle = liked.filter(
      (likedArt: any) => likedArt.articleId === articleId
    );
    return { likedArticle, error: null };
  } catch (error) {
    console.error("Error fetching liked articles:", error);
    return { likedArticle: [], error };
  }
};
