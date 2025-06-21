import { useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  TextField,
  Avatar,
  Badge,
  Typography,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LoadingButton from "@mui/lab/LoadingButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useGeneral } from "../custom/hooks/useGeneral";
import { getLoggedInUser } from "../Utilities/GetUserData";
import { usePost } from "../custom/hooks/usePost";
import { MobileView } from "../Utilities/Miscellaneous";
import { useState } from "react";
import ModalCalendar from "./Calendar";

const postStyle = {
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "row",
};

export const GridTwo = () => {
  const {
    user,
    navigate,
    dispatch,
    aUser,
    profileImageUrl,
    firstname,
    lastname,
  } = useGeneral();
  const {
    content,
    handleChangeContent,
    handleSelectedImage,
    handleSelectedVideo,
    handleAddPost,
    selectedImage,
    selectedVideo,
    postButton,
  } = usePost();

  const [openCalendar, setOpenCalendar] = useState(false);

  const handleOpenCalendar = () => setOpenCalendar(true);

  const handleCloseCalendar = () => setOpenCalendar(false);

  const userPhoto = async () => {
    try {
      await getLoggedInUser({ user, dispatch, aUser });
    } catch (err: any) {
      console.error("Error while fetching photo: ", err.message);
    }
  };

  useEffect(() => {
    userPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      <Paper
        sx={{
          padding: "5px 5px",
          margin: "10px",
        }}
        elevation={0}
      >
        <Grid container spacing={2}>
          <Grid item md={1}>
            <IconButton size="small">
              <Avatar
                title={firstname && lastname ? `${lastname} ${firstname}` : ""}
                alt={
                  firstname && lastname
                    ? `${lastname} ${firstname} picture`
                    : ""
                }
                src={profileImageUrl || ""}
              />
            </IconButton>
          </Grid>
          <Grid item md={11} xs={9.5}>
            <TextField
              fullWidth
              name="content"
              value={content}
              onChange={handleChangeContent}
              size="small"
              placeholder="Talk with the community..."
            ></TextField>
          </Grid>
        </Grid>
        <Box sx={postStyle}>
          <LoadingButton
            endIcon={<PostAddIcon />}
            loading={postButton}
            disableElevation
            variant="contained"
            size="small"
            onClick={handleAddPost}
            disabled={content.length <= 3}
          >
            Post
          </LoadingButton>
          <label onClick={() => navigate("/write")}>
            {MobileView() ? (
              <EditNoteIcon />
            ) : (
              <Typography variant="subtitle2">Write up</Typography>
            )}
          </label>

          <label htmlFor="image">
            <Badge
              badgeContent={
                selectedImage?.name &&
                selectedImage.type.split("/")[0] === "image" ? (
                  <small>1</small>
                ) : (
                  0
                )
              }
              color="primary"
            >
              {MobileView() ? (
                <AddPhotoAlternateIcon />
              ) : (
                <Typography variant="subtitle2">Photo</Typography>
              )}
            </Badge>
            <TextField
              id="image"
              type="file"
              sx={{ display: "none" }}
              onChange={handleSelectedImage}
              inputProps={{ accept: "image/*" }}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </label>

          <label>
            <Badge
              badgeContent={
                selectedVideo?.name &&
                selectedVideo.type.split("/")[0] === "video" ? (
                  <small>1</small>
                ) : (
                  0
                )
              }
              color="primary"
            >
              {MobileView() ? (
                <VideoCallIcon />
              ) : (
                <Typography variant="subtitle2">Video</Typography>
              )}
            </Badge>
            <TextField
              sx={{ display: "none" }}
              onChange={handleSelectedVideo}
              type="file"
              inputProps={{ accept: "video/*" }}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </label>
          <label>
            {MobileView() ? (
              <>
                <EventNoteIcon onClick={handleOpenCalendar} />
                <ModalCalendar
                  openCalendar={openCalendar}
                  handleCloseCalendar={handleCloseCalendar}
                />
              </>
            ) : (
              <>
                <Typography onClick={handleOpenCalendar} variant="subtitle2">
                  Events
                </Typography>
                <ModalCalendar
                  openCalendar={openCalendar}
                  handleCloseCalendar={handleCloseCalendar}
                />
              </>
            )}
          </label>
        </Box>
      </Paper>
    </Box>
  );
};
