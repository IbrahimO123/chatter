import { useEffect, useState } from "react";
import axios from "axios";
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
import womanImage from "../assets/images/woman.avif";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const postStyle = {
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "row",
};

export const GridTwo = () => {
  const [user] = useAuthState(auth);
  const [photo, setPhoto] = useState<Photo>({} as Photo);
  const userPhoto = async () => {
    try {
      const api = "https://jsonplaceholder.typicode.com/photos/1";
      const res = await axios.get(api);
      const data = await res.data;
      setPhoto(data);
    } catch (e: any) {
      console.error(e.message);
    }
  };
  useEffect(() => {
    userPhoto();
  }, [photo]);
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
                  title={photo.hasOwnProperty("title") ? `${photo.title}` : ""}
                  alt="user photo"
                  src={photo.hasOwnProperty("url") ? `${womanImage}` : ""}
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
