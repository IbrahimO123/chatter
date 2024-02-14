//import { addCommentToDatabase } from "../../Utilities/AddComments";
import { useGeneral } from "./useGeneral";
import { updateComment, updatePostComment } from "../../redux/comment/slice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  getAllComments,
  getAllPostComments,
} from "../../Utilities/RetrieveComments";
import { useState } from "react";

export const useComment = () => {
  const [commentsList, setCommentsList] = useState<typeof allComments>([]);
  const [postCommentsList, setPostCommentsList] = useState<
    typeof allPostComments
  >([]);
  const { dispatch } = useGeneral();
  const { user, firstname, lastname, profileImageUrl } = useGeneral();
  const { aComment, allComments } = useSelector(
    (state: RootState) => state.comment
  );
  const { singlePostComment, allPostComments } = useSelector(
    (state: RootState) => state.postComments
  );
  const { text } = aComment.comment;
  const { postText } = singlePostComment.comment;
  const addComment = (
    e: React.ChangeEvent<HTMLInputElement>,
    articleId: string,
    article: string
  ) => {
    dispatch(
      updateComment({
        ...aComment,
        id: articleId,
        article,
        comment: {
          authorName: `${lastname} ${firstname}`,
          userId: user?.uid!,
          text: e.target.value,
          dateCreated: new Date().toLocaleDateString(),
          timeCreated: new Date().toLocaleTimeString(),
          profileImageUrl: profileImageUrl,
          replies: [],
          commentLikes: [],
        },
      })
    );
    return "comment added";
  };

  const addPostComment = (
    e: React.ChangeEvent<HTMLInputElement>,
    postId: string,
    post: string
  ) => {
    dispatch(
      updatePostComment({
        ...singlePostComment,
        id: postId,
        post,
        comment: {
          authorName: `${lastname} ${firstname}`,
          userId: user?.uid!,
          postText: e.target.value,
          dateCreated: new Date().toLocaleDateString(),
          timeCreated: new Date().toLocaleTimeString(),
          profileImageUrl: profileImageUrl,
          replies: [],
          commentLikes: [],
        },
      })
    );
    return "comment added";
  };
  const editComment = () => {};

  const showComment = () => {};
  const likeComment = () => {
    dispatch(
      updateComment({
        ...aComment,
        comment: {
          ...aComment.comment,
          commentLikes: [...aComment.comment.commentLikes, user?.uid!],
        },
      })
    );
  };

  const fetchComments = async (commentId: string) => {
    const res = await getAllComments(commentId);
    const { comments, error } = res;
    if (error === null && comments.length > 0) {
      setCommentsList(comments as typeof allComments);
    } else {
    }
  };

  const fetchPostComments = async (commentId: string) => {
    const res = await getAllPostComments(commentId);
    const { comments, error } = res;
    if (error === null && comments.length > 0) {
      setPostCommentsList(comments as typeof allPostComments);
    } else {
    }
  };
  return {
    addComment,
    addPostComment,
    editComment,
    showComment,
    updateComment,
    fetchComments,
    fetchPostComments,
    likeComment,
    aComment,
    allComments,
    singlePostComment,
    allPostComments,
    text,
    commentsList,
    setCommentsList,
    postCommentsList,
    setPostCommentsList,
    postText,
  };
};
