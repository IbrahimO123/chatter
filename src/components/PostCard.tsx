import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  useScrollTrigger,
  Zoom,
  Fab,
} from "@mui/material";
import { MobileView } from "../Utilities/Miscellaneous";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useCallback } from "react";

export const PostCard = (post: any) => {
  const trigger = useScrollTrigger({
    threshold: 500,
  });
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
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
