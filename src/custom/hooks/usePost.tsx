import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGeneral } from "./useGeneral";
import { updateAPost } from "../../redux/posts/slice";
import { useState } from "react";
import { addPostToDatabase } from "../../Utilities/AddPost";
import { updateOtherState } from "../../redux/Others/slice";
import { uploadImage, uploadVideo } from "../../Utilities/UploadPostFile";
import { updateLikePostAsync } from "../../redux/like/slice";
import { addLikePostToDatabase } from "../../Utilities/AddLike";
import { UnLikePost } from "../../Utilities/UnLike";
import { GetAllLikedPost } from "../../Utilities/RetrieveLiked";

export type likeList = {
  content: string;
  postId: string;
  id: string;
  value: Boolean;
  when: string;
  who: string;
  whoId: string;
}[];

export const usePost = () => {
  const aPost = useSelector((state: RootState) => state.posts.aPost);
  const { dispatch, user, others, profileImageUrl, firstname, lastname } =
    useGeneral();
  const { content, likesCount } = aPost;
  const [selectedImage, setSelectedImage] = useState<File>();
  const [selectedVideo, setSelectedVideo] = useState<File>();
  const [postButton, setPostButton] = useState(false);
  const [likedPostList, setLikedPostList] = useState<likeList>([]);
  const [likePost, setLikePost] = useState(false);
  const { aLike } = useSelector((state: RootState) => state.likePosts);

  //  Methods for usePost hooks
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

  const handleUserLikePost = async (postId: string, post: string) => {
    if (user?.uid) {
      setLikePost(true);
      const response = await dispatch(
        updateLikePostAsync({
          ...aLike,
          value: true,
          postId,
          content: post,
          whoId: user.uid,
          who: `${lastname} ${firstname}`,
        })
      );
      const data = await JSON.parse(JSON.stringify(response.payload));
      await addLikePostToDatabase(data, postId);
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
  const handleUnLikedPost = async (postId: string, likedId: string) => {
    const res = await UnLikePost(postId, likedId);
    console.log(res);
    if (res === "done") {
      setLikePost(false);
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
  const handleGetUserLikedPost = async (postId: string) => {
    if (user?.uid) {
      const response = await GetAllLikedPost(postId);
      if (response.error) {
        console.log(response.error);
        return;
      } else {
        const likedPost = response.likedPost.filter(
          (post: any) => post.whoId === user.uid
        );
        if (likedPost.length > 0) {
          setLikePost(true);
        }
        return response.likedPost;
      }
    }
  };
  const handleFetchLikedPosts = async (postId: string) => {
    const response = await GetAllLikedPost(postId);
    const { likedPost, error } = response;
    if (error === null && likedPost.length > 0) {
      setLikedPostList(likedPost as likeList);
      return;
    } else {
      return;
    }
  };
  return {
    handleChangeContent,
    handleAddPost,
    handleSelectedImage,
    handleSelectedVideo,
    handleVideoUpload,
    handleImageUpload,
    handleUserLikePost,
    handleUnLikedPost,
    handleGetUserLikedPost,
    handleFetchLikedPosts,
    content,
    likesCount,
    selectedImage,
    selectedVideo,
    setSelectedImage,
    setSelectedVideo,
    setLikedPostList,
    likedPostList,
    postButton,
    likePost,
    setLikePost,
  };
};
