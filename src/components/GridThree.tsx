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
