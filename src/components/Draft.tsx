import { useEffect, useState } from "react";
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
import { RetrieveAArticleOnce } from "../Utilities/RetrieveArticle";
import { useDispatch } from "react-redux";
import { updateArticle } from "../redux/articles/slice";
import { updateOtherState } from "../redux/Others/slice";

export const Draft = () => {
  const dispatch = useDispatch();
  const { heading } = useSelector((state: RootState) => state.saveArticles);
  const { anArticle } = useSelector((state: RootState) => state.articles);
  const others = useSelector((state: RootState) => state.others);
  const { title, } = anArticle;
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAnswer, setModalAnswer] = useState(false);
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (modalAnswer) {
      handleDelete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalAnswer]);

  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleDeleteMsg = async (index: number) => {
    setModalMessage("Are you sure you want to delete this draft?");
    handleModalOpen();
  };
  const handleDelete = async () => {
    console.log("delete draft");
    handleModalClose();
    setModalAnswer(false);
  };

  const handleReloadDraft = async (index: number) => {
    const querySnapshot = await RetrieveAArticleOnce(heading[index]);
    const result = heading.find((item: string) => item === title);
    querySnapshot.forEach((doc) => {
      console.log("what data are you", doc.data());
      if (result !== undefined)
        dispatch(
          updateArticle({
            ...anArticle,
            ...doc.data(),
          })
        );
      return dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Article loaded successfully",
          severity: "success",
          loading: false,
        })
      );
    });
  };
  return (
    <Box>
      <Typography component="h1" variant="h6" p={1}>
        <IconButton>
          <EditNoteIcon />
        </IconButton>
        Articles
      </Typography>
      <MenuList>
        {heading.map((title: string, index: number) => (
          <MenuItem
            onDoubleClick={() => handleReloadDraft(index)}
            sx={{ padding: "10px", fontSize: "12px" }}
            key={index}
          >
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(`${index + 1}. ${title.substring(0, 20)}....`)
                  .deleteChars(1)
                  .start();
              }}
            />
            <IconButton onClick={() => handleDeleteMsg(index)}>
              <DeleteForeverIcon />
            </IconButton>
          </MenuItem>
        ))}
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="delete article"
          aria-describedby="delete drafted article"
          color="error"
        >
          <Box sx={{ ...style, width: { md: 300, xs: 200 } }}>
            <Typography>{modalMessage}</Typography>
            <Box p={1} display="flex" justifyContent="space-around">
              <Button onClick={() => setModalAnswer(true)} color="error">
                Yes
              </Button>
              <Button onClick={handleModalClose} sx={{ color: "#9e9e9e" }}>
                No
              </Button>
            </Box>
          </Box>
        </Modal>
      </MenuList>
    </Box>
  );
};
