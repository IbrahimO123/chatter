import "@cometchat/chat-uikit-react/css-variables.css";

import Conversations from "./conversations/Conversations";
//import BasicTabs from "./components/CustomPanel";

function CometChatApp() {
  return (
    <div className="conversations-with-messages">
      <Conversations />
    </div>
  );
}

export default CometChatApp;
