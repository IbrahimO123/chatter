import { CometChatUsers } from "@cometchat/chat-uikit-react";
import "./style.css";

import { MessageModal } from "../messages/Messages";
import { useState } from "react";
import { useChat } from "../../../custom/hooks/useChat";
import { useGeneral } from "../../../custom/hooks/useGeneral";
import { getACometUser } from "../../../redux/cometchat/slice";

function Users() {
  const [openModal, setOpenModal] = useState(false);
  const { aCometUser } = useChat();
  const { dispatch } = useGeneral();
  const handleItemClick = (users: CometChat.User) => {
    setOpenModal(true);
    dispatch(getACometUser({ ...aCometUser, ...users }));
    console.log(aCometUser.uid);
  };

  const handleCloseModal = () => setOpenModal(false);
  //   function handleOnSelect(users: CometChat.User, selected: boolean): void {
  //     if (selected) {
  //       console.log(users);
  //       console.log("I was clicked...");
  //     }
  //   }

  return (
    <>
      <CometChatUsers
        onItemClick={handleItemClick}
        showSectionHeader={false}
        //onSelect={handleOnSelect}
        // selectionMode={SelectionMode.single}
      />
      <MessageModal handleCloseModal={handleCloseModal} openModal={openModal} />
    </>
  );
}

export default Users;
