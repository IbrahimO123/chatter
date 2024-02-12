import { useGeneral } from "./useGeneral";
import { updateArticle } from "../../redux/articles/slice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Tags } from "../../Utilities/Miscellaneous";
import { SelectChangeEvent } from "@mui/material";
import { getAllLikedArticle } from "../../Utilities/RetrieveLiked";
import { useState } from "react";
import { addLikeArticleToDatabase } from "../../Utilities/AddLike";
import { updateLikeAsync } from "../../redux/like/slice";
import { UnlikeArticle } from "../../Utilities/UnLike";

export type likeList = {
  article: string;
  articleId: string;
  id: string;
  value: Boolean;
  when: string;
  who: string;
  whoId: string;
}[];

export const useArticle = () => {
  const {
    email,
    firstname,
    lastname,
    dispatch,
    others,
    profileImageUrl,
    user,
    updateOtherState,
  } = useGeneral();

  const { anArticle } = useSelector((state: RootState) => state.articles);
  const [likedArticleList, setLikedArticleList] = useState<likeList>([]);
  const [like, setLike] = useState(false);
  const saveDrafts = useSelector((state: RootState) => state.saveDrafts);
  const { aLike } = useSelector((state: RootState) => state.like);

  const { categories, title, text, subtitle, coverImage } = anArticle;

  const handleWriteArticle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateArticle({
        ...anArticle,
        [e.target.name]: e.target.value,
        authorEmail: email,
        authorName: `${lastname} ${firstname}`,
        profileImageUrl,
      })
    );
  };
  const handleSelectCategory = (e: SelectChangeEvent<typeof Tags>) => {
    const {
      target: { value },
    } = e;
    if (categories.length < 2) {
      dispatch(
        updateArticle({
          ...anArticle,
          categories: typeof value === "string" ? value.split(",") : value,
        })
      );
    } else {
      dispatch(
        updateOtherState({
          ...others,
          message: "You can only select two tags ",
          open: true,
          severity: "error",
        })
      );
      dispatch(
        updateArticle({
          ...anArticle,
          categories: [],
        })
      );
    }
    return;
  };

  const handleGetUserLikedArticle = async (articleId: string) => {
    if (user?.uid) {
      const response = await getAllLikedArticle(articleId);
      if (response.error) {
        console.log(response.error);
        return;
      } else {
        const likedArticle = response.likedArticle.filter(
          (article: any) => article.whoId === user.uid
        );
        if (likedArticle.length > 0) {
          setLike(true);
        }
        return response.likedArticle;
      }
    }
  };

  const handleUserLikeArticle = async (articleId: string, article: string) => {
    if (user?.uid) {
      setLike(true);
      const response = await dispatch(
        updateLikeAsync({
          ...aLike,
          value: true,
          articleId,
          article,
          whoId: user.uid,
          who: `${lastname} ${firstname}`,
        })
      );
      const data = await JSON.parse(JSON.stringify(response.payload));
      await addLikeArticleToDatabase(data, articleId);
      return "liked";
    } else {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Login first",
          severity: "error",
        })
      );
      return false;
    }
  };
  const handleFetchLikedArticles = async (articleId: string) => {
    const response = await getAllLikedArticle(articleId);
    const { likedArticle, error } = response;
    if (error === null && likedArticle.length > 0) {
      setLikedArticleList(likedArticle as likeList);
      return;
    } else {
      return;
    }
  };

  const handleUnlikedArticle = async (articleId: string, likedId: string) => {
    const res = await UnlikeArticle(articleId, likedId);
    if (res === "done") {
      setLike(false);
    } else {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Error updating liked article",
          severity: "error",
        })
      );
    }
  };
  return {
    handleWriteArticle,
    handleSelectCategory,
    handleUserLikeArticle,
    handleGetUserLikedArticle,
    handleFetchLikedArticles,
    handleUnlikedArticle,
    updateLikeAsync,
    anArticle,
    categories,
    title,
    text,
    like,
    setLike,
    subtitle,
    coverImage,
    saveDrafts,
    aLike,
    likedArticleList,
    setLikedArticleList,
  };
};
