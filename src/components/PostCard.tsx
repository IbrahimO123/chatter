import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  CardHeader,
  Divider,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MenuComponent } from "./MenuComponent";
import { PostMenu } from "../Utilities/Miscellaneous";
import { getTimeDifferenceString } from "../Utilities/Miscellaneous";
import { likeList, usePost } from "../custom/hooks/usePost";
import { useGeneral } from "../custom/hooks/useGeneral";

type postCard = {
  id: string;
  likesCount?: number;
  sharesCount?: number;
  commentsCount?: number;
  viewsCount?: number;
  content: string;
  author: string;
  userId: string;
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
  userId,
  id,
}: postCard) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = useGeneral();
  const {
    handleUserLikePost,
    handleUnLikedPost,
    handleGetUserLikedPost,
    handleFetchLikedPosts,
    setLikedPostList,
    likedPostList,
    likePost,
  } = usePost();
  const handleLikePost = async () => {
    await handleUserLikePost(id, content);
  };
  const getLikedPost = async () => {
    const res = await handleGetUserLikedPost(id);
    setLikedPostList(res as likeList);
  };

  const unLikePost = async () => {
    const res = likedPostList.filter((item) => item.whoId === user?.uid);
    if (res[0].hasOwnProperty("id")) {
      await handleUnLikedPost(id, res[0].id);
      return;
    } else {
      console.log("Error with  like id");
    }
  };

  useEffect(() => {
    getLikedPost();
    handleFetchLikedPosts(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likePost]);
  return (
    <Box>
      <Card
        sx={{
          padding: "2px 2px",
          margin: "10px 10px",
        }}
        elevation={0}
      >
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
                src={profileImageUrl}
                title={author}
                alt={`${author} picture`}
              ></Avatar>
            }
            title={<h3 style={{ wordWrap: "break-word" }}>{author}</h3>}
            subheader={
              <small style={{ lineHeight: 0 }}>
                <Typography component="span" variant="caption">
                  {getTimeDifferenceString(dateCreated) || "1 second ago"}
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
              uid={userId}
            />
          </Box>
        </Box>
        <Grid container textAlign="center">
          <Grid item md={12} xs={12}>
            <Box component="div" p={2} pb={0} textAlign="left">
              <Typography sx={{ fontWeight: "bold" }}>{content}</Typography>
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
            <Divider variant="middle" />
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignContent: "center",
              }}
              pb={2}
              pt={1}
            >
              <IconButton
                title="Like"
                sx={{ color: "black" }}
                onClick={likePost ? unLikePost : handleLikePost}
              >
                {likePost ? (
                  <ThumbUpIcon sx={{ color: "#4caf50", marginTop: "-5px" }} />
                ) : (
                  <ThumbUpOutlinedIcon sx={{ marginTop: "-5px" }} />
                )}
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
    </Box>
  );
};
