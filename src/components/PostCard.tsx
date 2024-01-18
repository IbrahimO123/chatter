import { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Typography,
  CardHeader,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MenuComponent } from "./MenuComponent";
import { PostMenu } from "../Utilities/Miscellaneous";
import { getTimeDifferenceString } from "../Utilities/Miscellaneous";

type postCard = {
  likesCount?: number;
  sharesCount?: number;
  commentsCount?: number;
  viewsCount?: number;
  content: string;
  author: string;
  userId: number;
  picture?: string;
  video?: string;
  event?: string;
  timeCreated: string;
  dateCreated: string;
  profileImageUrl: string;
};

export const PostCard = ({
  content,
  video,
  picture,
  profileImageUrl,
  author,
  dateCreated,
}: postCard) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Paper
        sx={{
          padding: "2px 2px",
          margin: "10px 10px",
        }}
        elevation={0}
      >
        <Card>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sizes="small"
                  src={profileImageUrl}
                  sx={{ padding: "2px", margin: "10px 10px 0px 10px" }}
                ></Avatar>
              }
              title={<h3 style={{ wordWrap: "break-word" }}>{author}</h3>}
              subheader={
                <small style={{ lineHeight: 0 }}>
                  <Typography component="span" variant="caption">
                    {getTimeDifferenceString(dateCreated) ||
                      "1 second ago"}
                  </Typography>
                </small>
              }
            ></CardHeader>
            <Box>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <MenuComponent
                open={open}
                handleClose={handleClose}
                data={PostMenu}
                anchorEl={anchorEl}
              />
            </Box>
          </Box>
          <Grid container textAlign="center">
            <Grid item md={12} xs={12}>
              <Box component="div" p={2} pb={0} textAlign="left">
                <Typography>{content}</Typography>
              </Box>
              <Box p={2}>
                {video ? (
                  <center>
                    <CardMedia
                      component="video"
                      sx={{ width: { xs: "300px", md: "500px" } }}
                      controls
                    >
                      <source src={video} type="video/mp4" />
                      <source src={video} type="video/webm" />
                      <p>Your browser doesn't support HTML5 video.</p>
                    </CardMedia>
                  </center>
                ) : null}
              </Box>
              <Box p={2}>
                {picture ? (
                  <center>
                    <CardMedia
                      component="img"
                      sx={{ height: 350 }}
                      image={picture}
                    ></CardMedia>
                  </center>
                ) : null}
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignContent: "center",
                }}
                pb={2}
              >
                <IconButton title="Like">
                  <ThumbUpOutlinedIcon />
                </IconButton>
                <IconButton title="Add Comment">
                  <AddCommentOutlinedIcon />
                </IconButton>
                <IconButton title="Share">
                  <ShareOutlinedIcon />
                </IconButton>
                <IconButton title="Repost">
                  <RepeatIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Paper>
    </Box>
  );
};
