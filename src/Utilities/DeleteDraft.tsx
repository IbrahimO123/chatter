import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const DeleteDraft = async (uid: any, draftId: string) => {
  try {
    await deleteDoc(doc(db, "articles", uid, "drafts", draftId));
  } catch (err) {
    console.error("Error deleting draft");
  }
};
