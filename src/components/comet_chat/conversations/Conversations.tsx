import { CometChatConversations } from "@cometchat/chat-uikit-react";
import Users from "../users/Users";
import { useChat } from "../../../custom/hooks/useChat";
import { useGeneral } from "../../../custom/hooks/useGeneral";
import { openChatModal } from "../../../redux/cometchat/slice";
import { Box, Paper, Typography } from "@mui/material";
import MessageModal from "./../components/MessageModal";

function Conversations() {
  const { cometModal } = useChat();
  const { dispatch, user } = useGeneral();

  const getOnItemClick = (conversation: CometChat.Conversation) => {
    dispatch(openChatModal({ ...cometModal, open: true }));
    console.log("Conversation", conversation);
  };

  return (
    <Box
      className="conversations"
      sx={{ width: { md: "100%", xs: "95vw" }, height: "100%" }}
    >
      <Box>
        {user?.uid ? (
          <CometChatConversations
            onItemClick={getOnItemClick}
            emptyView={<Users />}
            errorView={
              <Box
                sx={{
                  m: 2,
                  p: 2,
                  display: "grid",
                  alignContent: "center",
                  justifyItems: "center",
                  fontWeight: "lighter",
                  fontSize: "13px",
                }}
              >
                Login to chat your friends...have fun and enjoy!
              </Box>
            }
          />
        ) : (
          <Paper elevation={1}>
            <Box
              sx={{
                m: 2,
                p: 2,
                display: "grid",
                alignContent: "center",
                justifyItems: "center",
                fontWeight: "lighter",
                fontSize: "13px",
              }}
            >
              <Typography variant="button">Login in...</Typography>
              <Typography variant="h6">
                Login to chat your friends...have fun and enjoy!
              </Typography>
            </Box>
          </Paper>
        )}
        <MessageModal />
      </Box>
    </Box>
  );
}

export default Conversations;
