import { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import {
  CometChatMessageList,
  CometChatMessageComposer,
} from "@cometchat/chat-uikit-react";
import { Box } from "@mui/material";
import { useChat } from "../../../custom/hooks/useChat";

export function MessageList() {
  const [chatUser, setChatUser] = useState<CometChat.User>();
  const { aCometUser } = useChat();
  useEffect(() => {
    CometChat.getUser(aCometUser.uid).then((user) => {
      setChatUser(user);
    });
  }, [aCometUser.uid]);

  const getOnThreadRepliesClick = () => {
    //your custom actions
  };

  return chatUser ? (
    <Box>
      <Box
        sx={{
          minHeight: "40vh",
        }}
      >
        <CometChatMessageList
          user={chatUser}
          onThreadRepliesClick={getOnThreadRepliesClick}
          emptyView={
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "lighter",
              }}
              m={5}
              p={3}
            >
              No converstion between you and the user..Say "Hello" to start a
              chat
            </Box>
          }
        ></CometChatMessageList>
        <CometChatMessageComposer user={chatUser} />
      </Box>
    </Box>
  ) : null;
}
