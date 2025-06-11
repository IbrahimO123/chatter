import React from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import {
  CometChatMessageList,
  CometChatMessageComposer,
} from "@cometchat/chat-uikit-react";
import { Box, Modal, Paper } from "@mui/material";

export function MessageList() {
  const [chatUser, setChatUser] = React.useState<CometChat.User>();
  React.useEffect(() => {
    CometChat.getUser("mbozjtgl00s6xmrw15lh").then((user) => {
      setChatUser(user);
    });
  }, []);

  const getOnThreadRepliesClick = () => {
    //your custom actions
  };

  return chatUser ? (
    <div>
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
            No converstion between you and the user..Say "Hello" to start a chat
          </Box>
        }
      />
      <CometChatMessageComposer />
    </div>
  ) : null;
}

type ModalMessage = {
  handleCloseModal: () => void;
  openModal: boolean;
};
export const MessageModal = ({ handleCloseModal, openModal }: ModalMessage) => {
  return (
    <Modal
      onClose={handleCloseModal}
      open={openModal}
      sx={{ display: "grid", placeItems: "center" }}
    >
      <Paper sx={{ width: "30%" }} elevation={0}>
        <MessageList />
      </Paper>
    </Modal>
  );
};
