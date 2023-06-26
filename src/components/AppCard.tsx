import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  CardMedia,
  Avatar,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Post } from "../redux/posts/model";

import womanImage from "../assets/images/woman.avif";
import womanImage2 from "../assets/images/woman2.avif";
const actionStyle = {
  display: "flex",
  justifyContent: "space-around",
};

export const AppCard = (cpost: Post) => {
  return (
    <Card sx={{ margin: "10px", maxHeight:"800px"}}>
      <CardHeader
        avatar={<Avatar src={cpost.id % 2 ? womanImage2 : womanImage} />}
        title="Heading of the post"
      ></CardHeader>
      <CardContent>
        <CardMedia
          sx={{ height: 350 }}
          image={cpost.id % 2 ? womanImage : womanImage2}
          title="woman holding phone exicted"
        ></CardMedia>
        <Typography variant="body2">{cpost.body}</Typography>
        <Typography variant="caption" sx={{ float: "right" }}>
          {new Date().toLocaleTimeString()}
        </Typography>
      </CardContent>
      <CardActions sx={actionStyle}>
        <Button endIcon={<ThumbUpOutlinedIcon />}>Like</Button>
        <Button endIcon={<AddCommentOutlinedIcon />}>Comment</Button>
        <Button endIcon={<ShareOutlinedIcon />}>Share</Button>
      </CardActions>
    </Card>
  );
};
