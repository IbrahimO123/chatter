import { CometChatUsers } from "@cometchat/chat-uikit-react";

function Users() {
  const handleItemClick = () => {
    console.log("CLICKED....");
  };
  return (
    <CometChatUsers onItemClick={handleItemClick} showSectionHeader={false} />
  );
}

export default Users;
