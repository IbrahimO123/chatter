import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Paper,
  Typography,
} from "@mui/material";

import type { RootState } from "../redux/store";

import { Photo } from "../redux/chatbox/model";
import { useSelector, useDispatch } from "react-redux";
import { getAllPhotos } from "../redux/chatbox/slice";

import womanImage from "../assets/images/woman.avif";
import womanImage2 from "../assets/images/woman2.avif";
import { useEffect } from "react";

export const GridThree = () => {
  const photos = useSelector((state: RootState) => state.chats);
  const dispatch = useDispatch();
  const { allPhotos } = photos;
  const fecthPhotos = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/photos");
      const data = await res.json();
      dispatch(getAllPhotos(data.slice(0, 10)));
    } catch (err: any) {
      console.error("Error while fetching photo: ", err.message);
    }
  };
  useEffect(() => {
    fecthPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      <Paper elevation={0} sx={{ padding: "2px 1px" }}>
        <Paper variant="outlined" sx={{ padding: "2px 1px" }}>
          <Typography component="p" variant="h6">
            Chat
          </Typography>
        </Paper>
        {allPhotos.length > 0 ? (
          allPhotos.map((photo: Photo) => (
            <Card variant="outlined" sx={{ margin: "2px" }} key={photo.id}>
              <CardHeader
                subheader="10:12:2022"
                avatar={
                  <Avatar
                    alt={photo.title}
                    src={photo.id % 2 ? womanImage2 : womanImage}
                  />
                }
              />
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No chat yet
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
