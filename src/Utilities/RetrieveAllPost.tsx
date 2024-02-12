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
    // const articlesRef = collectionGroup(db, "articles");
    // const snapshotP = await getDocs(articlesRef);
    // const articles = snapshotP.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    // const allPublished = posts.concat(articles);
    // console.log(allPublished);
    return { posts, error: null };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], error };
  }
};
