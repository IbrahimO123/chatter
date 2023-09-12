import { db } from "../config/firebase";
import {
  useCollectionData,
  useCollectionDataOnce,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { collection, doc, query, where, getDocs } from "firebase/firestore";

export const RetrieveAllArticleOnce = async () => {
  const [value, loading, error] = useCollectionDataOnce(
    collection(db, "articles")
  );
  if (loading) {
    return "Loading";
  } else if (error) {
    return "Error";
  } else return value;
};

export const RetrieveAllArticleCont = async () => {
  const [value, loading, error] = useCollectionData(collection(db, "articles"));
  if (loading) {
    return "Loading";
  } else if (error) {
    return "Error";
  } else return value;
};

export const RetrieveAArticleOnce = async (title: string) => {
  const ref = collection(db, "articles");
  const q = query(ref, where("title", "==", title));
  const result = await getDocs(q);

  return result;
};

export const RetrieveAArticleCont = async (title: string) => {
  const ref = doc(db, "articles");
  const [value, loading, error] = useDocumentData(ref);
  if (loading) {
    return "Loading";
  } else if (error) {
    return "Error";
  } else return value;
};

export const RetrieveDrafts = async (uid: any) => {
  const draftSnapShot = await getDocs(
    collection(db, "articles", uid, "drafts")
  );
  let userDrafts: any = [];
  if (draftSnapShot) {
    draftSnapShot.forEach((doc) => {
      userDrafts.push({ id: doc.id, data: doc.data() });
    });
  }
  return userDrafts;
};

export const RetrieveSingleDraft = async (uid: any, draftId: string) => {
  const draftSnapShot = await getDocs(
    collection(db, "articles", uid, "drafts")
  );
  let singleDraft: any = [];
  if (draftSnapShot) {
    draftSnapShot.forEach((doc) => {
      if (doc.id === draftId) {
        singleDraft.push({ id: doc.id, data: doc.data() });
      }
    });
  }
  return singleDraft;
};
