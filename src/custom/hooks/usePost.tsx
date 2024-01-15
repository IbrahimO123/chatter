import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGeneral } from "./useGeneral";
import { updateAPost } from "../../redux/posts/slice";
import { useState } from "react";
import { addPostToDatabase } from "../../Utilities/AddPost";
import { updateOtherState } from "../../redux/Others/slice";
export const usePost = () => {
  const aPost = useSelector((state: RootState) => state.posts.aPost);
  const { dispatch, user, others } = useGeneral();
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
  const handleSelectedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0) {
      setSelectedImage(undefined);
      return false;
    }
    let imageObj = e.target!.files![0];
    const { size, type } = imageObj;
    const mb = size / 1000000;
    if (mb > 2) {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Size exceeds the maximum allowed 2MB size.",
          severity: "error",
        })
      );
      e.target.value = "";
      setSelectedImage(undefined);
      return false;
    }
    const ext = type.split("/")[0];

    if (ext !== "image") {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Please upload image only",
          severity: "error",
        })
      );
      e.target.value = "";
      setSelectedImage(undefined);
      return false;
    }
    setSelectedImage(e.target!.files![0]);
  };
  const handleSelectedVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let videoObj = e.target!.files![0];
    const { size, type } = videoObj;
    if (e.target.files?.length === 0) {
      setSelectedVideo(undefined);
      return false;
    }
    const mb = size / 1000000;
    if (mb > 10) {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Size exceeds the maximum allowed 10MB size.",
          severity: "error",
        })
      );
      e.target.value = "";
      setSelectedVideo(undefined);
      return false;
    }
    const ext = type.split("/")[0];

    if (ext !== "video") {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Please upload a video only",
          severity: "error",
        })
      );
      e.target.value = "";
      setSelectedVideo(undefined);
      return false;
    }
    setSelectedVideo(e.target!.files![0]);
  };
  return {
    handleChangeContent,
    handleAddPost,
    handleSelectedImage,
    handleSelectedVideo,
    content,
    likesCount,
    selectedImage,
    selectedVideo,
    setSelectedImage,
    setSelectedVideo,
  };
};
