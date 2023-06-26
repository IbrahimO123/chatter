import { Box, Grid } from "@mui/material";

import { GridOne } from "../components/GridOne";
import { GridTwo } from "../components/GridTwo";
import type { RootState } from "../redux/store";

import { useSelector, useDispatch } from "react-redux";

import { getAllPosts } from "../redux/posts/slice";
import { AppCard } from "../components/AppCard";
import { useEffect } from "react";
import axios from "axios";
import { Post } from "../redux/posts/model";

import { About } from "../components/About";
import { GridThree } from "../components/GridThree";
import { updateOtherState } from "../redux/Others/slice";

export const Home = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state: RootState) => state.posts);
  const others = useSelector((state: RootState) => state.others);

  const { allPosts } = posts;

  const fetchUserPost = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const data = await res.data;
      dispatch(getAllPosts(data.slice(0, 10)));
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
    <Box component="div">
      <Grid container p={{ xs: 0, md: 2 }} spacing={1}>
        <Grid sx={{ display: { xs: "none", md: "grid" } }} item md={1.8}>
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
        </Grid>
        <Grid item sx={{ display: { xs: "none", md: "grid" } }} md={2.2}>
          <GridThree />
          <About />
        </Grid>
      </Grid>
    </Box>
  );
};
