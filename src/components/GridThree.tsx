import { useDispatch } from "react-redux";
import { getAllPhotos } from "../redux/chatbox/slice";

import { useEffect } from "react";
import { projectID } from "./../config/chat-engine/index";

import {
  useMultiChatLogic,
  ChatList,
  ChatForm,
} from "react-chat-engine-advanced";

const projectId = projectID!;
const username = "Owolabi";
const secret = "team";

export const GridThree = () => {
  const chatProps = useMultiChatLogic(projectId, username, secret);
  const dispatch = useDispatch();

  const fecthPhotos = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/photos");
      const data = await res.json();
      dispatch(getAllPhotos(data.slice(0, 10)));
    } catch (err: any) {
      console.error("Error while fetching photo: ", err.message);
    }
  };
  useEffect(() => {
    fecthPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <ChatList
        title="Chats"
        {...chatProps}
        
        style={{ maxWidth: "400px", borderRadius: "5px", maxHeight: "900px" }}
      >
        <ChatForm title="Chats" />
      </ChatList>
    </>
  );
};
