import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { Loader } from "..";

import { GridOne } from "../components/GridOne";
import { GridTwo } from "../components/GridTwo";
import { MetaTags } from "../components/MetaTag";
import { PostCard } from "../components/PostCard";

import { MiniCard } from "../components/MiniCard";
import { useEffect } from "react";

import { About } from "../components/About";
import { GridThree } from "../components/GridThree";

import { getAllArticles } from "../Utilities/RetrieveAllArticles";
import { gridStyle } from "./../Utilities/Miscellaneous";
import { useGeneral } from "../custom/hooks/useGeneral";
import { getLoggedInUser } from "../Utilities/GetUserData";
import { getAllPosts } from "../Utilities/RetrieveAllPost";
import { usePost } from "../custom/hooks/usePost";

const Home = () => {
  const [feed, setFeed] = useState<any>([]);
  const [posts, setPosts] = useState<any>([]);

  const { user, dispatch, aUser } = useGeneral();
  const { content } = usePost();

  const fetchAllContent = async () => {
    try {
      const result = await getAllArticles();
      const res = await getAllPosts();
      const sortedArticles = result.articles.sort(
        (a: any, b: any) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      );
      const sortedPosts = res.posts.sort(
        (a: any, b: any) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      );
      setFeed(sortedArticles);
      setPosts(sortedPosts);
    } catch (err: any) {
      console.error("Error while fetching articles from server: ", err.code);
    }
  };
  useEffect(() => {
    fetchAllContent();
    if (user !== null) {
      getLoggedInUser({ user, dispatch, aUser });
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, content]);

  return (
    <>
      <MetaTags
        description="Surf the website for article to read. The article displayed are articles of your interest"
        title="Home | Chatter"
        PageTitle="Surf the Post to read"
        typeOfPlatform="website"
        href="/"
        url="/"
      />
      <Box component="div">
        <Grid
          container
          p={{ xs: 0, md: 1 }}
          spacing={8}
          justifyContent="center"
        >
          <Grid sx={{ display: { xs: "none", md: "grid" } }} item md={2}>
            <GridOne />
          </Grid>
          <Grid item xs={11} md={6}>
            <GridTwo />
            <Box>
              {posts && posts.length > 0 ? (
                posts.map((post: any) => (
                  <PostCard {...post} key={post.content} />
                ))
              ) : (
                <Box
                  sx={{ ...gridStyle, backgroundColor: "inherit" }}
                  mt={15}
                  mb={15}
                >
                  <Loader />
                </Box>
              )}
              {feed && feed.length > 0 ? (
                feed.map((post: any) => <MiniCard {...post} key={post.title} />)
              ) : (
                <Box
                  sx={{ ...gridStyle, backgroundColor: "inherit" }}
                  mt={15}
                  mb={15}
                >
                  <Loader />
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item sx={{ display: { xs: "none", md: "grid" } }} md={2}>
            <GridThree />
            <About />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
