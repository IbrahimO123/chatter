import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleArticle } from "../Utilities/RetrieveArticle";
import { Container } from "@mui/material";
import { PostCard } from "../components/PostCard";
import { PostSkeleton } from "../components/PostSkeleton";

const SingleArticle = () => {
  const [singleArticle, setSingleArtcile] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params: any = useParams();
  const { articleId } = params;
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
  return (
    <Container>
      {isLoading ? (
        <PostSkeleton />
      ) : (
        singleArticle.map((article: any) => (
          <PostCard {...article} key={article.id} />
        ))
      )}
    </Container>
  );
};

export default SingleArticle;
