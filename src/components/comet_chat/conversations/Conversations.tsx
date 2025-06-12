import { CometChatConversations } from "@cometchat/chat-uikit-react";
import Users from "../users/Users";
import { useChat } from "../../../custom/hooks/useChat";
import { useGeneral } from "../../../custom/hooks/useGeneral";
import { openChatModal } from "../../../redux/cometchat/slice";
import { MessageModal } from "../messages/Messages";

function Conversations() {
  const { cometModal } = useChat();
  const { dispatch } = useGeneral();

  const getOnItemClick = (conversation: CometChat.Conversation) => {
    dispatch(openChatModal({ ...cometModal, open: true }));
  };

  return (
    <div className="conversations" style={{ width: "100%", height: "100%" }}>
      <div>
        <CometChatConversations
          onItemClick={getOnItemClick}
          emptyView={<Users />}
        />
        <MessageModal />
      </div>
    </div>
  );
}

export default Conversations;
