import { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import {
  CometChatMessageList,
  CometChatMessageComposer,
} from "@cometchat/chat-uikit-react";
import { Box, Modal, Paper } from "@mui/material";
import { useChat } from "../../../custom/hooks/useChat";
import { useGeneral } from "../../../custom/hooks/useGeneral";
import { openChatModal } from "../../../redux/cometchat/slice";

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
    <div>
      <>
        <CometChatMessageList
          user={chatUser}
          onThreadRepliesClick={getOnThreadRepliesClick}
          emptyView={
            <Box
              sx={{
                display: "grid",
                placeContent: "center",
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
      </>
    </div>
  ) : null;
}

export const MessageModal = () => {
  const { cometModal, open } = useChat();
  const { dispatch } = useGeneral();
  const handleCloseModal = () => {
    dispatch(openChatModal({ ...cometModal, open: false }));
  };
  return (
    <Modal
      onClose={handleCloseModal}
      open={open}
      sx={{ display: "grid", placeItems: "center" }}
    >
      <Paper sx={{ width: "30%", height: "50%" }} elevation={0}>
        <MessageList />
      </Paper>
    </Modal>
  );
};
