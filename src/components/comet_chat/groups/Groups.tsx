import { CometChatGroups } from "@cometchat/chat-uikit-react";
import { Box } from "@mui/material";
import React from "react";

const Groups = () => {
  return (
    <Box sx={{ width: { md: "100%", xs: "95vw" }, height: "100%" }}>
      <CometChatGroups />;
    </Box>
  );
};

export default Groups;
