import { useState, useEffect } from "react";
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
} from "@mui/material";
import { useComment } from "../custom/hooks/useComment";
import { useGeneral } from "../custom/hooks/useGeneral";
import { CommentCard } from "./CommentCard";
import { addCommentToDatabase } from "../Utilities/AddComments";
import { getTimeDifferenceString } from "../Utilities/Miscellaneous";
import ScrollToTop from "./ScrollToTop";

export const style = {
  "& .MuiOutlinedInput-root": {
    marginRight: "10px",
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
};

export const PostComment = ({
  commentId,
  post,
  video,
  picture,
  author,
  profileImageUrl,
  dateCreated,
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
      <Stack
        textAlign="center"
        sx={{
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          width: "450px",
        }}
      >
        <Box component="div">
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
                  {getTimeDifferenceString(dateCreated || "") || "1 second ago"}
                </Typography>
              </small>
            }
          ></CardHeader>
          <Box component="div"  pl={2} textAlign="left">
            <Typography>{post}</Typography>
          </Box>
          <Box p={2}>
            {video ? (
              <center>
                <CardMedia
                  component="video"
                  sx={{
                    width: "400px",
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
                  sx={{ height: 250, width: "100%", borderRadius: "5px" }}
                  image={picture}
                ></CardMedia>
              </center>
            ) : null}
          </Box>
        </Box>
        <Box mt={1}>
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
            disabled={text === "" || text.trim() === ""}
            onClick={handleUserComment}
            disableFocusRipple
            size="small"
            color="primary"
            variant="contained"
            disableElevation
          >
            Post
          </Button>
        </Box>
        <Box>
          <Box>
            {error && user?.uid === undefined ? (
              <Typography color="red" m={1} p={1} variant="caption">
                Login or signup to comment on article
              </Typography>
            ) : undefined}
          </Box>
          {commentsList.length > 0 ? (
            <List>
              <Typography component="h3" variant="h5" m={1} p={1}>
                Comments:
              </Typography>
              {commentsList.map((result: typeof aComment) => (
                <CommentCard {...result} key={result.comment.text} />
              ))}
            </List>
          ) : (
            <Typography m={1} p={1} variant="caption">
              No comments yet, be the first.
            </Typography>
          )}
        </Box>
      </Stack>
    </ScrollToTop>
  );
};