import { useState } from "react";
import {
  MenuList,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Button,
  Modal,
} from "@mui/material";
import Typewriter from "typewriter-effect";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { style } from "../Utilities/support";

export const Draft = () => {
  const { heading } = useSelector((state: RootState) => state.saveArticles);
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <Box  >
      <Typography component="h1" variant="h6" p={1}>
        <IconButton>
          <EditNoteIcon />
        </IconButton>
        Articles
      </Typography>
      <MenuList>
        {heading.map((title: string, index: number) => (
          <MenuItem sx={{ padding: "10px", fontSize:"12px" }} key={index}>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(`${index + 1}. ${title.substring(0, 20)}....`)
                  .deleteChars(1)
                  .start();
              }}
            />
            <IconButton onClick={handleModalOpen}>
              <DeleteForeverIcon />
            </IconButton>
          </MenuItem>
        ))}
      </MenuList>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="delete article"
        aria-describedby="delete drafted article"
      >
        <Box sx={{ ...style, width: 300 }}>
          <Typography>Are you sure you want to delete the draft?</Typography>
          <Box p={1} display="flex" justifyContent="space-around">
            <Button color="error">Yes</Button>
            <Button onClick={handleModalClose} sx={{ color: "#9e9e9e" }}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
