import { Container, Typography, Box } from "@mui/material";
import { MobileView } from "../Utilities/support";
import { useEffect } from "react";

type BlogProps = {
  title: string;
  subtitle: string;
  coverImage: string;
  text: string;
};

export const Blog = ({ title, subtitle, coverImage, text }: BlogProps) => {
  useEffect(() => {
    document.title = "Chatter | Blog";
  }, []);
  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography m={2} component="h1" variant="h4">
        {title}
      </Typography>
      <Box>
        <img
          src={coverImage}
          style={{
            width: "100%",
            maxWidth: "100%",
            height: MobileView() ? "15em" : "25em",
          }}
          alt={title}
        ></img>
      </Box>
      <Typography component="h1" variant="h6">
        {subtitle}
      </Typography>
      <Typography textAlign="left">{text}</Typography>

      <Box></Box>
    </Container>
  );
};
