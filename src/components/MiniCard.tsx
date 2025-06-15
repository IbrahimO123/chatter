import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
  IconButton,
  Avatar,
  Divider,
  Modal,
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
import { useComment } from "../custom/hooks/useComment";
import { useArticle } from "../custom/hooks/useArticle";
import { ProfileCard } from "./profile/ProfileCard";

const actionStyle = {
  display: "flex",
  justifyContent: "center",
  fontSize: "5px",
};

export const menuStyle = {
  fontSize: "12px",
};

type MiniCardProps = {
  id: string;
  authorName: string;
  profileImageUrl: string;
  dateCreated: string;
  coverImage: string;
  text: string;
  title: string;
  email: string;
  authorEmail: string;
};
export const MiniCard = (card: MiniCardProps) => {
  const { navigate } = useGeneral();
  const { commentsList, fetchComments, text } = useComment();
  const { handleFetchLikedArticles, likedArticleList } = useArticle();
  const blogPost = () => {
    navigate(`/articles/single/${card.authorName}/${card.id}/${card.title}`);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openCard, setOpenCard] = useState(false);
  const handleCloseCard = () => {
    setOpenCard(false);
  };
  useEffect(() => {
    fetchComments(card.id);
    handleFetchLikedArticles(card.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id, text]);

  return (
    <Card sx={{ margin: "10px", maxHeight: "750px" }} elevation={0}>
      <CardHeader
        sx={{ margin: 0, paddingBottom: 0 }}
        avatar={
          <Avatar
            src={card.profileImageUrl || " "}
            alt={card.authorName ? card.authorName + " picture" : ""}
            title={card.authorName || ""}
            onClick={() => setOpenCard(true)}
          />
        }
        title={
          <h3 style={{ wordWrap: "break-word" }}>{card.title.toUpperCase()}</h3>
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
          <small style={{ lineHeight: 0 }}>
            <Typography component="span" variant="caption">
              {getTimeDifferenceString(card.dateCreated) || "1 second ago"}
            </Typography>
            .
            <Typography component="span" variant="caption" ml={1}>
              {calculateReadingTime(card.text) || "1"} mins read
            </Typography>
          </small>
        }
      ></CardHeader>
      <Modal
        open={openCard}
        onClose={handleCloseCard}
        sx={{ display: "grid", placeItems: "center" }}
      >
        <ProfileCard
          author={card.authorName}
          email={card.authorEmail}
          profileImg={card.profileImageUrl}
        ></ProfileCard>
      </Modal>
      <CardContent>
        <CardMedia
          sx={{
            height: "300px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "5px",
          }}
          image={card.coverImage}
          title={"Chatter_App_" + card.title}
          onClick={blogPost}
        ></CardMedia>
        <Typography mt={2} variant="body2">
          {`${card.text?.substring(0, 300)}....`}{" "}
          <span className="read-more" onClick={blogPost}>
            Read more
          </span>
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardActions sx={actionStyle}>
        <IconButton
          disableRipple
          sx={{ fontSize: "15px", cursor: "context-menu" }}
        >
          <ThumbUpOutlinedIcon sx={{ padding: "5px", fontSize: "20px" }} />{" "}
          <span>{likedArticleList.length || 0}</span>
        </IconButton>
        <IconButton
          disableRipple
          sx={{ fontSize: "15px", cursor: "context-menu" }}
        >
          <AddCommentOutlinedIcon sx={{ padding: "5px", fontSize: "20px" }} />{" "}
          <span>{commentsList.length || 0}</span>
        </IconButton>
        <IconButton
          disableRipple
          sx={{ fontSize: "15px", cursor: "context-menu" }}
        >
          <ShareOutlinedIcon sx={{ padding: "5px", fontSize: "20px" }} />{" "}
          <span>0</span>
        </IconButton>
      </CardActions>
    </Card>
  );
};
