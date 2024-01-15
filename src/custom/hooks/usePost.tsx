import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGeneral } from "./useGeneral";
import { updateAPost } from "../../redux/posts/slice";
import { useState } from "react";
import { addPostToDatabase } from "../../Utilities/AddPost";
export const usePost = () => {
  const aPost = useSelector((state: RootState) => state.posts.aPost);
  const { dispatch, user} = useGeneral();
  const { content, likesCount } = aPost;
  const [selectedImage, setSelectedImage] = useState<File>();
  const [selectedVideo, setSelectedVideo] = useState<File>();
  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateAPost({
        ...aPost,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleAddPost = () => {
    if (user?.uid) {
      addPostToDatabase(aPost, user.uid);
    } else {
      console.log("Login or sign up to post");
    }
  };
  return {
    handleChangeContent,
    handleAddPost,
    content,
    likesCount,
    selectedImage,
    selectedVideo,
    setSelectedImage,
    setSelectedVideo,
  };
};
