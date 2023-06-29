import React, { useState } from "react";
import { auth, db } from "../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button, TextField } from "@mui/material";
export const SendMessage = () => {
  const [message, setMessage] = useState("");
  const sendMessage = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (message.trim() === "") {
      alert("Please enter a message");
      return;
    }
    const { uid, displayName, photoURL }: any = auth?.currentUser;

    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
    return;
  };
  return (
    <form>
      <label htmlFor="message">Enter Message</label>
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        id="message"
      ></TextField>
      <Button onClick={sendMessage} type="submit">
        Send
      </Button>
    </form>
  );
};
