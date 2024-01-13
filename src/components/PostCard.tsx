import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type postCard = {
  likesCount?: number;
  sharesCount?: number;
  commentsCount?: number;
  viewsCount?: number;
  content: string;
  author?: string;
  userId?: number;
  picture?: string;
  video?: string;
  event?: string;
  timeCreated?: string;
  dateCreated?: string;
};

export const PostCard = ({ content, video }: postCard) => {
  return (
    <Box>
      <Paper
        sx={{
          display: { xs: "none", md: "grid" },
          padding: "2px 2px",
          margin: "5px 10px",
        }}
        elevation={0}
      >
        <Box sx={{display:"flex", justifyContent:"space-between", alignContent:"center"}}>
          <Avatar
            sizes="small"
            src=""
            sx={{ padding: "2px", margin: "10px 10px 0px 10px" }}
          ></Avatar>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Grid container textAlign="center">
          <Grid item md={12} xs={12}>
            <Box component="div" p={2} textAlign="left">
              <Typography>{content}</Typography>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignContent: "center",
              }}
            >
              <IconButton title="Like">
                <ThumbUpOutlinedIcon />
              </IconButton>
              <IconButton title="Add Comment">
                <AddCommentOutlinedIcon />
              </IconButton>
              <IconButton title="Share">
                <ShareOutlinedIcon />
              </IconButton>
              <IconButton title="Repost">
                <RepeatIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
