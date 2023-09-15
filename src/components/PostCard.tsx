import { Container, Typography, Box } from "@mui/material";
import { MobileView } from "../Utilities/support";

export const PostCard = (post: any) => {
  return (
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
      <Box textAlign="left" mt={1}>
        <Typography mr={2} color="primary" component="span">
          &#x23;{post?.categories[0]}
        </Typography>
        <Typography color="primary" component="span">
          &#x23;{post?.categories[1]}
        </Typography>
      </Box>
    </Container>
  );
};
