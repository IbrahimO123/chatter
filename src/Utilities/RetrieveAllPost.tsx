import { db } from "../config/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";

export const getAllArticles = async () => {
  try {
    const articlesRef = collectionGroup(db, "posts");
    const snapshot = await getDocs(articlesRef);
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { posts, error: null };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { articles: [], error };
  }
};
