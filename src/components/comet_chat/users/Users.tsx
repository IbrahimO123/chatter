import { CometChatUsers } from "@cometchat/chat-uikit-react";
import "./style.css";
import { useChat } from "../../../custom/hooks/useChat";
import { useGeneral } from "../../../custom/hooks/useGeneral";
import { getACometUser, openChatModal } from "../../../redux/cometchat/slice";
import { Box } from "@mui/material";


function Users() {
  const { aCometUser, cometModal } = useChat();
  const { dispatch } = useGeneral();
  const handleItemClick = (users: CometChat.User) => {
    dispatch(openChatModal({ ...cometModal, open: true }));
    dispatch(getACometUser({ ...aCometUser, ...users }));
  };

  return (
    <Box>
      <CometChatUsers  onItemClick={handleItemClick} showSectionHeader={false} />
    </Box>
  );
}

export default Users;
