import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { CommentModel } from "../redux/comment/model";
import { useComment } from "../custom/hooks/useComment";

export const CommentCard = (props: CommentModel) => {
  const { likeComment } = useComment();
  return (
    <Card
      sx={{
        bgcolor: "#e8f5e9",
        margin: "10px",
        color: "#000",
        padding: "5px",
        borderRadius: "3px",
        width: { md: "30vw", xs: "90vw" },
      }}
      elevation={0}
      key={props.comment.text}
    >
      <CardHeader
        sx={{ color: "#263238" }}
        avatar={
          <Avatar
            src={props.comment.profileImageUrl || " "}
            alt={
              props.comment.authorName
                ? props.comment.authorName + " picture"
                : ""
            }
            title={props.comment.authorName || ""}
          />
        }
        title={
          <Typography width={{ md: "10vw", xs: "40vw" }}>
            {props.comment.authorName}
          </Typography>
        }
        subheader={
          <Typography
            sx={{ fontSize: "10px", width: { xs: "40vw", md: "10vw" } }}
          >
            {props.comment.dateCreated}{" "}
            <span style={{ marginLeft: "10px" }}>
              {" "}
              {props.comment.timeCreated}
            </span>
          </Typography>
        }
      />
      <CardContent>{props.comment.text}</CardContent>
      <CardActions>
        <IconButton onClick={likeComment}>
          {props.comment.commentLikes.length < 0 ? (
            <ThumbUpIcon sx={{ fontSize: "15px" }} />
          ) : (
            <ThumbUpOutlinedIcon sx={{ fontSize: "15px" }} />
          )}
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon sx={{ fontSize: "15px" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};
