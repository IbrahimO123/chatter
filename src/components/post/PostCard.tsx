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
  Modal,
  Paper,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGeneral } from "../../custom/hooks/useGeneral";
import { likeList, usePost } from "../../custom/hooks/usePost";
import { useComment } from "../../custom/hooks/useComment";
import {
  getTimeDifferenceString,
  PostMenu,
} from "../../Utilities/Miscellaneous";
import { ProfileCard } from "../profile/ProfileCard";
import { MenuComponent } from "./../MenuComponent";
import { PostComment } from "./PostComment";

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
  email: string;
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
  email,
}: postCard) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openCard, setOpenCard] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const handleOpenCommentDialog = () => setOpenCommentDialog(true);
  const handleCloseCommentDialog = () => setOpenCommentDialog(false);
  const handleCloseCard = () => setOpenCard(false);
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

  const { fetchComments, commentsList } = useComment();
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
    fetchComments(id);
    handleFetchLikedPosts(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likePost]);
  return (
    <Box>
      <Card
        sx={{
          padding: "1px 1px",
          margin: "10px 5px",
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
            onClick={() => setOpenCard(true)}
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
          <Modal
            open={openCard}
            onClose={handleCloseCard}
            sx={{ display: "grid", placeItems: "center" }}
          >
            <ProfileCard
              author={author}
              email={email}
              profileImg={profileImageUrl}
            ></ProfileCard>
          </Modal>
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
              <Typography>{content}</Typography>
            </Box>
            <Box p={2}>
              {video ? (
                <center>
                  <CardMedia
                    component="video"
                    sx={{
                      width: { xs: "300px", md: "500px" },
                      borderRadius: "5px",
                    }}
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
                    sx={{ height: 320, borderRadius: "5px" }}
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
                <span style={{ margin: "2px", fontSize: "10px" }}>
                  {likedPostList?.hasOwnProperty("length") &&
                  likedPostList?.length > 0
                    ? likedPostList.length
                    : null}
                </span>
              </IconButton>

              <IconButton
                onClick={handleOpenCommentDialog}
                title="Add Comment"
                sx={{ color: "black" }}
              >
                <AddCommentOutlinedIcon />
                <span style={{ margin: "2px", fontSize: "10px" }}>
                  {commentsList?.hasOwnProperty("length") &&
                  commentsList?.length > 0
                    ? commentsList.length
                    : null}
                </span>
              </IconButton>
              <Modal
                open={openCommentDialog}
                onClose={handleCloseCommentDialog}
                aria-labelledby="comment-dialog"
                aria-describedby="comment for post"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  m: 0,
                  p: 0,
                }}
              >
                <Paper
                  sx={{
                    minHeight: "90vh",
                    width: { md: "400px", xs: "100vw" },
                    m: 0,
                    p: 0,
                  }}
                  elevation={0}
                >
                  <PostComment
                    commentId={id}
                    post={content}
                    video={video}
                    picture={picture}
                    author={author}
                    profileImageUrl={profileImageUrl}
                    dateCreated={dateCreated}
                    handleCloseCard={handleCloseCommentDialog}
                  ></PostComment>
                </Paper>
              </Modal>
              <IconButton title="Repost" sx={{ color: "black" }}>
                <RepeatIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
