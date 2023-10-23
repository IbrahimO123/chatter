import { useState, useEffect } from "react";
import { Stack, TextField, Button, Box, Typography, List } from "@mui/material";
import { useComment } from "../custom/hooks/useComment";
import { useGeneral } from "../custom/hooks/useGeneral";
import { CommentCard } from "./CommentCard";
import { addCommentToDatabase } from "../Utilities/AddComments";
import { getAllComments } from "../Utilities/RetrieveComments";

const style = {
  "& .MuiOutlinedInput-root": {
    marginRight: "10px",
    "&.Mui-focused fieldset": {
      border: " 0.5px solid black",
    },
  },
};

type CommentProps = {
  commentId: string;
};

export const Comment = ({ commentId }: CommentProps) => {
  const { user, dispatch } = useGeneral();
  const { aComment, allComments, addComment, text, updateComment } =
    useComment();
  const [commentList, setCommentList] = useState<typeof allComments>([]);
  const [error, setError] = useState(false);
  const fetchComments = async () => {
    const res = await getAllComments(commentId);
    const { comments, error } = res;
    if (error === null && comments.length > 0) {
      setCommentList(comments as typeof allComments);
    } else {
    }
  };
  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentId,text]);
  const handleUserComment = () => {
    if (user?.uid) {
      addCommentToDatabase(aComment, commentId);
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
            addComment(e, commentId)
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
        {commentList.length > 0 && user?.uid ? (
          <List sx={{ maxHeight: "100%", overflow: "auto" }}>
            <Typography component="h3" variant="h5" m={1} p={1}>
              Comments:
            </Typography>
            {commentList.map((result: typeof aComment) => (
              <CommentCard {...result} key={result.comment.text} />
            ))}
          </List>
        ) : error ? (
          <Typography color="red" m={1} p={1} variant="caption">
            Login or signup to comment on article
          </Typography>
        ) : (
          <Typography m={1} p={1} variant="caption">
            No comments yet, be the first.
          </Typography>
        )}
      </Box>
    </Stack>
  );
};
