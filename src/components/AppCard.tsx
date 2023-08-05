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
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import HideSourceIcon from "@mui/icons-material/HideSource";
import ReportIcon from "@mui/icons-material/Report";
import CopyAllSharpIcon from "@mui/icons-material/CopyAllSharp";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";

import { Post } from "../redux/posts/model";

import womanImage from "../assets/images/woman.avif";
import womanImage2 from "../assets/images/woman2.avif";

const actionStyle = {
  display: "flex",
  justifyContent: "space-around",
};

export const AppCard = (cpost: Post) => {
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
        avatar={<Avatar src={cpost.id % 2 ? womanImage2 : womanImage} />}
        title="Heading of the post"
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
            <Menu
              sx={{ left: 0, right: 5 }}
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem sx={{ fontSize: "12px" }} onClick={handleClose}>
                <BookmarkAddIcon />
                Save
              </MenuItem>
              <MenuItem sx={{ fontSize: "12px" }} onClick={handleClose}>
                {" "}
                <HideSourceIcon /> Hide
              </MenuItem>
              <MenuItem sx={{ fontSize: "12px" }} onClick={handleClose}>
                {" "}
                <ReportIcon /> Report
              </MenuItem>
              <MenuItem sx={{ fontSize: "12px" }} onClick={handleClose}>
                {" "}
                <CopyAllSharpIcon /> Copy link
              </MenuItem>
              <MenuItem sx={{ fontSize: "12px" }} onClick={handleClose}>
                {" "}
                <TuneSharpIcon /> Manage your feed
              </MenuItem>
            </Menu>
          </>
        }
        subheader={
          <small>
            <Typography variant="caption">
              {new Date().toLocaleTimeString()}
            </Typography>
          </small>
        }
      ></CardHeader>
      <CardContent>
        <CardMedia
          sx={{ height: 350 }}
          image={cpost.id % 2 ? womanImage : womanImage2}
          title="woman holding phone exicted"
        ></CardMedia>
        <Typography variant="body2">{cpost.body}</Typography>
      </CardContent>
      <CardActions sx={actionStyle}>
        <Button endIcon={<ThumbUpOutlinedIcon />}>Like</Button>
        <Button endIcon={<AddCommentOutlinedIcon />}>Comment</Button>
        <Button endIcon={<ShareOutlinedIcon />}>Share</Button>
      </CardActions>
    </Card>
  );
};
