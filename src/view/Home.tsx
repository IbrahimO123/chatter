import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { Loader } from "..";

import { GridOne } from "../components/GridOne";
import { GridTwo } from "../components/GridTwo";
import { MetaTags } from "../components/MetaTag";

import { AppCard } from "../components/AppCard";
import { useEffect } from "react";

import { About } from "../components/About";
import { GridThree } from "../components/GridThree";

import { getAllArticles } from "../Utilities/RetrieveAllArticles";
import { gridStyle } from "./../Utilities/Miscellaneous";
import { useGeneral } from "../custom/hooks/useGeneral";
import { getLoggedInUser } from "../Utilities/GetUserData";
const Home = () => {
  const [feed, setFeed] = useState<any>([]);
  const { user, dispatch, aUser } = useGeneral();

  const fetchUserPost = async () => {
    try {
      const result = await getAllArticles();
      const sortedArticles = result.articles.sort(
        (a: any, b: any) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      );
      setFeed(sortedArticles);
    } catch (err: any) {
      console.error("Error while fetching articles from server: ", err.code);
    }
  };
  useEffect(() => {
    fetchUserPost();
    if (user !== null) {
      getLoggedInUser({ user, dispatch, aUser });
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
              {feed && feed.length > 0 ? (
                feed.map((post: any) => <AppCard {...post} key={post.title} />)
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
