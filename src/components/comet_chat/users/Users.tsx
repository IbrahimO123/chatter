import { CometChatUsers } from "@cometchat/chat-uikit-react";
import "./style.css";

import { MessageModal } from "../messages/Messages";
import { useChat } from "../../../custom/hooks/useChat";
import { useGeneral } from "../../../custom/hooks/useGeneral";
import { getACometUser, openChatModal } from "../../../redux/cometchat/slice";

function Users() {
  const { aCometUser, cometModal } = useChat();
  const { dispatch } = useGeneral();
  const handleItemClick = (users: CometChat.User) => {
    dispatch(openChatModal({ ...cometModal, open: true }));
    dispatch(getACometUser({ ...aCometUser, ...users }));
    console.log(aCometUser.uid);
  };

  return (
    <>
      <CometChatUsers onItemClick={handleItemClick} showSectionHeader={false} />
      <MessageModal />
    </>
  );
}

export default Users;
