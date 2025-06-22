import "@cometchat/chat-uikit-react/css-variables.css";

import Conversations from "./conversations/Conversations";
import { Box } from "@mui/material";
//import BasicTabs from "./components/CustomPanel";

function CometChatApp() {
  return (
    <Box className="conversations-with-messages" sx={{justifySelf:"start"}}>
      <Conversations />
    </Box>
  );
}

export default CometChatApp;
