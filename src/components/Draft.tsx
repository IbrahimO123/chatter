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
import {
  RetrieveDrafts,
  RetrieveSingleDraft,
} from "../Utilities/RetrieveDrafts";
import { useDispatch } from "react-redux";
import { updateArticle, updateSaveDrafts } from "../redux/articles/slice";
import { updateOtherState } from "../redux/Others/slice";
import { style } from "./../Utilities/support";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { DeleteDraft } from "../Utilities/DeleteDraft";
import { DeleteImage } from "../Utilities/DeleteImage";
type DraftProps = {
  applyStyle?: boolean;
};

export const Draft = ({ applyStyle = false }: DraftProps) => {
  const [selectedDraft, setselectedDraft] = useState(null);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const saveDrafts = useSelector((state: RootState) => state.saveDrafts);
  const { drafts } = saveDrafts;
  const { anArticle } = useSelector((state: RootState) => state.articles);
  const others = useSelector((state: RootState) => state.others);

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = async () => {
    setOpenModal(false);
  };
  const handleDeleteMsg = (draft: any) => {
    setModalMessage("Are you sure you want to delete this draft?");
    setselectedDraft(draft);
    handleModalOpen();
  };

  const fetchDraft = async () => {
    try {
      const draftsData = await RetrieveDrafts(user?.uid);
      if (draftsData) {
        dispatch(
          updateSaveDrafts({
            ...saveDrafts,
            drafts: [...draftsData],
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (draft: any) => {
    DeleteDraft(user?.uid, draft?.id);
    DeleteImage(draft?.data?.title);
    fetchDraft();
    handleModalClose();
    dispatch(
      updateOtherState({
        ...others,
        open: true,
        message: "Article deleted successfully",
        severity: "success",
        loading: false,
      })
    );
  };

  const handleReloadDraft = async (index: string) => {
    const draft = await RetrieveSingleDraft(user?.uid, index);
    draft.map((doc: any) => {
      if (doc.data) {
        dispatch(
          updateArticle({
            ...anArticle,
            ...doc.data,
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
      } else {
        return dispatch(
          updateOtherState({
            ...others,
            open: true,
            message: "Article not found",
            severity: "error",
            loading: false,
          })
        );
      }
    });
  };
  return (
    <Box sx={applyStyle ? { minWidth: "55vw" } : null}>
      <Typography component="h1" variant="h6" p={1}>
        <IconButton>
          <EditNoteIcon />
        </IconButton>
        Articles
      </Typography>
      <MenuList>
        {drafts &&
          drafts.map((draft: any, index: number) => (
            <MenuItem sx={{ padding: "10px", fontSize: "12px" }} key={draft.id}>
              <Typography
                component="div"
                fontSize={15}
                onClick={() => handleReloadDraft(draft.id)}
              >
                {draft.data.title !== undefined ? (
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(
                          ` ${draft?.data?.title?.substring(0, 20)}....`
                        )
                        .deleteChars(1)
                        .start();
                    }}
                  />
                ) : (
                  null
                )}
              </Typography>

              {draft?.data?.title && (
                <IconButton onClick={() => handleDeleteMsg(draft)}>
                  <DeleteForeverIcon />
                </IconButton>
              )}
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
              <Button
                onClick={() => handleDelete(selectedDraft!)}
                color="error"
              >
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
