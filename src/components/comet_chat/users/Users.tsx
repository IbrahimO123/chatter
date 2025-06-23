import { CometChatUsers, SelectionMode } from "@cometchat/chat-uikit-react";
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

  const handleOnSelect = (users: CometChat.User, selected: boolean) => {
    console.log(users);
  };

  return (
    <Box sx={{ width: { md: "100%", xs: "95vw" }, height: "100%" }}>
      <CometChatUsers
        onItemClick={handleItemClick}
        onSelect={handleOnSelect}
        showSectionHeader={false}
        selectionMode={SelectionMode.multiple}
      />
    </Box>
  );
}

export default Users;
