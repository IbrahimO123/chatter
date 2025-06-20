import { Box } from "@mui/material";
import CometChatApp from "../components/comet_chat";

const Chat = () => {
  return (
    <Box sx={{minHeight:"90vh", maxWidth:"95vw", justifySelf:"center" }} mt={1} py={1} >
      <CometChatApp />
    </Box>
  );
};


export default Chat