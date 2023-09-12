import { Container, Typography, Box } from "@mui/material";
import { MobileView } from "../Utilities/support";

export const PostCard = (post: any) => {
  return (
    <Container sx={{ textAlign: "center" }} >
      <Typography m={2} component="h1" variant="h4">
        {post.title}
      </Typography>
      <Box>
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
      <Typography component="h1" variant="h6">
        {post.subtitle}
      </Typography>
      <Typography textAlign="left">{post.text}</Typography>
    </Container>
  );
};
