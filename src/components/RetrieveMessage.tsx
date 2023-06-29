import { useEffect, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase";




export const RetrieveMessage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapShot) => {
      QuerySnapShot.forEach((doc) => {
        //setMessages(prev => [...prev, prev.push({id: doc.id })]);
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);
};
