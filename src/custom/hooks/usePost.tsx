import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGeneral } from "./useGeneral";
import { updateAPost } from "../../redux/posts/slice";
import { useState } from "react";
export const usePost = () => {
  const aPost = useSelector((state: RootState) => state.posts.aPost);
  const { dispatch } = useGeneral();
  const { content, likesCount } = aPost;
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateAPost({
        ...aPost,
        [e.target.name]: e.target.value,
      })
    );
  };
  return {
    handleChangeContent,
    content,
    likesCount,
    selectedImage,
    selectedVideo,
    setSelectedImage,
    setSelectedVideo,
  };
};
