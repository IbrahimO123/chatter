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
const postStyle = {
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "row",
};

export const GridTwo = () => {
  const { user, dispatch, aUser, profileImageUrl, firstname, lastname } =
    useGeneral();
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
            display: { xs: "none", md: "grid" },
            padding: "5px 5px",
            margin: "10px",
          }}
          elevation={8}
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
                size="small"
                placeholder="Ask community for advice."
              ></TextField>
            </Grid>
          </Grid>
          <Box sx={postStyle}>
            <Button endIcon={<PostAddIcon />} variant="contained">
              Post
            </Button>
            <IconButton disableRipple={true} size="small">
              Write article
            </IconButton>
            <IconButton disableRipple={true} size="small">
              Photo
            </IconButton>
            <IconButton disableRipple={true} size="small">
              Video
            </IconButton>
            <IconButton disableRipple={true} size="small">
              Event
            </IconButton>
          </Box>
        </Paper>
      ) : null}
    </Box>
  );
};
