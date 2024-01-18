import { db } from "../config/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";

export const getAllPosts = async () => {
  try {
    const postsRef = collectionGroup(db, "published");
    const snapshot = await getDocs(postsRef);
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { posts, error: null };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], error };
  }
};
