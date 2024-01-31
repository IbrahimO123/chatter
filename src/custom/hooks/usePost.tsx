import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGeneral } from "./useGeneral";
import { updateAPost } from "../../redux/posts/slice";
import { useState } from "react";
import { addPostToDatabase } from "../../Utilities/AddPost";
import { updateOtherState } from "../../redux/Others/slice";
import { uploadImage, uploadVideo } from "../../Utilities/UploadPostFile";
export const usePost = () => {
  const aPost = useSelector((state: RootState) => state.posts.aPost);
  const { dispatch, user, others, profileImageUrl, firstname, lastname } =
    useGeneral();
  const { content, likesCount } = aPost;
  const [selectedImage, setSelectedImage] = useState<File>();
  const [selectedVideo, setSelectedVideo] = useState<File>();
  const [postButton, setPostButton] = useState(false);

  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateAPost({
        ...aPost,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleAddPost = async () => {
    setPostButton((prev) => !prev);
    if (user?.uid) {
      let pictureUrl = "";
      let videoUrl = "";
      if (selectedImage?.name) {
        pictureUrl = (await handleImageUpload()) as string;
      }
      if (selectedVideo?.name) {
        videoUrl = (await handleVideoUpload()) as string;
      }
      const res = await addPostToDatabase(
        {
          ...aPost,
          userId: user.uid,
          author: `${firstname} ${lastname}` || user.displayName!,
          profileImageUrl,
          picture: pictureUrl,
          video: videoUrl,
        },
        user.uid
      );
      if (res) {
        dispatch(
          updateOtherState({
            ...others,
            open: true,
            message: "Your post has been added",
            severity: "success",
          })
        );
        dispatch(
          updateAPost({
            ...aPost,
            content: "",
            likesCount: 0,
            sharesCount: 0,
            commentsCount: 0,
            viewsCount: 0,
            author: "",
            userId: "",
            picture: "",
            video: "",
            event: "",
          })
        );
        setSelectedImage(undefined);
        setSelectedVideo(undefined);
        setPostButton((prev) => !prev);
        return;
      }
    } else {
      dispatch(
        updateOtherState({
          ...others,
          open: true,
          message: "Login or sign up to post",
          severity: "error",
        })
      );
    }
    setPostButton((prev) => !prev);
    return;
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
  const handleImageUpload = async () => {
    if (selectedImage?.name) {
      const url = await uploadImage(selectedImage);
      return url;
    } else {
      console.log("select an image");
    }
  };
  const handleVideoUpload = async () => {
    if (selectedVideo?.name) {
      const url = await uploadVideo(selectedVideo);
      return url;
    } else {
      console.log("select an video");
    }
  };
  return {
    handleChangeContent,
    handleAddPost,
    handleSelectedImage,
    handleSelectedVideo,
    handleVideoUpload,
    handleImageUpload,
    content,
    likesCount,
    selectedImage,
    selectedVideo,
    setSelectedImage,
    setSelectedVideo,
    postButton,
  };
};
