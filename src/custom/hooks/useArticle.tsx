import { useGeneral } from "./useGeneral";
import { updateArticle } from "../../redux/articles/slice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateOtherState } from "../../redux/Others/slice";
import { Tags } from "../../Utilities/Miscellaneous";
import { SelectChangeEvent } from "@mui/material";

export const useArticle = () => {
  const { email, firstname, lastname, dispatch, others, profileImageUrl } =
    useGeneral();
  const { anArticle } = useSelector((state: RootState) => state.articles);
  const saveDrafts = useSelector((state: RootState) => state.saveDrafts);
  const { categories, title, text, subtitle, coverImage } = anArticle;
  const handleArticle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateArticle({
        ...anArticle,
        [e.target.name]: e.target.value,
        authorEmail: email,
        authorName: ` ${lastname} ${firstname}`,
        profileImageUrl,
      })
    );
  };
  const handleCategory = (e: SelectChangeEvent<typeof Tags>) => {
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
  return {
    handleArticle,
    handleCategory,
    anArticle,
    categories,
    title,
    text,
    subtitle,
    coverImage,
    saveDrafts,
  };
};