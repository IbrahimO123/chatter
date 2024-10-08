import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleArticle } from "../Utilities/RetrieveArticle";
import { Box } from "@mui/material";
import { ArticleCard } from "../components/ArticleCard";
import { MiniSkeleton } from "../components/MiniSkeleton";
import { MetaTags } from "../components/MetaTag";
import { useGeneral } from "../custom/hooks/useGeneral";
import { getLoggedInUser } from "../Utilities/GetUserData";

const SingleArticle = () => {
  const { user, dispatch, aUser } = useGeneral();
  const [singleArticle, setSingleArtcile] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params: any = useParams();
  const { articleId, title, authorName } = params;
  const fetchArticle = async () => {
    const article = await getSingleArticle(articleId);
    if (article?.length === 0) {
      setSingleArtcile([
        {
          id: "no-article",
          title: "Document does not exist",
        },
      ]);
      return setIsLoading(false);
    } else {
      setSingleArtcile(article);
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  useEffect(() => {
    if (user !== null) {
      getLoggedInUser({ user, dispatch, aUser });
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      <MetaTags
        description="Article page, reader can access the content of an article, comment on it, bookmark for future refrences"
        title={`Chatter | ${
          singleArticle[0]?.title ? singleArticle[0]?.title : "Loading..."
        }`}
        PageTitle="Article Page, details on article"
        typeOfPlatform="website"
        url={`/articles/single/${authorName}/${articleId}/${title}`}
        href={`/articles/single/${authorName}/${articleId}/${title}`}
      />
      <Box>
        {isLoading ? (
          <MiniSkeleton />
        ) : (
          singleArticle.map((article: any) => (
            <ArticleCard {...article} key={article.id} />
          ))
        )}
      </Box>
    </>
  );
};

export default SingleArticle;
