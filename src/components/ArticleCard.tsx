import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  useScrollTrigger,
  Zoom,
  Fab,
  Button,
} from "@mui/material";
import { MobileView } from "../Utilities/Miscellaneous";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useCallback } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Comment } from "./Comment";

const actionStyle = {
  display: "flex",
  justifyContent: "space-around",
  padding: "10px",
};

export const ArticleCard = (post: any) => {
  const trigger = useScrollTrigger({
    threshold: 500,
  });
  const [like, setLike] = useState(false);
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const handleLike = () => {
    setLike((prev) => !prev);
  };
  const [hideComment, setHideComment] = useState("none");

  const handleComment = (e: React.MouseEvent<HTMLElement>) => {
    setHideComment("block");
  };
  const handleCloseComment = (e: React.MouseEvent<HTMLElement>) => {
    setHideComment("none");
  };
  return (
    <Paper elevation={0}>
      <Container sx={{ textAlign: "center" }}>
        <Typography m={2} component="p" variant="h3">
          {post.title}
        </Typography>
        <Typography component="h1" variant="h6">
          {post.subtitle}
        </Typography>
        <Box mt={1} mb={1}>
          <img
            src={post.coverImage}
            style={{
              width: "100%",
              maxWidth: "100%",
              height: MobileView() ? "15em" : "25em",
            }}
            alt={post.title}
          ></img>
        </Box>
        <Typography textAlign="left">{post.text}</Typography>
        <Box component="div" p={3} textAlign="left">
          {post.categories.map((category: string) => (
            <Chip
              key={category}
              sx={{ margin: "10px" }}
              color="warning"
              label={category}
            />
          ))}
        </Box>
        <Box sx={actionStyle}>
          <Button
            sx={{ color: "black" }}
            onClick={handleLike}
            endIcon={like ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          >
            Like
          </Button>
          <Button
            sx={{ color: "black" }}
            onClick={
              hideComment === "none" ? handleComment : handleCloseComment
            }
            disableElevation
            endIcon={<AddCommentOutlinedIcon />}
          >
            Comment
          </Button>
          <Button sx={{ color: "black" }} endIcon={<ShareOutlinedIcon />}>
            Share
          </Button>
        </Box>
        <Box component="div" sx={{ display: hideComment }}>
          <Comment commentId={post.id}  />
        </Box>
        <Zoom in={trigger}>
          <Box
            role="presentation"
            sx={{
              position: "fixed",
              bottom: 32,
              right: 32,
              zIndex: 1,
            }}
          >
            <Fab
              onClick={scrollToTop}
              size="large"
              aria-label="Scroll back to top"
            >
              <KeyboardArrowUpIcon />
            </Fab>
          </Box>
        </Zoom>
      </Container>
    </Paper>
  );
};
