import { Box, Modal, Paper } from "@mui/material";
import { useChat } from "../../../custom/hooks/useChat";
import { useGeneral } from "../../../custom/hooks/useGeneral";
import { openChatModal } from "../../../redux/cometchat/slice";
import CancelIcon from "@mui/icons-material/Cancel";
import { MessageList } from "../messages/Messages";

const MessageModal = () => {
  const { cometModal, open } = useChat();
  const { dispatch } = useGeneral();
  const handleCloseModal = () => {
    dispatch(openChatModal({ ...cometModal, open: false }));
  };
  return (
    <Modal
      onClose={handleCloseModal}
      open={open}
      sx={{ display: "grid", placeItems: "center" }}
    >
      <Paper
        sx={{
          width: { md: "32%", xs: "96vw" },
          height: "50%",
        }}
        elevation={0}
      >
        <Box
          component="span"
          sx={{ float: "right", color: "red" }}
          m={1}
          onClick={handleCloseModal}
        >
          <CancelIcon color="error" />
        </Box>
        <MessageList />
      </Paper>
    </Modal>
  );
};

export default MessageModal;
