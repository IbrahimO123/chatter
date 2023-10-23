import { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
  IconButton,
  Avatar,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { calculateReadingTime } from "../Utilities/Miscellaneous";
import { getTimeDifferenceString } from "../Utilities/Miscellaneous";
import { ManagePostMore } from "../Utilities/Miscellaneous";
import { MenuComponent } from "./MenuComponent";
import { useGeneral } from "../custom/hooks/useGeneral";

const actionStyle = {
  display: "flex",
  justifyContent: "center",
  fontSize: "5px",
};

export const menuStyle = {
  fontSize: "12px",
};

type AppCardProps = {
  id: string;
  authorName: string;
  profileImageUrl: string;
  dateCreated: string;
  coverImage: string;
  text: string;
  title: string;
};
export const MiniCard = (cpost: AppCardProps) => {
  const { navigate } = useGeneral();
  const blogPost = () => {
    navigate(`/articles/single/${cpost.authorName}/${cpost.id}/${cpost.title}`);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ margin: "10px", maxHeight: "900px" }} elevation={0}>
      <CardHeader
        sx={{ margin: 0, paddingBottom: 0 }}
        avatar={
          <Avatar
            onClick={blogPost}
            src={cpost.profileImageUrl || " "}
            alt={cpost.authorName ? cpost.authorName + " picture" : ""}
            title={cpost.authorName || ""}
          />
        }
        title={
          <h3 style={{ wordWrap: "break-word" }} onClick={blogPost}>
            {cpost.title.toUpperCase()}
          </h3>
        }
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
          <small onClick={blogPost} style={{ lineHeight: 0 }}>
            <Typography component="span" variant="caption">
              {getTimeDifferenceString(cpost.dateCreated) || "1 second ago"}
            </Typography>
            .
            <Typography component="span" variant="caption" ml={1}>
              {calculateReadingTime(cpost.text) || "1"} mins read
            </Typography>
          </small>
        }
      ></CardHeader>
      <CardContent>
        <CardMedia
          sx={{ height: 350 }}
          image={cpost.coverImage}
          title={cpost.title}
          onClick={blogPost}
        ></CardMedia>
        <Typography mt={2} variant="body2">
          {`${cpost.text?.substring(0, 300)}....`}{" "}
          <span className="read-more" onClick={blogPost}>
            Read more
          </span>
        </Typography>
      </CardContent>
      <CardActions sx={actionStyle}>
        <IconButton sx={{ fontSize: "15px" }}>
          <ThumbUpOutlinedIcon sx={{ padding: "5px", fontSize: "20px" }} />{" "}
          <span>0</span>
        </IconButton>
        <IconButton sx={{ fontSize: "15px" }}>
          <AddCommentOutlinedIcon sx={{ padding: "5px", fontSize: "20px" }} />{" "}
          <span>0</span>
        </IconButton>
        <IconButton sx={{ fontSize: "15px" }}>
          <ShareOutlinedIcon sx={{ padding: "5px", fontSize: "20px" }} />{" "}
          <span>0</span>
        </IconButton>
      </CardActions>
    </Card>
  );
};
