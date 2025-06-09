import { db } from "../config/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";

export const getCometAuthToken = async (uid: string) => {
  try {
    const authTokenRef = collectionGroup(db, "authToken");
    const snapshot = await getDocs(authTokenRef);
    const mappedAuthTokens = snapshot.docs.map((doc) => ({
      id: doc.id,
      uid: doc.data().uid,
      ...doc.data(),
    }));
    if (mappedAuthTokens.length > 0) {
      const data = mappedAuthTokens.filter((token) => token.uid === uid);
      return { data, error: null };
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { data: [], error };
  }
};

export const getCometChatUsers = async () => {
  try {
    const authTokenRef = collectionGroup(db, "authToken");
    const snapshot = await getDocs(authTokenRef);
    const cometUsers = snapshot.docs.map((doc) => ({
      id: doc.id,
      uid: doc.data().uid,
      email: doc.data().email,
      ...doc.data(),
    }));
    return { data: cometUsers, error: null };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { data: [], error };
  }
};
