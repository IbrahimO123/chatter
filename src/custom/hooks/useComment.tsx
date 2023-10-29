//import { addCommentToDatabase } from "../../Utilities/AddComments";
import { useGeneral } from "./useGeneral";
import { updateComment } from "../../redux/comment/slice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getAllComments } from "../../Utilities/RetrieveComments";
import { useState } from "react";

export const useComment = () => {
  const [commentsList, setCommentsList] = useState<typeof allComments>([]);
  const { dispatch } = useGeneral();
  const { user, firstname, lastname, profileImageUrl } = useGeneral();
  const { aComment, allComments } = useSelector(
    (state: RootState) => state.comment
  );
  const { text } = aComment.comment;
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

  return {
    addComment,
    editComment,
    showComment,
    updateComment,
    fetchComments,
    likeComment,
    aComment,
    allComments,
    text,
    commentsList,
    setCommentsList,
  };
};
