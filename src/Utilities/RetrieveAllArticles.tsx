import { db } from "../config/firebase";
import { collectionGroup, getDocsFromServer } from "firebase/firestore";

export const getAllArticles = async () => {
  try {
    const articlesRef = collectionGroup(db, "articles");
    const snapshot = await getDocsFromServer(articlesRef);
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
