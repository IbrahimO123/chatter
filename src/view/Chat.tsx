import { Box } from "@mui/material";
import ChatTabs from "../components/comet_chat/components/CustomPanel";

const Chat = () => {
  return (
    <Box sx={{minHeight:"90vh", maxWidth:"95vw", justifySelf:"center" }} py={1} >
      <ChatTabs/>
    </Box>
  );
};


export default Chat