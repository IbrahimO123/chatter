import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  CardMedia,
  IconButton,
  Avatar,
} from "@mui/material";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { calculateReadingTime } from "../Utilities/support";
import { getTimeDifferenceString } from "../Utilities/support";
import { ManagePostMore } from "../Utilities/support";
import { MenuComponent } from "./MenuComponent";
// import { Post } from "../redux/posts/model";
// import { Article } from "../redux/articles/model";

import { useNavigate } from "react-router-dom";

const actionStyle = {
  display: "flex",
  justifyContent: "space-around",
};

export const menuStyle = {
  fontSize: "12px",
};
export const AppCard = (cpost: any) => {
  const navigate = useNavigate();
  const blogPost = () => {
    navigate(`/articles/single/${cpost.id}`);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ margin: "10px", maxHeight: "800px" }}>
      <CardHeader
        avatar={<Avatar src=""/>}
        title={<h3>{cpost.title.toUpperCase()}</h3>}
        action={
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <MenuComponent
              open={open}
              handleClose={handleClose}
              data={ManagePostMore}
              anchorEl={anchorEl}
            />
          </>
        }
        subheader={
          <small style={{ fontWeight: "bolder" }}>
            <Typography variant="caption">
              {getTimeDifferenceString(cpost.dateCreated)}    
            </Typography>
            <Typography variant="caption" m={2}>
              {calculateReadingTime(cpost.title)} mins read
            </Typography>
          </small>
        }
      ></CardHeader>
      <CardContent onClick={blogPost}>
        <CardMedia
          sx={{ height: 350 }}
          image={cpost.coverImage}
          title={cpost.title}
        ></CardMedia>
        <Typography mt={2} variant="body2">
          {`${cpost.text?.substring(0, 200)}....`}
        </Typography>
      </CardContent>
      <CardActions sx={actionStyle}>
        <Button
          onClick={() => console.log("button Clicked")}
          endIcon={<ThumbUpOutlinedIcon />}
        >
          Like
        </Button>
        <Button endIcon={<AddCommentOutlinedIcon />}>Comment</Button>
        <Button endIcon={<ShareOutlinedIcon />}>Share</Button>
      </CardActions>
    </Card>
  );
};
