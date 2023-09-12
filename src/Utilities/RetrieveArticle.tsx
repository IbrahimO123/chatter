import { collectionGroup, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const getSingleArticle = async (articleId: string) => {
  try {
    const articlesRef = collectionGroup(db, "articles");
    const docSnap = await getDocs(articlesRef);
    // eslint-disable-next-line array-callback-return
    const data = docSnap.docs.map((doc) => {
      if (doc.id === articleId) {
        return {
          id: doc.id,
          ...doc.data(),
        };
      }
    });
    return data.filter((doc) => doc !== undefined);
  } catch (err) {
    console.log("Error while fetching", err);
  }
};
