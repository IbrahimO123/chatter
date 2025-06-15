import { useState, useEffect } from "react";
import parse from "html-react-parser";
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  useScrollTrigger,
  Zoom,
  Fab,
  Button,
} from "@mui/material";
import { MobileView } from "../../Utilities/Miscellaneous";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useCallback } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Comment } from "./Comment";
import { likeList, useArticle } from "../../custom/hooks/useArticle";
import { getData } from "../../Utilities/GetUserData";
import { User } from "../../redux/user/model";
import { useGeneral } from "../../custom/hooks/useGeneral";
import { ShareComponent } from "../Share";
import ScrollToTop from "../ScrollToTop";
import { mdParser } from "./Editors";
import { AuthorCard } from "../profile/AuthorCard";

const actionStyle = {
  display: "flex",
  justifyContent: "space-around",
  padding: "10px",
};

export const ArticleCard = (article: any) => {
  const trigger = useScrollTrigger({
    threshold: 500,
  });
  const [author, setAuthor] = useState<User | any>({});

  const {
    handleUserLikeArticle,
    handleGetUserLikedArticle,
    handleUnlikedArticle,
    likedArticleList,
    setLikedArticleList,
    like,
  } = useArticle();

  const { user } = useGeneral();
  const [openShare, setOpenShare] = useState<null | HTMLElement>(null);
  const openShareMenu = Boolean(openShare);
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [hideComment, setHideComment] = useState("none");

  const handleComment = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setHideComment("block");
  };

  const handleCloseComment = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setHideComment("none");
  };
  const handleClickShare = (event: React.MouseEvent<HTMLElement>) => {
    setOpenShare(event.currentTarget);
  };
  const handleCloseShare = () => {
    setOpenShare(null);
  };

  const likeArticle = async () => {
    await handleUserLikeArticle(article.id, article.title);
  };

  const getAuthor = async () => {
    const res = await getData(article.authorEmail);
    if (res?.exists()) {
      setAuthor(res?.data());
    }
  };

  const getLikedArticle = async () => {
    const res = await handleGetUserLikedArticle(article.id);
    setLikedArticleList(res as likeList);
  };

  const unLikeArticle = async () => {
    const res = likedArticleList.filter((item) => item.whoId === user?.uid);
    if (res[0].hasOwnProperty("id")) {
      await handleUnlikedArticle(article.id, res[0].id);
      return;
    } else {
      console.log("Error with  like id");
    }
  };

  useEffect(() => {
    getAuthor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [like]);

  useEffect(() => {
    getLikedArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [like]);

  return (
    <ScrollToTop>
      <Paper elevation={0} sx={{ borderRadius: "0", p: 2, m: 1 }}>
        <Container sx={{ textAlign: "center" }}>
          <Typography m={2} component="p" variant={MobileView() ? "h5" : "h4"}>
            {article.title}
          </Typography>
          <Typography component="h1" variant="h6">
            {article.subtitle}
          </Typography>
          <Box mt={1} mb={1}>
            <img
              src={article.coverImage}
              style={{
                width: "100%",
                maxWidth: "100%",
                height: MobileView() ? "15em" : "25em",
                borderRadius: "5px",
              }}
              alt={article.title}
            ></img>
          </Box>
          <Typography
            sx={{ wordSpacing: "5px", letterSpacing: "1.5px" }}
            textAlign="left"
          >
            {parse(mdParser.render(article.text))}
          </Typography>
          <Box component="div" p={3} textAlign="left">
            {article.categories.map((category: string) => (
              <Chip
                key={category}
                sx={{ margin: "10px" }}
                color="warning"
                label={category}
              />
            ))}
          </Box>
          <Box sx={actionStyle}>
            <Button
              sx={{ color: "black" }}
              onClick={like ? unLikeArticle : likeArticle}
              endIcon={
                like ? (
                  <ThumbUpIcon sx={{ color: "#4caf50", marginTop: "-5px" }} />
                ) : (
                  <ThumbUpOutlinedIcon sx={{ marginTop: "-5px" }} />
                )
              }
            >
              Like
            </Button>
            <Button
              sx={{ color: "black" }}
              onClick={
                hideComment === "none" ? handleComment : handleCloseComment
              }
              disableElevation
              endIcon={<AddCommentOutlinedIcon />}
            >
              Comment
            </Button>
            <Button
              title="share"
              aria-label="more"
              id="long-button"
              aria-controls={openShareMenu ? "menu" : undefined}
              aria-expanded={openShareMenu ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClickShare}
              sx={{ color: "black" }}
              endIcon={<ShareOutlinedIcon />}
            >
              Share
            </Button>
            <ShareComponent
              handleClose={handleCloseShare}
              open={openShareMenu}
              anchorEl={openShare}
            ></ShareComponent>
          </Box>
          <Box component="div" sx={{ display: hideComment }}>
            <Comment commentId={article.id} article={article.title} />
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <AuthorCard {...author} />
          </Box>
        </Container>
      </Paper>
    </ScrollToTop>
  );
};
