import { useState, useEffect } from "react";
import { Stack, TextField, Button, Box, Typography, List } from "@mui/material";
import { useComment } from "../custom/hooks/useComment";
import { useGeneral } from "../custom/hooks/useGeneral";
import { CommentCard } from "./CommentCard";
import { addCommentToDatabase } from "../Utilities/AddComments";

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
  article:string;
};

export const Comment = ({ commentId, article }: CommentProps) => {
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
  }, [commentId, text]);
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
    <Stack textAlign="center">
      <Box>
        <TextField
          value={text}
          sx={style}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            addComment(e, commentId, article)
          }
          name="text"
          className="comment-text"
          multiline
          placeholder="Write your comment..."
        ></TextField>
        <Button
          disabled={text === ""}
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
          <List sx={{ maxHeight: "100%", overflow: "auto" }}>
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
  );
};
