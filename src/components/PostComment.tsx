import { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Stack,
  TextField,
  Button,
  Box,
  Typography,
  List,
  CardMedia,
  CardHeader,
  Avatar,
  IconButton,
} from "@mui/material";
import { useComment } from "../custom/hooks/useComment";
import { useGeneral } from "../custom/hooks/useGeneral";
import { CommentCard } from "./CommentCard";
import { addCommentToDatabase } from "../Utilities/AddComments";
import { getTimeDifferenceString } from "../Utilities/Miscellaneous";
import ScrollToTop from "./ScrollToTop";

export const style = {
  width: "100%",

  "& .MuiOutlinedInput-root": {
    marginRight: "10px",
    marginBottom: "5px",
    "&.Mui-focused fieldset": {
      border: " 0.5px solid black",
    },
  },
};

type CommentProps = {
  commentId: string;
  post: string;
  video?: string;
  picture?: string;
  author: string;
  profileImageUrl: string;
  dateCreated?: string;
  handleCloseCard: () => void;
};

export const PostComment = ({
  commentId,
  post,
  video,
  picture,
  author,
  profileImageUrl,
  dateCreated,
  handleCloseCard,
}: CommentProps) => {
  const { user, dispatch, updateOtherState, others } = useGeneral();
  const {
    aComment,
    addComment,
    text,
    updateComment,
    commentsList,
    fetchComments,
  } = useComment();
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchComments(commentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  const handleUserComment = () => {
    if (user?.uid) {
      addCommentToDatabase(aComment, commentId);
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Comment added successfully",
          severity: "success",
        })
      );
      dispatch(
        updateComment({
          ...aComment,
          id: "",
          comment: {
            authorName: "",
            userId: "",
            text: "",
            dateCreated: "",
            timeCreated: "",
            profileImageUrl: "",
            replies: [],
            commentLikes: [],
          },
        })
      );
      return;
    } else {
      setError(true);
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Login first",
          severity: "error",
        })
      );
      return;
    }
  };

  return (
    <ScrollToTop>
      <Box
        sx={{
          maxHeight: "calc(100vh - 50px)",
          overflowY: "auto",
          width: { xs: "370px", md: "400px" },
          m: 0,
          p: 0,
        }}
      >
        <Box component="div" p={1}>
          <Box sx={{ float: "right", color:"red" }}>
            <IconButton onClick={handleCloseCard}>
              <CancelIcon color="error" />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={profileImageUrl}
                  alt={`${author} picture`}
                  title={author}
                ></Avatar>
              }
              title={<h3 style={{ wordWrap: "break-word" }}>{author}</h3>}
              subheader={
                <small style={{ lineHeight: 0 }}>
                  <Typography component="span" variant="caption">
                    {getTimeDifferenceString(dateCreated || "") ||
                      "1 second ago"}
                  </Typography>
                </small>
              }
            ></CardHeader>
          </Box>
          <Box component="div" pl={2} textAlign="left">
            <Typography>{post}</Typography>
          </Box>
          {video ? (
            <Box p={2}>
              {video ? (
                <center>
                  <CardMedia
                    component="video"
                    sx={{
                      width: "90% ",
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
          ) : null}
          {picture ? (
            <Box p={2}>
              {picture ? (
                <center>
                  <CardMedia
                    component="img"
                    sx={{ height: 200, width: "100%", borderRadius: "5px" }}
                    image={picture}
                  ></CardMedia>
                </center>
              ) : null}
            </Box>
          ) : null}
        </Box>
        <Box mt={1}>
          <Stack direction={{ md: "row", xs: "column" }} p={1}>
            <TextField
              value={text}
              sx={style}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                addComment(e, commentId, post)
              }
              name="text"
              className="comment-text"
              multiline
              placeholder="Write your comment..."
            ></TextField>
            <Button
              disabled={text.trim() === ""}
              onClick={handleUserComment}
              size="medium"
              color="primary"
              variant="contained"
              disableElevation
              sx={{ width: { xs: "150px" } , textTransform:"capitalize"}}
            >
              Post
            </Button>
          </Stack>
        </Box>
        <Box>
          {error ? (
            <Box>
              {error && user?.uid === undefined ? (
                <Typography
                  color="red"
                  m={1}
                  p={1}
                  variant="caption"
                  display="block"
                >
                  Login or signup to comment on article
                </Typography>
              ) : undefined}
            </Box>
          ) : null}
          {commentsList.length > 0 ? (
            <List>
              <Typography
                component="h3"
                variant="h6"
                m={1}
                mt={{ xs: 6, md:1 }}
                p={1}
              >
                Comments:
              </Typography>
              {commentsList.map((result: typeof aComment) => (
                <CommentCard {...result} key={result.comment.text} />
              ))}
            </List>
          ) : (
            <Typography
              m={1}
              textAlign="center"
              sx={{ display: "block" }}
              mt={10}
              variant="caption"
            >
              No comments yet, be the first.
            </Typography>
          )}
        </Box>
      </Box>
    </ScrollToTop>
  );
};
