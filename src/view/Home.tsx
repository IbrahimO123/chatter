import { useState } from "react";
import { Box, Grid } from "@mui/material";

import { GridOne } from "../components/GridOne";
import { GridTwo } from "../components/GridTwo";
import type { RootState } from "../redux/store";
import { MetaTags } from "../components/MetaTag";

import { useSelector, useDispatch } from "react-redux";

import { getAllPosts } from "../redux/posts/slice";
import { AppCard } from "../components/AppCard";
import { useEffect } from "react";
import axios from "axios";
import { Post } from "../redux/posts/model";

import { About } from "../components/About";
import { GridThree } from "../components/GridThree";
import { updateOtherState } from "../redux/Others/slice";
import { getAllArticles } from "../Utilities/RetrieveAllArticles";

const Home = () => {
  const dispatch = useDispatch();
  const [feed, setFeed] = useState<any>([]);

  const posts = useSelector((state: RootState) => state.posts);
  const others = useSelector((state: RootState) => state.others);

  const { allPosts } = posts;
  const fetchUserPost = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const data = await res.data;
      dispatch(getAllPosts(data.slice(0, 10)));
      const result = await getAllArticles();
      const sortedArticles = result.articles.sort(
        (a: any, b: any) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      );
      setFeed(sortedArticles);
    } catch (err: any) {
      console.error("Error: ", err.code);
    }
  };
  useEffect(() => {
    fetchUserPost();
    dispatch(updateOtherState({ ...others, loading: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MetaTags
        description="Surf the website for article to read. The article displayed are articles of your interest"
        title="Chatter | Home"
        PageTitle="Surf the Post to read"
        typeOfPlatform="website"
        href="/"
        url="/"
      />
      <Box component="div">
        <Grid container p={{ xs: 0, md: 1 }} spacing={1}>
          <Grid sx={{ display: { xs: "none", md: "grid" } }} item md={2}>
            <GridOne />
          </Grid>
          <Grid item xs={12} md={8}>
            <GridTwo />
            <Box>
              {allPosts && allPosts.length > 0 ? (
                allPosts.map((post: Post) => (
                  <AppCard {...post} key={post.title} />
                ))
              ) : (
                <small>No posts</small>
              )}
            </Box>
            <Box>
              {feed && feed.length > 0 ? (
                feed.map((post: any) => <AppCard {...post} key={post.title} />)
              ) : (
                <small>No posts</small>
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
