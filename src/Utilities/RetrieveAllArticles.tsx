import { db } from "../config/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";

export const getAllArticles = async () => {
  try {
    const articlesRef = collectionGroup(db, "articles");
    const snapshot = await getDocs(articlesRef);
    const articles = snapshot.docs.map((doc) =>
      // console.log("doc.id", doc.id),
      ({
        id: doc.id,
        ...doc.data(),
      })
    );
    return { articles, error: null };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { articles: [], error };
  }
};
