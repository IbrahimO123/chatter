import { CometChatConversations } from "@cometchat/chat-uikit-react";
import Users from "./users/Users";

function Conversations() {
  return (
    <div className="conversations" style={{ width: "100%", height: "100%" }}>
      <div>
        <CometChatConversations emptyView={<Users/>} />
      </div>
    </div>
  );
}

export default Conversations;
