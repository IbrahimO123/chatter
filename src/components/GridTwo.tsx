import { useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  TextField,
  Avatar,
  Button,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";

import { useGeneral } from "../custom/hooks/useGeneral";
import { getLoggedInUser } from "../Utilities/GetUserData";
import { usePost } from "../custom/hooks/usePost";
import { updateOtherState } from "../redux/Others/slice";
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
    others,
  } = useGeneral();
  const { content, handleChangeContent, setSelectedImage, setSelectedVideo } =
    usePost();
  const userPhoto = async () => {
    try {
      await getLoggedInUser({ user, dispatch, aUser });
    } catch (err: any) {
      console.error("Error while fetching photo: ", err.message);
    }
  };

  const addVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let videoObj = e.target!.files![0];
    const { size, type } = videoObj;
    if (e.target.files?.length === 0) {
      setSelectedVideo(undefined);
      return false;
    }
    const mb = size / 1000000;
    if (mb > 10) {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Size exceeds the maximum allowed",
          severity: "error",
        })
      );
      e.target.value = "";
      setSelectedVideo(undefined);
      return false;
    }
    const ext = type.split("/")[0];

    if (ext !== "video") {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Please upload a video only",
          severity: "error",
        })
      );
      e.target.value = "";
      setSelectedVideo(undefined);
      return false;
    }
    setSelectedVideo(e.target!.files![0]);
  };
  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0) {
      setSelectedImage(undefined);
      return false;
    }
    let imageObj = e.target!.files![0];
    const { size, type } = imageObj;
    const mb = size / 1000000;
    if (mb > 2) {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Size exceeds the maximum allowed",
          severity: "error",
        })
      );
      e.target.value = "";
      setSelectedImage(undefined);
      return false;
    }
    const ext = type.split("/")[0];

    if (ext !== "image") {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Please upload image only",
          severity: "error",
        })
      );
      e.target.value = "";
      setSelectedImage(undefined);
      return false;
    }
    setSelectedImage(e.target!.files![0]);
  };

  useEffect(() => {
    userPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      {user?.uid ? (
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
                  title={
                    firstname && lastname ? `${lastname} ${firstname}` : ""
                  }
                  alt={
                    firstname && lastname
                      ? `${lastname} ${firstname} picture`
                      : ""
                  }
                  src={profileImageUrl || ""}
                />
              </IconButton>
            </Grid>
            <Grid item md={11}>
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
            <Button
              endIcon={<PostAddIcon />}
              disableElevation
              variant="contained"
              size="small"
              disabled={content.length <= 3}
            >
              Post
            </Button>
            <label onClick={() => navigate("/write")}>Write Article</label>

            <label htmlFor="image">
              Photo
              <TextField
                id="image"
                type="file"
                sx={{ display: "none" }}
                onChange={addImage}
                inputProps={{ accept: "image/*" }}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </label>

            <label>
              Video
              <TextField
                sx={{ display: "none" }}
                onChange={addVideo}
                type="file"
                inputProps={{ accept: "video/*" }}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </label>
            <label>Event</label>
          </Box>
        </Paper>
      ) : null}
    </Box>
  );
};
