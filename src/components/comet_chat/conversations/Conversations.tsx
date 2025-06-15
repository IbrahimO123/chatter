import { CometChatConversations } from "@cometchat/chat-uikit-react";
import Users from "../users/Users";
import { useChat } from "../../../custom/hooks/useChat";
import { useGeneral } from "../../../custom/hooks/useGeneral";
import { openChatModal } from "../../../redux/cometchat/slice";
import { MessageModal } from "../messages/Messages";
import { Box } from "@mui/material";


function Conversations() {
  const { cometModal } = useChat();
  const { dispatch, user } = useGeneral();

  const getOnItemClick = (conversation: CometChat.Conversation) => {
    dispatch(openChatModal({ ...cometModal, open: true }));
  };

  return (
    <div className="conversations" style={{ width: "100%", height: "100%" }}>
      <div>
      {
        user?.uid ?   <CometChatConversations
        onItemClick={getOnItemClick}
        emptyView={<Users />}
        errorView={
          <Box
            sx={{
              m: 2,
              p: 2,
              display: "grid",
              alignContent: "center",
              justifyItems:"center",
              fontWeight: "lighter",
              fontSize: "13px",
            }}
          >
            Login to chat your friends...have fun and enjoy!
          </Box>
        }
      /> : <Box
      sx={{
        m: 2,
        p: 2,
        display: "grid",
        alignContent: "center",
        justifyItems:"center",
        fontWeight: "lighter",
        fontSize: "13px",
      }}
    >
      Login to chat your friends...have fun and enjoy!
    </Box>
      }
        <MessageModal />
      </div>
    </div>
  );
}

export default Conversations;
