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
  } = usePost();
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
              onClick={handleAddPost}
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
                onChange={handleSelectedImage}
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
                onChange={handleSelectedVideo}
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
