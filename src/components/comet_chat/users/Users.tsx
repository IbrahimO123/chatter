import { CometChatUsers } from "@cometchat/chat-uikit-react";

import { MessageModal } from "../messages/Messages";
import { useState } from "react";

function Users() {
  const [openModal, setOpenModal] = useState(false);
  const handleItemClick = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <CometChatUsers onItemClick={handleItemClick} showSectionHeader={false} />
      <MessageModal handleCloseModal={handleCloseModal} openModal={openModal} />
    </>
  );
}

export default Users;
